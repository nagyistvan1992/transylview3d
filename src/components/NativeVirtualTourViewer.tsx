import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, Minimize2, Play, Pause, Compass, Layers, 
  MapPin, Check, ChevronLeft, ChevronRight, Eye, Sparkles, Navigation 
} from 'lucide-react';

export interface TourScene {
  id: string;
  name: string;
  category: string;
  image: string;
  initialLon?: number;
  initialLat?: number;
  hotspots?: {
    targetSceneId: string;
    label: string;
    yaw: number;
    pitch: number;
  }[];
}

const DEFAULT_SCENES: TourScene[] = [
  {
    id: 'living',
    name: 'Living Room & Zonă Lounge',
    category: 'Interior 8K',
    image: '/images/hero_3d_tour.jpg',
    initialLon: 0,
    initialLat: 0,
    hotspots: [
      { targetSceneId: 'terrace', label: 'Ieșire pe Terasă', yaw: 45, pitch: -5 },
      { targetSceneId: 'kitchen', label: 'Spre Bucătărie', yaw: 135, pitch: -8 },
    ],
  },
  {
    id: 'terrace',
    name: 'Terasă Panoramică & Piscină',
    category: 'Exterior 360°',
    image: '/images/retreat_terrace.jpg',
    initialLon: 90,
    initialLat: 5,
    hotspots: [
      { targetSceneId: 'courtyard', label: 'Vedere Curte & Grădină', yaw: -60, pitch: -10 },
      { targetSceneId: 'living', label: 'Înapoi în Living', yaw: -160, pitch: 0 },
    ],
  },
  {
    id: 'courtyard',
    name: 'Vilă Rezidențială & Curte',
    category: 'Vedere Ansamblu',
    image: '/images/retreat_courtyard.jpg',
    initialLon: 180,
    initialLat: 0,
    hotspots: [
      { targetSceneId: 'living', label: 'Intrare Principală', yaw: 20, pitch: 5 },
      { targetSceneId: 'terrace', label: 'Spre Terasă', yaw: 80, pitch: 10 },
    ],
  },
  {
    id: 'kitchen',
    name: 'Bucătărie & Dining Gourmet',
    category: 'Interior 8K',
    image: '/images/retreat_kitchen.jpg',
    initialLon: 270,
    initialLat: -5,
    hotspots: [
      { targetSceneId: 'living', label: 'Spre Living', yaw: -90, pitch: 0 },
      { targetSceneId: 'spa', label: 'Spre Zona Spa & Baie', yaw: 70, pitch: -5 },
    ],
  },
  {
    id: 'spa',
    name: 'Baie Spa din Travertin',
    category: 'Detalii & Finisaje',
    image: '/images/retreat_spa_bath.jpg',
    initialLon: 0,
    initialLat: 0,
    hotspots: [
      { targetSceneId: 'kitchen', label: 'Înapoi la Bucătărie', yaw: 180, pitch: 0 },
    ],
  },
];

interface NativeVirtualTourViewerProps {
  onBookCall?: () => void;
}

