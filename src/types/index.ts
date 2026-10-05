export interface Product {
  id: string;
  badge: string;
  name: string;
  category: 'coffee' | 'beans' | 'canister' | 'brew';
  description: string;
  roastLevel?: 'Light' | 'Medium' | 'Dark';
  notes: string[];
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviewsCount: number;
  weight: string;
  image: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grindOption?: 'Whole Bean' | 'Espresso' | 'Pour Over' | 'Cold Brew';
}

export interface PairingItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  flavorNotes: string;
  chefNote: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: 'Coffee' | 'Specialty' | 'Food' | 'Pastries';
  tags: string[];
  calories?: string;
}
