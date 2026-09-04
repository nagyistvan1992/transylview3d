import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Eye,
  Upload,
  Copy,
  Check,
  Layers,
  FileCode,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
  Camera,
  Star,
} from 'lucide-react';
import { VirtualTourItem } from '../types';
import { initialVirtualTours } from '../data/propertyData';

interface TourManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tours: VirtualTourItem[];
  onUpdateTours: (updatedTours: VirtualTourItem[]) => void;
  onPreviewTour: (tour: VirtualTourItem) => void;
}

export const TourManagerModal: React.FC<TourManagerModalProps> = ({
  isOpen,
  onClose,
  tours,
  onUpdateTours,
  onPreviewTour,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('tv3d_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'export'>('list');
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [newImageUrlInput, setNewImageUrlInput] = useState('');

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<VirtualTourItem>>({
    title: '',
    category: 'Vile & Case',
    city: 'Satu Mare',
    surface: '150 m²',
    rooms: '4 Camere • 2 Băi',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_courtyard.jpg',
    images: ['/images/retreat_courtyard.jpg'],
    description: '',
    features: ['Rezoluție 8K Ultra-HD', 'Model 3D Dollhouse', 'Măsurători Interactive 3D'],
    isFeatured: true,
    client: 'Proprietar Privat',
  });

  const [featureInput, setFeatureInput] = useState('Rezoluție 8K Ultra-HD, Model 3D Dollhouse, Măsurători Interactive 3D');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Valid PINs: 2026 or 1992
    if (pinInput === '2026' || pinInput === '1992') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tv3d_admin_auth', 'true');
      setPinError(null);
      setPinInput('');
    } else {
      setPinError('Cod PIN incorect. Vă rugăm să reîncercați.');
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tv3d_admin_auth');
    onClose();
  };

  const handleStartEdit = (tour: VirtualTourItem) => {
    setEditingTourId(tour.id);
    const existingImages = tour.images && tour.images.length > 0 
      ? [...tour.images] 
      : (tour.coverImage ? [tour.coverImage] : ['/images/retreat_courtyard.jpg']);
    
    setFormData({ 
      ...tour,
      images: existingImages,
    });
    setFeatureInput(tour.features ? tour.features.join(', ') : '');
    setActiveTab('add');
  };

  const handleResetForm = () => {
    setEditingTourId(null);
    setFormData({
      title: '',
      category: 'Vile & Case',
      city: 'Satu Mare',
      surface: '150 m²',
      rooms: '4 Camere • 2 Băi',
      embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
      coverImage: '/images/retreat_courtyard.jpg',
      images: ['/images/retreat_courtyard.jpg'],
      description: '',
      features: ['Rezoluție 8K Ultra-HD', 'Model 3D Dollhouse', 'Măsurători Interactive 3D'],
      isFeatured: true,
      client: 'Proprietar Privat',
    });
    setFeatureInput('Rezoluție 8K Ultra-HD, Model 3D Dollhouse, Măsurători Interactive 3D');
    setNewImageUrlInput('');
  };

  // Multiple Image Upload handler (up to 10 images)
  const handleMultipleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImages = formData.images ? [...formData.images] : [];
    const availableSlots = 10 - currentImages.length;

    if (availableSlots <= 0) {
      alert('Ați atins limita maximă de 10 imagini pentru acest proiect.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);
    let loadedCount = 0;
    const newBase64Images: string[] = [];

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newBase64Images.push(event.target.result as string);
        }
        loadedCount++;
        if (loadedCount === filesToProcess.length) {
          const updated = [...currentImages, ...newBase64Images].slice(0, 10);
          setFormData((prev) => ({
            ...prev,
            images: updated,
            coverImage: updated[0] || prev.coverImage,
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Image via URL
  const handleAddImageUrl = () => {
    if (!newImageUrlInput.trim()) return;
    const currentImages = formData.images ? [...formData.images] : [];
    if (currentImages.length >= 10) {
      alert('Limita este de maxim 10 imagini per proiect.');
      return;
    }
    const updated = [...currentImages, newImageUrlInput.trim()];
    setFormData((prev) => ({
      ...prev,
      images: updated,
      coverImage: updated[0] || prev.coverImage,
    }));
    setNewImageUrlInput('');
  };

  // Remove individual image from gallery
  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = formData.images ? [...formData.images] : [];
    const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      images: updated,
      coverImage: updated[0] || '',
    }));
  };

  // Set selected image as cover (move to position 0)
  const handleSetAsCover = (index: number) => {
    const currentImages = formData.images ? [...formData.images] : [];
    if (index === 0 || !currentImages[index]) return;
    const target = currentImages.splice(index, 1)[0];
    const updated = [target, ...currentImages];
    setFormData((prev) => ({
      ...prev,
      images: updated,
      coverImage: target,
    }));
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.embedUrl) {
      alert('Vă rugăm să introduceți cel puțin un titlu și link-ul turului 3D.');
      return;
    }

    const currentImages = formData.images && formData.images.length > 0 
      ? formData.images 
      : (formData.coverImage ? [formData.coverImage] : ['/images/retreat_courtyard.jpg']);

    const parsedFeatures = featureInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingTourId) {
      const updated = tours.map((t) =>
        t.id === editingTourId
          ? ({
              ...t,
              ...formData,
              images: currentImages,
              coverImage: currentImages[0],
              features: parsedFeatures,
            } as VirtualTourItem)
          : t
      );
      onUpdateTours(updated);
    } else {
      const newTour: VirtualTourItem = {
        id: `tour-${Date.now()}`,
        title: formData.title || 'Tur Virtual 3D',
        category: formData.category || 'Rezidențial',
        city: formData.city || 'Satu Mare',
        surface: formData.surface || '100 m²',
        rooms: formData.rooms || '3 Camere',
        embedUrl: formData.embedUrl || 'https://my.matterport.com/show/?m=YFWgEekGLHm',
        coverImage: currentImages[0],
        images: currentImages,
        description: formData.description || 'Tur virtual 3D realizat cu tehnologie Insta X5 8K.',
        features: parsedFeatures.length > 0 ? parsedFeatures : ['Scanare 8K', 'Model 3D'],
        isFeatured: formData.isFeatured ?? true,
        date: new Date().getFullYear().toString(),
        client: formData.client || 'Client Partener',
      };
      onUpdateTours([newTour, ...tours]);
    }

    handleResetForm();
    setActiveTab('list');
  };

  const handleDeleteTour = (id: string, title: string) => {
    if (window.confirm(`Sigur doriți să ștergeți turul "${title}" din portofoliu?`)) {
      const updated = tours.filter((t) => t.id !== id);
      onUpdateTours(updated);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Doriți să resetați portofoliul la tururile inițiale de prezentare?')) {
      onUpdateTours(initialVirtualTours);
      handleResetForm();
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(tours, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleImportJson = () => {
    setImportError(null);
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed)) {
        onUpdateTours(parsed);
        alert('Portofoliul a fost actualizat cu succes din JSON!');
        setImportJsonText('');
        setActiveTab('list');
      } else {
        setImportError('Structura JSON trebuie să fie o listă (array) de tururi.');
      }
    } catch (e) {
      setImportError('JSON-ul introdus nu este valid. Verificați sintaxa.');
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/92 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 min-h-[100dvh] select-none"
    >
      {/* 1. PIN Authentication Modal (If Not Authenticated) */}
      {!isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-sm bg-stone-900 text-stone-100 rounded-3xl border border-stone-750 p-6 sm:p-8 shadow-2xl my-auto text-center space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-800/80 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="w-13 h-13 rounded-2xl bg-stone-800/90 text-bronze border border-stone-700/80 mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-6 h-6 stroke-[2]" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-xl text-white font-semibold">
              Acces Securizat Administrator
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed">
              Introduceți codul PIN pentru a gestiona proiectele și tururile 3D.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                autoFocus
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Cod PIN"
                className="w-full bg-stone-950 border border-stone-750 focus:border-bronze rounded-xl pl-10 pr-4 py-3 text-center tracking-[0.35em] text-lg font-mono text-white focus:outline-none"
              />
            </div>

            {pinError && (
              <p className="text-[11px] text-red-400 font-medium">{pinError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer hover:scale-101"
            >
              AUTENTIFICARE
            </button>
          </form>

          <div className="text-[10px] text-stone-500 font-mono pt-1">
            TransylView 3D • Zona Proprietar
          </div>
        </motion.div>
      ) : (
        /* 2. Full Admin Dashboard (Unlocked) */
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-2xl sm:rounded-3xl border border-stone-750/90 shadow-2xl my-4 sm:my-8 overflow-hidden flex flex-col"
        >
          {/* Modal Top Header */}
          <div className="px-5 sm:px-8 py-4 sm:py-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div>
                <div className="text-[10px] font-bold tracking-[0.25em] text-bronze uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ADMINISTRATOR CONECTAT</span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl text-white font-semibold">
                  Manager Portofoliu Tururi Virtuale 3D
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs flex items-center gap-1.5 border border-stone-700 transition-colors cursor-pointer"
                title="Blochează accesul"
              >
                <LogOut className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Blochează</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Închide"
                title="Închide"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5 sm:px-8 pt-3 bg-stone-950/60 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-stone-800 text-white border-t-2 border-bronze'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-bronze" />
              <span>Tururi Existente ({tours.length})</span>
            </button>

            <button
              onClick={() => {
                if (activeTab !== 'add') handleResetForm();
                setActiveTab('add');
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-stone-800 text-white border-t-2 border-bronze'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-bronze" />
              <span>{editingTourId ? 'Editează Tur' : 'Adaugă Tur Nou'}</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-stone-800 text-white border-t-2 border-bronze'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-bronze" />
              <span>Export / Backup JSON</span>
            </button>
          </div>

          {/* Tab 1: List of Active Tours */}
          {activeTab === 'list' && (
            <div className="p-5 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <p className="text-xs text-stone-400">
                  Toate tururile de mai jos sunt publicate pe site. Butonul de adăugare este ascuns pentru public și accesibil doar ție.
                </p>
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('add');
                  }}
                  className="px-4 py-2 rounded-xl bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adaugă Tur Nou</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col justify-between gap-3 group hover:border-stone-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={tour.coverImage}
                          alt={tour.title}
                          className="w-20 h-20 rounded-xl object-cover border border-stone-700 bg-stone-900"
                        />
                        <span className="absolute bottom-1 right-1 bg-stone-950/90 text-[9px] font-mono px-1.5 py-0.5 rounded text-stone-300 border border-white/10">
                          {tour.images && tour.images.length > 0 ? tour.images.length : 1} foto
                        </span>
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-bronze tracking-wider uppercase truncate">
                          <span>{tour.category}</span>
                          <span>•</span>
                          <span>{tour.city}</span>
                          {tour.surface && <span>• {tour.surface}</span>}
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-white truncate">
                          {tour.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 line-clamp-1 leading-snug">
                          {tour.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-850 text-xs">
                      <button
                        onClick={() => onPreviewTour(tour)}
                        className="text-stone-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        title="Previzualizează 3D"
                      >
                        <Eye className="w-3.5 h-3.5 text-bronze" />
                        <span>Previzualizează</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEdit(tour)}
                          className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                          title="Editează"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteTour(tour.id, tour.title)}
                          className="p-2 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300 hover:text-white border border-red-900/60 transition-colors cursor-pointer"
                          title="Șterge"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-stone-800 text-xs text-stone-500">
                <span>Total: {tours.length} tururi 3D active</span>
                <button
                  onClick={handleRestoreDefaults}
                  className="text-stone-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurează Tururile Implicite</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Add or Edit Tour Form */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveTour} className="p-5 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <h4 className="font-serif text-base text-white font-semibold">
                  {editingTourId ? 'Editează Turul Virtual 3D' : 'Adaugă un Tur Virtual Nou'}
                </h4>
                {editingTourId && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                  >
                    Anulează editarea
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Titlu Proiect / Proprietate *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Vilă Rezidențială Modernă cu Piscină"
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Categorie *
                  </label>
                  <select
                    value={formData.category || 'Vile & Case'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                  >
                    <option value="Vile & Case">Vile & Case</option>
                    <option value="Rezidențial">Rezidențial (Apartamente)</option>
                    <option value="Penthouse">Penthouse & Terase</option>
                    <option value="Comercial">Comercial & Birouri</option>
                    <option value="HoReCa">HoReCa & Pensiuni</option>
                    <option value="Industrial">Industrial & Showroom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Oraș / Zonă *
                  </label>
                  <select
                    value={formData.city || 'Satu Mare'}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                  >
                    <option value="Satu Mare">Satu Mare</option>
                    <option value="Carei">Carei</option>
                    <option value="Baia Mare">Baia Mare</option>
                    <option value="Oradea">Oradea</option>
                    <option value="Zalău">Zalău</option>
                    <option value="Cluj-Napoca">Cluj-Napoca</option>
                    <option value="Transilvania">Altă Zonă Transilvania</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Suprafață (ex: 240 m²)
                  </label>
                  <input
                    type="text"
                    value={formData.surface || ''}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    placeholder="Ex: 240 m²"
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Camere / Compartimentare
                  </label>
                  <input
                    type="text"
                    value={formData.rooms || ''}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    placeholder="Ex: 5 Camere • 3 Băi"
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                  Link Embed Tur Virtual 3D (Matterport / Kuula / iStaging) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.embedUrl || ''}
                  onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                  placeholder="https://my.matterport.com/show/?m=..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none font-mono"
                />
                <p className="mt-1 text-[10px] text-stone-500">
                  Lipiți link-ul direct Matterport sau Kuula 360 generat după scanare.
                </p>
              </div>

              {/* MULTI-IMAGE GALLERY MANAGER (UP TO 10 PHOTOS) */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-bold tracking-wider text-stone-200 uppercase flex items-center gap-2">
                      <Camera className="w-4 h-4 text-bronze" />
                      <span>Galerie Fotografii Proiect (Maxim 10 Imagini)</span>
                    </label>
                    <p className="text-[11px] text-stone-400">
                      Vizitatorii vor putea răsfoi aceste imagini direct pe cardul proiectului. Prima imagine este coperta principală.
                    </p>
                  </div>

                  <span className="text-xs font-mono text-bronze font-bold bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
                    {(formData.images || []).length} / 10 IMAGINI
                  </span>
                </div>

                {/* Upload & URL Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                  <div className="sm:col-span-8 flex items-center gap-2">
                    <input
                      type="text"
                      value={newImageUrlInput}
                      onChange={(e) => setNewImageUrlInput(e.target.value)}
                      placeholder="Lipiți un URL de imagine (ex: /images/nume.jpg sau https://...)"
                      className="w-full bg-stone-900 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
                    >
                      Adaugă URL
                    </button>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="w-full py-2 px-3 rounded-xl bg-bronze hover:bg-bronze-dark text-stone-950 text-xs font-bold tracking-wider uppercase whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 transition-colors shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Alege din PC / Tel</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMultipleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Thumbnails Grid Preview */}
                {formData.images && formData.images.length > 0 && (
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {formData.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden border bg-stone-900 group ${
                          idx === 0 ? 'border-bronze ring-2 ring-bronze/40' : 'border-stone-800'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Badge for Cover */}
                        {idx === 0 && (
                          <span className="absolute top-1.5 left-1.5 bg-bronze text-stone-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                            COPERTĂ
                          </span>
                        )}

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetAsCover(idx)}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-bold cursor-pointer"
                              title="Setează ca primă imagine / copertă"
                            >
                              <Star className="w-3.5 h-3.5 text-bronze" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 cursor-pointer"
                            title="Șterge imaginea"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                  Scurtă Descriere
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ex: Proprietate premium scanată integral la 360°, cu living spațios și vedere spre grădină."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                  Etichete / Puncte Forte (separate prin virgulă)
                </label>
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Ex: Rezoluție 8K, Model 3D Dollhouse, Măsurători Interactive 3D, Terasă 360°"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('list');
                  }}
                  className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-lg hover:scale-101"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTourId ? 'Salvează Modificările' : 'Adaugă în Portofoliu'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: JSON Export & Backup */}
          {activeTab === 'export' && (
            <div className="p-5 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <h4 className="font-serif text-base text-white font-semibold">
                  Backup și Export Date Portofoliu
                </h4>
                <p className="text-xs text-stone-400">
                  Puteți copia codul JSON complet al tururilor pentru a-l salva ca backup sau a-l insera în fișierele proiectului.
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-300 font-mono text-[11px] max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {JSON.stringify(tours, null, 2)}
                </pre>
                <button
                  onClick={handleCopyJson}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-stone-700 shadow-md cursor-pointer transition-colors"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-bronze" />}
                  <span>{copiedJson ? 'Copiat!' : 'Copiază JSON'}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-2">
                <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase">
                  Importă Date JSON (Suprascrie lista curentă)
                </label>
                <textarea
                  rows={3}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Lipiți aici codul JSON complet..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
                {importError && (
                  <p className="text-xs text-red-400">{importError}</p>
                )}
                <button
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed text-stone-200 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Importă JSON
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
