import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  ExternalLink,
  Eye,
  Upload,
  Copy,
  Check,
  Building,
  MapPin,
  Sparkles,
  Layers,
  FileCode,
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
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'export'>('list');
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<VirtualTourItem>>({
    title: '',
    category: 'Vile & Case',
    city: 'Satu Mare',
    surface: '150 m²',
    rooms: '4 Camere • 2 Băi',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_courtyard.jpg',
    description: '',
    features: ['Rezoluție 8K Ultra-HD', 'Model 3D Dollhouse', 'Plan 2D Cotat'],
    isFeatured: true,
    client: 'Proprietar Privat',
  });

  const [featureInput, setFeatureInput] = useState('Rezoluție 8K Ultra-HD, Model 3D Dollhouse, Plan 2D Cotat');

  if (!isOpen) return null;

  const handleStartEdit = (tour: VirtualTourItem) => {
    setEditingTourId(tour.id);
    setFormData({ ...tour });
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
      description: '',
      features: ['Rezoluție 8K Ultra-HD', 'Model 3D Dollhouse', 'Plan 2D Cotat'],
      isFeatured: true,
      client: 'Proprietar Privat',
    });
    setFeatureInput('Rezoluție 8K Ultra-HD, Model 3D Dollhouse, Plan 2D Cotat');
  };

  // Image Upload handler (converts local file to base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, coverImage: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.embedUrl) {
      alert('Vă rugăm să introduceți cel puțin un titlu și link-ul turului 3D.');
      return;
    }

    const parsedFeatures = featureInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingTourId) {
      // Update existing
      const updated = tours.map((t) =>
        t.id === editingTourId
          ? ({
              ...t,
              ...formData,
              features: parsedFeatures,
            } as VirtualTourItem)
          : t
      );
      onUpdateTours(updated);
    } else {
      // Create new
      const newTour: VirtualTourItem = {
        id: `tour-${Date.now()}`,
        title: formData.title || 'Tur Virtual 3D',
        category: formData.category || 'Rezidențial',
        city: formData.city || 'Satu Mare',
        surface: formData.surface || '100 m²',
        rooms: formData.rooms || '3 Camere',
        embedUrl: formData.embedUrl || 'https://my.matterport.com/show/?m=YFWgEekGLHm',
        coverImage: formData.coverImage || '/images/retreat_courtyard.jpg',
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
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 min-h-[100dvh] select-none"
    >
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
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-bronze" />
            <div>
              <div className="text-[10px] font-bold tracking-[0.25em] text-bronze uppercase">
                ADMIN • TRANSYLVIEW 3D
              </div>
              <h3 className="font-serif text-lg sm:text-2xl text-white font-semibold">
                Manager Portofoliu Tururi Virtuale 3D
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Închide"
            title="Închide"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
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
                Toate tururile de mai jos sunt afișate public pe site în secțiunea de Portofoliu. Modificările se salvează instantaneu.
              </p>
              <button
                onClick={() => {
                  handleResetForm();
                  setActiveTab('add');
                }}
                className="px-4 py-2 rounded-xl bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adaugă Tur</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col justify-between gap-3 group hover:border-stone-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={tour.coverImage}
                      alt={tour.title}
                      className="w-20 h-20 rounded-xl object-cover border border-stone-700 flex-shrink-0 bg-stone-900"
                    />
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
              <span>Total: {tours.length} tururi 3D în portofoliu</span>
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

            {/* Cover Image URL and Local Upload */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase">
                Imagine de Copertă (URL sau Încarcă de pe telefon/PC)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={formData.coverImage || ''}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="/images/retreat_courtyard.jpg sau https://..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                />
                <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-bold whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 border border-stone-700 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-bronze" />
                  <span>Alege Fișier</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.coverImage && (
                <div className="pt-2 flex items-center gap-3">
                  <img
                    src={formData.coverImage}
                    alt="Previzualizare copertă"
                    className="w-24 h-16 rounded-xl object-cover border border-stone-700 bg-stone-950"
                  />
                  <span className="text-[11px] text-stone-400">Previzualizare copertă selectată</span>
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
                placeholder="Ex: Rezoluție 8K, Model 3D Dollhouse, Plan 2D Cotat, Terasă 360°"
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
    </div>
  );
};