export const NativeVirtualTourViewer: React.FC<NativeVirtualTourViewerProps> = ({ onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDollhouseOpen, setIsDollhouseOpen] = useState(false);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [viewHeading, setViewHeading] = useState(0); // 0-360 degrees for mini radar

  const currentScene = DEFAULT_SCENES[currentSceneIndex];

  // Three.js internal state refs (prevents re-renders during 60fps render loop)
  const threeState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sphereMesh: THREE.Mesh;
    textureLoader: THREE.TextureLoader;
    isUserInteracting: boolean;
    onPointerDownPointerX: number;
    onPointerDownPointerY: number;
    onPointerDownLon: number;
    onPointerDownLat: number;
    lon: number;
    lat: number;
    phi: number;
    theta: number;
    fov: number;
    pinchDist: number;
    reqId: number;
  }>({} as any);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1100);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 360 Inverted Sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert faces so texture is on the inside

    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial();
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    threeState.current = {
      scene,
      camera,
      renderer,
      sphereMesh,
      textureLoader,
      isUserInteracting: false,
      onPointerDownPointerX: 0,
      onPointerDownPointerY: 0,
      onPointerDownLon: 0,
      onPointerDownLat: 0,
      lon: currentScene.initialLon || 0,
      lat: currentScene.initialLat || 0,
      phi: 0,
      theta: 0,
      fov: 70,
      pinchDist: 0,
      reqId: 0,
    };

    // Render loop
    const animate = () => {
      threeState.current.reqId = requestAnimationFrame(animate);

      if (isAutoRotating && !threeState.current.isUserInteracting) {
        threeState.current.lon += 0.08;
      }

      // Constrain vertical look angle (-85 to +85)
      threeState.current.lat = Math.max(-85, Math.min(85, threeState.current.lat));

      threeState.current.phi = THREE.MathUtils.degToRad(90 - threeState.current.lat);
      threeState.current.theta = THREE.MathUtils.degToRad(threeState.current.lon);

      const targetX = 500 * Math.sin(threeState.current.phi) * Math.cos(threeState.current.theta);
      const targetY = 500 * Math.cos(threeState.current.phi);
      const targetZ = 500 * Math.sin(threeState.current.phi) * Math.sin(threeState.current.theta);

      threeState.current.camera.lookAt(targetX, targetY, targetZ);
      threeState.current.renderer.render(threeState.current.scene, threeState.current.camera);

      // Update heading for radar
      const normLon = ((threeState.current.lon % 360) + 360) % 360;
      setViewHeading(Math.round(normLon));
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !threeState.current.renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      threeState.current.camera.aspect = w / h;
      threeState.current.camera.updateProjectionMatrix();
      threeState.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(threeState.current.reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
    };
  }, []);

  // Load new texture when current scene changes
  useEffect(() => {
    if (!threeState.current.textureLoader || !threeState.current.sphereMesh) return;

    setIsLoadingTexture(true);

    threeState.current.textureLoader.load(
      currentScene.image,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const material = threeState.current.sphereMesh.material as THREE.MeshBasicMaterial;
        if (material.map) material.map.dispose();
        material.map = texture;
        material.needsUpdate = true;
        setIsLoadingTexture(false);
      },
      undefined,
      (err) => {
        console.error('Failed to load 360 panorama texture', err);
        setIsLoadingTexture(false);
      }
    );
  }, [currentSceneIndex, currentScene.image]);

  // Pointer / Touch Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    threeState.current.isUserInteracting = true;
    threeState.current.onPointerDownPointerX = e.clientX;
    threeState.current.onPointerDownPointerY = e.clientY;
    threeState.current.onPointerDownLon = threeState.current.lon;
    threeState.current.onPointerDownLat = threeState.current.lat;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!threeState.current.isUserInteracting) return;
    const factor = (threeState.current.fov / 70) * 0.18; // Smoother dragging scaled by zoom
    threeState.current.lon = (threeState.current.onPointerDownPointerX - e.clientX) * factor + threeState.current.onPointerDownLon;
    threeState.current.lat = (e.clientY - threeState.current.onPointerDownPointerY) * factor + threeState.current.onPointerDownLat;
  };

  const handlePointerUp = () => {
    threeState.current.isUserInteracting = false;
  };

  // Zoom / Wheel handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFov = Math.max(35, Math.min(85, threeState.current.fov + e.deltaY * 0.05));
    threeState.current.fov = newFov;
    threeState.current.camera.fov = newFov;
    threeState.current.camera.updateProjectionMatrix();
  };

  const goToScene = useCallback((sceneId: string) => {
    const idx = DEFAULT_SCENES.findIndex((s) => s.id === sceneId);
    if (idx !== -1) {
      setCurrentSceneIndex(idx);
    }
  }, []);

  const nextScene = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % DEFAULT_SCENES.length);
  };

  const prevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + DEFAULT_SCENES.length) % DEFAULT_SCENES.length);
  };

  return (
    <section id="demo-tour" className="relative py-20 sm:py-28 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800 select-none">
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-bronze/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          className="gpu-smooth text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-bronze text-xs font-bold tracking-[0.22em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TUR VIRTUAL 3D INTERACTIV NATIV</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight px-2">
            Pășește Înăuntru: Explorează Turul 3D
          </h2>

          <p className="text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-4">
            Trageți cu degetul pe telefon sau cu mouse-ul pe desktop pentru a vă roti liber la 360°. Atingeți punctele de navigare sau schimbați încăperea din meniul de mai jos.
          </p>
        </motion.div>

        {/* 3D WebGL Canvas Viewport Card */}
        <div
          ref={containerRef}
          className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border border-stone-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] w-full min-h-[380px] max-h-[640px]'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          style={{ touchAction: 'none' }}
        >
          {/* Canvas for Three.js 360 rendering */}
          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Texture Loading Overlay */}
          <AnimatePresence>
            {isLoadingTexture && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-stone-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-full border-2 border-bronze border-t-transparent animate-spin" />
                <span className="text-xs font-mono tracking-widest text-stone-300 uppercase">
                  SE ÎNCARCĂ TURUL 8K...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Floating Header HUD */}
          <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent p-3 sm:p-5 flex items-center justify-between pointer-events-auto">
            {/* Active Room Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 bg-stone-950/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <div>
                <span className="font-display text-xs sm:text-sm font-bold text-white tracking-wide block truncate max-w-[160px] sm:max-w-xs">
                  {currentScene.name}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-bronze uppercase block">
                  {currentScene.category}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Auto-Rotation Toggle */}
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`p-2 sm:px-3 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border transition-all shadow-md ${
                  isAutoRotating
                    ? 'bg-bronze text-stone-950 border-bronze'
                    : 'bg-stone-900/80 text-stone-300 border-white/15 hover:text-white'
                }`}
                title={isAutoRotating ? 'Oprește rotația automată' : 'Pornește rotația automată'}
              >
                {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAutoRotating ? 'Auto-Rotire Activă' : 'Pauză'}</span>
              </button>

              {/* Dollhouse 3D View Toggle */}
              <button
                onClick={() => setIsDollhouseOpen(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/15 shadow-md transition-all"
                title="Deschide Modelul 3D Dollhouse"
              >
                <Layers className="w-3.5 h-3.5 text-bronze" />
                <span className="hidden md:inline">Vedere Dollhouse 3D</span>
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 sm:px-3 sm:py-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/15 shadow-md transition-all"
                title={isFullscreen ? 'Ieși din ecran complet' : 'Ecran complet'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-bronze" /> : <Maximize2 className="w-3.5 h-3.5 text-bronze" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Ieșire' : 'Ecran Complet'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Floating Hotspots in Current Room */}
          {currentScene.hotspots && currentScene.hotspots.length > 0 && !isLoadingTexture && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
                {currentScene.hotspots.map((hs, i) => (
                  <button
                    key={i}
                    onClick={() => goToScene(hs.targetSceneId)}
                    className="group bg-stone-950/85 hover:bg-bronze hover:text-stone-950 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 text-white text-xs font-bold tracking-wider shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <Navigation className="w-3.5 h-3.5 text-bronze group-hover:text-stone-950 animate-bounce" />
                    <span>{hs.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Center: Mobile-Friendly Finger Carousel Room Switcher */}
          <div className="absolute bottom-3 sm:bottom-5 inset-x-2 sm:inset-x-6 z-20 pointer-events-none flex flex-col items-center gap-2">
            
            {/* Room Selector Strip */}
            <div className="pointer-events-auto max-w-full overflow-x-auto no-scrollbar py-1 px-2 flex items-center gap-1.5 sm:gap-2 bg-stone-950/85 backdrop-blur-xl rounded-full border border-white/15 shadow-2xl">
              <button
                onClick={prevScene}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                title="Camera Anterioară"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {DEFAULT_SCENES.map((scene, idx) => {
                const isActive = currentSceneIndex === idx;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setCurrentSceneIndex(idx)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-bronze text-stone-950 shadow-md font-bold scale-102'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{scene.name.split('&')[0].trim()}</span>
                  </button>
                );
              })}

              <button
                onClick={nextScene}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                title="Camera Următoare"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Touch Hint */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-stone-400 font-medium bg-stone-950/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <Compass className="w-3 h-3 text-bronze" />
              <span>Unghi de Vizualizare: {viewHeading}° • Trageți pentru explorare liberă la 360°</span>
            </div>
          </div>

        </div>

        {/* Action bar below tour */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-stone-900/70 border border-stone-800 shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-bronze/10 text-bronze hidden sm:block flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Vrei un tur virtual 3D la acest standard pentru imobilul tău?</h4>
              <p className="text-xs text-stone-400">Scanare 8K cu camera profesională Insta X5 în Satu Mare și Transilvania. Predare în 24-48h.</p>
            </div>
          </div>

          <button
            onClick={onBookCall}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span>SOLICITĂ OFERTĂ & SCANARE 3D</span>
          </button>
        </div>

      </div>

      {/* Dollhouse 3D Sectional Cutaway Modal */}
      <AnimatePresence>
        {isDollhouseOpen && (
          <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-5xl w-full bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-700 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2 text-bronze text-xs font-bold tracking-widest uppercase">
                  <Layers className="w-4 h-4" />
                  <span>MODEL SECȚIONAL DOLLHOUSE 3D</span>
                </div>
                <button
                  onClick={() => setIsDollhouseOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold uppercase transition-colors"
                >
                  Închide
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mt-4 border border-stone-800 bg-stone-950">
                <img
                  src="/images/dollhouse_view.jpg"
                  alt="Model Secțional Dollhouse 3D"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
                
                {/* Hotspot Room Jump Buttons over Dollhouse */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block mr-2">
                    Alegeți camera pentru salt 3D:
                  </span>
                  {DEFAULT_SCENES.map((scene, i) => (
                    <button
                      key={scene.id}
                      onClick={() => {
                        setCurrentSceneIndex(i);
                        setIsDollhouseOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-bronze hover:text-stone-950 text-white text-xs font-semibold border border-white/20 transition-all"
                    >
                      <MapPin className="w-3 h-3 inline mr-1 text-bronze" />
                      {scene.name.split('&')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
