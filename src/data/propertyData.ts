import { CustomImages, GalleryItem, PricingPackage, StatItem, VirtualTourItem } from '../types';

export const initialImages: CustomImages = {
  hero3dTour: '/images/hero_3d_tour.jpg',
  aboutGear: '/images/insta_camera_gear.jpg?v=2',
  aboutDollhouse: '/images/dollhouse_view.jpg?v=2',
  aboutInterior: '/images/about_interior.jpg',
  retreatCourtyard: '/images/retreat_courtyard.jpg',
  retreatKitchen: '/images/retreat_kitchen.jpg',
  retreatSpaBath: '/images/retreat_spa_bath.jpg',
  retreatLounge: '/images/retreat_lounge.jpg',
  retreatTerrace: '/images/retreat_terrace.jpg',
  retreatNicheDetail: '/images/retreat_niche_detail.jpg',
};

export const propertyHeroData = {
  brandName: 'TRANSYLVIEW',
  companyFullName: 'TransylView 3D',
  headline: 'DESCHIDE UȘA PROPRIETĂȚII TALE.\nORICÂND. DE ORIUNDE.',
  tagline: 'Cumpărătorii moderni nu mai caută simple fotografii. Cu tururile virtuale 3D și tehnologia Insta X5 8K, proprietatea ta din Satu Mare și Transilvania prinde viață, impresionează din prima secundă și se vinde de 3 ori mai repede.',
  stats: [
    { value: '8K ULTRA-HD', label: 'CLARITATE INSTA X5', detail: 'Fidelitate vizuală impecabilă la 360°' },
    { value: '100 KM', label: 'RAZĂ DEPLASARE', detail: 'Satu Mare, Baia Mare, Oradea, Carei, Zalău' },
    { value: '24 - 48H', label: 'PREDARE RAPIDĂ', detail: 'Link gata de integrat pe portaluri și rețele sociale' },
  ] as StatItem[],
};

export const propertyAboutData = {
  sectionBadge: 'DESPRE TRANSYLVIEW 3D & TEHNOLOGIE 8K',
  paragraph1:
    'Oferim proprietarilor, agenților imobiliari și dezvoltatorilor din Satu Mare și Transilvania un avantaj competitiv decisiv: transformăm fiecare spațiu într-o experiență digitală interactivă, în care clienții pot păși virtual chiar înainte de a programa o vizionare fizică.',
  paragraph2:
    'Folosind camera profesională de top Insta X5 8K și trepiezi de carbon ultra-stabili, captăm fiecare încăpere la rezoluție maximă. Livrăm pachete complete cu tur 360° interactiv, vederi secționale 3D Dollhouse și fotografii HDR de înaltă rezoluție (serviciul de plan 2D cotat fiind disponibil opțional, la cerere).',
  stats: [
    { value: '8K', label: 'CALITATE ULTRA-HD' },
    { value: '100 km', label: 'RAZĂ TRANSILVANIA' },
    { value: '48h', label: 'LIVRARE GARANTATĂ' },
  ] as StatItem[],
};

export const retreatSectionData = {
  sectionBadge: 'PORTOFOLIU INTERACTIV 3D',
  title: 'Experiențe Digitale Imersive',
  description:
    'Fiecare tur virtual realizat de TransylView 3D combină rezoluția 8K cu navigarea intuitivă. Explorați mai jos câteva dintre modurile noastre de prezentare: de la vederi secționale Dollhouse 3D până la panorame exterioare și finisaje de lux.',
};

