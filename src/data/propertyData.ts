import { CustomImages, GalleryItem, PricingPackage, StatItem, VirtualTourItem } from '../types';

export const initialImages: CustomImages = {
  hero3dTour: '/images/hero_3d_tour.jpg',
  aboutGear: '/images/insta_camera_gear.jpg?v=2',
  aboutDollhouse: '/images/dollhouse_view.jpg?v=4',
  aboutInterior: '/images/about_interior.jpg',
  retreatCourtyard: '/images/retreat_courtyard.jpg?v=3',
  retreatKitchen: '/images/retreat_kitchen.jpg?v=3',
  retreatSpaBath: '/images/retreat_spa_bath.jpg?v=3',
  retreatLounge: '/images/retreat_lounge.jpg?v=3',
  retreatTerrace: '/images/retreat_terrace.jpg?v=3',
  retreatNicheDetail: '/images/retreat_niche_detail.jpg',
};

export const propertyHeroData = {
  brandName: 'TRANSYLVIEW',
  companyFullName: 'TransylView 3D',
  headline: 'Deschide ușa proprietății tale.\nOricând. De oriunde.',
  tagline: 'Scanare volumetrică Metareal Stage și digitalizare imobiliară de înaltă precizie în Satu Mare și Transilvania. Tururi virtuale interactive 8K pentru interior și exterior (curți, grădini, terase în plin soare), model Dollhouse 3D și planuri cotate de mare fidelitate.',
  stats: [
    { value: '8K', label: 'Rezoluție Insta X5', detail: 'Fidelitate vizuală la 360°' },
    { value: '100 km', label: 'Rază de deplasare', detail: 'Satu Mare, Baia Mare, Oradea, Carei, Zalău' },
    { value: '24-72h', label: 'Timp de predare', detail: 'În funcție de suprafață · Prioritate Pachet Exclusiv' },
  ] as StatItem[],
};

export const propertyAboutData = {
  sectionBadge: 'Despre TransylView 3D și tehnologia volumetrică Metareal Stage',
  paragraph1:
    'Oferim proprietarilor, agenților imobiliari și dezvoltatorilor din Satu Mare și Transilvania un avantaj competitiv concret: transformăm orice imobil într-un model volumetric 3D de înaltă precizie cu tehnologia Metareal Stage, captat la rezoluție 8K.',
  paragraph2:
    'Spre deosebire de sistemele convenționale limitate la interior, tehnologia noastră scanează impecabil atât încăperile, cât și curțile, terasele scăldate în soare, grădinile și fațadele, fără erori de reflexie sau pierderi de semnal. Livrăm pachete complete cu tur 3D interactiv în 24–72 de ore (în funcție de suprafață, cu prioritate garantată de procesare pentru Pachetul Exclusiv), riglă digitală milimetrică, model Dollhouse 3D, planuri 2D cotate integrate și opțiune White-Label 100% dedicată agenției tale.',
  stats: [
    { value: '8K', label: 'Rezoluție de captură' },
    { value: '100 km', label: 'Rază de deplasare' },
    { value: '24-72h', label: 'Predare garantată' },
  ] as StatItem[],
};

export const retreatSectionData = {
  sectionBadge: 'Portofoliu interactiv 3D',
  title: 'Experiențe Digitale Imersive',
  description:
    'Fiecare tur virtual realizat de TransylView 3D combină rezoluția 8K cu navigarea intuitivă. Explorați mai jos câteva dintre modurile noastre de prezentare: de la vederi secționale Dollhouse 3D pe mai multe niveluri până la panorame exterioare și spații comerciale.',
};

export const getRetreatGalleryItems = (images: CustomImages): GalleryItem[] => [
  {
    id: 'dollhouse',
    title: 'Model Secțional Dollhouse 3D Multi-Nivel',
    category: 'Arhitectură & Nivele',
    image: images.aboutDollhouse,
    caption: 'Perspectivă tridimensională completă (Parter + Etaj) a întregii clădiri, pentru înțelegerea clară a nivelurilor, scărilor interioare și compartimentării.',
    specs: 'Modelare Spațială 3D • Vedere Pe Nivele • Măsurători Digitale',
  },
  {
    id: 'courtyard',
    title: 'Vile Rezidențiale & Curți cu Piscină',
    category: 'Vile & Case',
    image: images.retreatCourtyard,
    caption: 'Prezentare completă a zonelor exterioare, grădinilor și corpurilor de clădire la apus sau pe timp de zi.',
    specs: 'Scanare 3D Completă • Puncte Interactive • Rezoluție 8K',
  },
  {
    id: 'kitchen',
    title: 'Apartamente & Bucătării de Lux',
    category: 'Spații Rezidențiale',
    image: images.retreatKitchen,
    caption: 'Amenajări contemporane open-space cu texturi naturale, mobilier modern și electrocasnice integrate.',
    specs: 'Fidelitate Culori • Măsurători Digitale Direct în Tur',
  },
  {
    id: 'lounge',
    title: 'Showroom Comercial & Birouri Executive',
    category: 'Comercial',
    image: images.retreatLounge,
    caption: 'Spații comerciale și de birouri optimizate pentru prezentări remote și clienți business.',
    specs: 'Navigare Fluidă Walkthrough • Puncte Hotspot • Compatibil VR',
  },
  {
    id: 'terrace',
    title: 'Penthouse & Terase Panoramice',
    category: 'Cadre Orizont & Lux',
    image: images.retreatTerrace,
    caption: 'Surprindem priveliștea de 360 de grade a teraselor pentru a pune în valoare amplasamentul proprietății.',
    specs: 'Panoramă Orizont 360° • Vederi Deschise • Link Direct de Partajare',
  },
];

