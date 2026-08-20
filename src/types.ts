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
