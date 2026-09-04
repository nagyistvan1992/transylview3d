export interface StatItem {
  value: string;
  label: string;
  detail?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  specs: string;
}

export interface VirtualTourItem {
  id: string;
  title: string;
  category: 'Rezidențial' | 'Vile & Case' | 'Penthouse' | 'Comercial' | 'HoReCa' | string;
  city: 'Satu Mare' | 'Baia Mare' | 'Oradea' | 'Carei' | 'Zalău' | string;
  surface: string;
  rooms?: string;
  embedUrl: string;
  coverImage: string;
  images?: string[];
  description: string;
  features: string[];
  isFeatured?: boolean;
  date?: string;
  client?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  startingPriceLabel: string;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
}

export interface CustomImages {
  hero3dTour: string;
  aboutGear: string;
  aboutDollhouse: string;
  aboutInterior: string;
  retreatCourtyard: string;
  retreatKitchen: string;
  retreatSpaBath: string;
  retreatLounge: string;
  retreatTerrace: string;
  retreatNicheDetail: string;
}