// Initial real / showcase 3D Virtual Tours portfolio data (Featured Metareal Stage case study)
export const initialVirtualTours: VirtualTourItem[] = [
  {
    id: 'apartament-premium-satu-mare',
    title: 'Apartament Premium & Terasă Rezidențială',
    category: 'Rezidențial & Terasă',
    city: 'Satu Mare (Zonă Centrală)',
    surface: '86 m²',
    rooms: '3 Camere + Terasă Exterioară',
    embedUrl: 'https://tour.metareal.com/apps/player?asset=a6eb7cb7-206c-4dce-94d7-12e71246ea2a&position=3.04x1.60y1.24z&rotation=0.00x255.81y0.00z',
    coverImage: '/images/metareal_showcase_cover.jpg',
    images: [
      '/images/metareal_showcase_cover.jpg',
      '/images/metareal_tour_dining.jpg',
      '/images/metareal_tour_bedroom.jpg',
    ],
    description: 'Scanare volumetrică de înaltă precizie a unui apartament rezidențial cu 3 camere și terasă exterioară expusă la soare. Include model secțional Dollhouse 3D, plan cotat 2D integrat și riglă digitală activă pentru măsurători milimetrice.',
    features: ['Scanare 8K', 'Model Dollhouse 3D', 'Riglă Digitală Activă', 'Fațadă & Terasă Exterioară'],
    isFeatured: true,
    date: '2026',
    client: 'Dezvoltator Imobiliar Partener',
  },
];

// Market-calibrated Romanian pricing structure (Metareal Stage volumetric technology)
export const pricingPackages: PricingPackage[] = [
  {
    id: 'esential',
    name: 'Pachet Esențial 3D',
    tagline: 'Apartamente până la 60 m²',
    price: '499',
    startingPriceLabel: 'Preț de pornire',
    hostingDuration: '2 Luni Gratuite Incluse',
    hostingAfterPrice: 'apoi 29 RON/lună',
    features: [
      'Tur volumetric 3D interactiv 8K',
      'Model Dollhouse 3D & secțiune per nivel',
      'Riglă digitală integrată pentru măsurători instantanee',
      'Link partajabil securizat (WhatsApp, Storia, OLX, Social Media)',
      'Optimizare ultra-rapidă pentru dispozitive mobile',
    ],
    ctaLabel: 'Solicită Esențial',
  },
  {
    id: 'premium',
    name: 'Pachet Premium 3D',
    tagline: 'Proprietăți până la 120 m² / Case & Apartamente',
    price: '699',
    startingPriceLabel: 'Preț de pornire',
    isPopular: true,
    hostingDuration: '3 Luni Gratuite Incluse',
    hostingAfterPrice: 'apoi 29 RON/lună',
    features: [
      'Toate beneficiile din Pachetul Esențial',
      'Plan schematic 2D cotat (Floor Plan) cu dimensiuni detaliate per cameră',
      'Scanare exterior primar: terasă, balcon spațios sau acces exterior',
      'Pachet de fotografii HDR de înaltă rezoluție extrase din model',
      'Compatibilitate imersivă WebVR pentru ochelari VR',
    ],
    ctaLabel: 'Solicită Premium',
  },
  {
    id: 'exclusiv',
    name: 'Pachet Exclusiv 3D',
    tagline: 'Vile, Duplexuri până la 250 m² · Livrare prioritară inclusă',
    price: '899',
    startingPriceLabel: 'Preț de pornire',
    hostingDuration: '6 Luni VIP Gratuite Incluse',
    hostingAfterPrice: 'apoi 29 RON/lună',
    features: [
      'Toate beneficiile din Pachetul Premium',
      'Procesare & livrare prioritară (prioritate maximă la randare și predare)',
      'Scanare completă perimetru exterior: grădină, curte, foișor și fațadă clădire',
      'Personalizare White-Label 100%: branding exclusiv al agenției/dezvoltatorului',
      'Puncte de interes interactive (Info-Hotspots) pentru dotări și finisaje',
      'Opțiune publicare directă în Google Street View',
    ],
    ctaLabel: 'Solicită Exclusiv',
  },
];

export const contactData = {
  companyName: 'TransylView 3D',
  legalEntityNotice: 'Operator economic de servicii digitale · Înregistrat conform legislației din România',
  fiscalNotice: 'Toate prețurile sunt exprimate în RON · Factură fiscală conform Codului Fiscal (Legea 227/2015)',
  email: 'transylview3d@gmail.com',
  phone: '0751 801 025',
  phoneFormatted: '+40 751 801 025',
  phoneHref: 'tel:0751801025',
  emailHref: 'mailto:transylview3d@gmail.com',
  address: 'Satu Mare, Județul Satu Mare, România',
  schedule: 'Luni – Sâmbătă: 08:30 – 19:30',
  anpcPhone: '021 9551',
  anpcPhoneHref: 'tel:0219551',
  anpcUrl: 'https://anpc.ro/',
  salUrl: 'https://anpc.ro/ce-este-sal/',
  solUrl: 'https://ec.europa.eu/consumers/odr/',
  anspdcpUrl: 'https://www.dataprotection.ro/',
};