export const getRetreatGalleryItems = (images: CustomImages): GalleryItem[] => [
  {
    id: 'dollhouse',
    title: 'Model Secțional Dollhouse 3D',
    category: 'Arhitectură & Nivele',
    image: images.aboutDollhouse,
    caption: 'Perspectivă tridimensională a întregii clădiri, pentru înțelegerea perfectă a etajelor și compartimentării.',
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
  {
    id: 'spa',
    title: 'Spații Wellness & Finisaje Fine',
    category: 'Detalii & Piatră Naturală',
    image: images.retreatSpaBath,
    caption: 'Evidențierea celor mai spectaculoase unghiuri din băi, zone de spa și suite matrimoniale.',
    specs: 'Calibrare Studio HDR • Corecție Culoare • Iluminare Păstrată',
  },
];

// Initial real / showcase 3D Virtual Tours portfolio data
export const initialVirtualTours: VirtualTourItem[] = [
  {
    id: 'tour-vila-satu-mare',
    title: 'Vilă Rezidențială Modernă cu Piscină & Terasă',
    category: 'Vile & Case',
    city: 'Satu Mare',
    surface: '240 m²',
    rooms: '5 Camere • 3 Băi',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_courtyard.jpg',
    images: [
      '/images/retreat_courtyard.jpg',
      '/images/retreat_lounge.jpg',
      '/images/retreat_kitchen.jpg',
      '/images/about_interior.jpg',
    ],
    description: 'Proprietate premium cu două niveluri, zonă generoasă de zi, piscină exterioară și terasă acoperită scanată integral la 360°.',
    features: ['Rezoluție 8K Ultra-HD', 'Model 3D Dollhouse pe 2 Niveluri', 'Scanare Curte & Piscină', 'Măsurători Digitale Interactive'],
    isFeatured: true,
    date: '2026',
    client: 'Proprietar Privat',
  },
  {
    id: 'tour-penthouse-oradea',
    title: 'Penthouse Exclusivist cu Panoramă 360°',
    category: 'Penthouse',
    city: 'Oradea',
    surface: '185 m²',
    rooms: '4 Camere • 2 Terase',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_terrace.jpg',
    images: [
      '/images/retreat_terrace.jpg',
      '/images/hero_3d_tour.jpg',
      '/images/retreat_niche_detail.jpg',
      '/images/retreat_lounge.jpg',
    ],
    description: 'Vedere spectaculoasă la înălțime, finisaje de lux din marmură și sticlă, terase perimetrale și iluminare ambientală de seară.',
    features: ['Panoramă Orizont 360°', 'Etichete Informative (Tags)', 'Măsurători Direct în Tur', 'Predare în 24h'],
    isFeatured: true,
    date: '2026',
    client: 'Dezvoltator Imobiliar',
  },
  {
    id: 'tour-apartament-baia-mare',
    title: 'Apartament Nordic Design & Bucătărie Open Space',
    category: 'Rezidențial',
    city: 'Baia Mare',
    surface: '85 m²',
    rooms: '3 Camere • 2 Băi',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_kitchen.jpg',
    images: [
      '/images/retreat_kitchen.jpg',
      '/images/about_interior.jpg',
      '/images/retreat_lounge.jpg',
      '/images/retreat_spa_bath.jpg',
    ],
    description: 'Amenajare interioară contemporană cu mobilier din lemn masiv, electrocasnice premium integrate și living spațios.',
    features: ['Scanare Detaliată Finisaje', 'Prezentare Detaliată 8K', 'Fotografii HDR de Catalog', 'Link Direct Portaluri'],
    isFeatured: false,
    date: '2026',
    client: 'Agenție Imobiliară Parteneră',
  },
  {
    id: 'tour-showroom-comercial',
    title: 'Showroom Comercial & Spațiu Birouri Executive',
    category: 'Comercial',
    city: 'Satu Mare',
    surface: '320 m²',
    rooms: 'Open Space & 4 Birouri',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_lounge.jpg',
    images: [
      '/images/retreat_lounge.jpg',
      '/images/about_interior.jpg',
      '/images/retreat_courtyard.jpg',
    ],
    description: 'Spațiu comercial optimizat pentru prezentare clienți business, conferințe și vizionări remote pentru potențiali chiriași.',
    features: ['Integrare Google Maps / Street View', 'Puncte Interactive Hotspot', 'Scanare Zonă Recepție', 'Compatibil Ochelari VR'],
    isFeatured: true,
    date: '2026',
    client: 'Companie Comercială',
  },
  {
    id: 'tour-pensiune-spa',
    title: 'Boutique Hotel & Centru Spa Transilvania',
    category: 'HoReCa',
    city: 'Carei',
    surface: '450 m²',
    rooms: '8 Suite • Zonă Wellness',
    embedUrl: 'https://my.matterport.com/show/?m=YFWgEekGLHm',
    coverImage: '/images/retreat_spa_bath.jpg',
    images: [
      '/images/retreat_spa_bath.jpg',
      '/images/retreat_courtyard.jpg',
      '/images/retreat_terrace.jpg',
      '/images/retreat_niche_detail.jpg',
    ],
    description: 'Prezentare digitală completă a camerelor, restaurantului și zonei de relaxare cu piatră naturală pentru creșterea rezervărilor directe.',
    features: ['Tur 360° Camere & Spa', 'Crește Încrederea Turiștilor', 'Navigare Fluidă pe Mobil', 'Cod Embed Website'],
    isFeatured: false,
    date: '2026',
    client: 'Pensiune Turistică',
  },
];

// Market-calibrated Romanian pricing structure (without drone)
export const pricingPackages: PricingPackage[] = [
  {
    id: 'standard',
    name: 'Pachet Standard',
    tagline: 'Pentru garsoniere și apartamente mici',
    price: '449',
    startingPriceLabel: 'PREȚ DE PORNIRE',
    features: [
      'Filmare & Scanare Insta X5 8K',
      'Până la 60 m²',
      'Tur interactiv 360° complet',
      '20+ fotografii profesionale HD',
      'Link de partajare direct pe portaluri',
      'Predare rapidă în 48 de ore',
    ],
    ctaLabel: 'Cere Standard',
  },
  {
    id: 'premium',
    name: 'Pachet Premium',
    tagline: 'Favoritul agenților & proprietarilor',
    price: '799',
    startingPriceLabel: 'PREȚ DE PORNIRE',
    isPopular: true,
    features: [
      'Tur virtual 3D interactiv complet',
      'Până la 130 m²',
      'Vedere secțională 3D Dollhouse',
      '35+ fotografii profesionale HD',
      'Plan 2D cotat (opțional – cost suplimentar)',
      'Cod embed pentru website & portaluri',
      'Găzduire cloud 12 luni inclusă',
      'Predare în 24 - 48 de ore',
    ],
    ctaLabel: 'Cere Premium',
  },
  {
    id: 'exclusiv',
    name: 'Pachet Exclusiv',
    tagline: 'Prezentare completă pentru vile & spații mari',
    price: '1299',
    startingPriceLabel: 'PREȚ DE PORNIRE',
    features: [
      'Tur 3D complet (Interior + Curte/Terasă la sol)',
      'Suprafață generoasă până la 300 m²',
      'Model 3D Dollhouse pe toate nivelurile',
      'Puncte de interes interactive (Hotspots info)',
      '50+ fotografii profesionale HDR 8K',
      'Plan 2D cotat / Releveu (opțional – cost suplimentar)',
      'Virtual staging (mobilare digitală opțională)',
      'Corecție premium de culoare & luminozitate',
      'Predare prioritară în 24 de ore',
    ],
    ctaLabel: 'Cere Exclusiv',
  },
];

export const contactData = {
  email: 'transylview3d@gmail.com',
  phone: '0751 801 025',
  phoneFormatted: '+40 751 801 025',
  phoneHref: 'tel:0751801025',
  emailHref: 'mailto:transylview3d@gmail.com',
  address: 'Satu Mare, Județul Satu Mare, România',
  schedule: 'Luni – Sâmbătă: 08:30 – 19:30',
};
