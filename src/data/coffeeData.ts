import { Product, PairingItem, MenuItem } from '../types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'french-vanilla',
    badge: 'BEST CAPPUCCINO',
    name: 'FRENCH VANILLA',
    category: 'canister',
    description: 'Slow-roasted Arabica infused with pure Madagascar vanilla pod extracts. Silky crema with toasted hazelnut finish.',
    roastLevel: 'Medium',
    notes: ['Bourbon Vanilla', 'Hazelnut', 'Velvet Crema'],
    originalPrice: 99,
    salePrice: 80,
    rating: 4.9,
    reviewsCount: 148,
    weight: '250g Tin Canister',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
  },
  {
    id: 'french-roast',
    badge: 'DARK ROAST',
    name: 'FRENCH ROAST',
    category: 'beans',
    description: 'Oura signature whole bean dark roast sourced from high-altitude volcanic soils. Smoky cacao, caramelized molasses, and bold body.',
    roastLevel: 'Dark',
    notes: ['Smoked Cacao', 'Molasses', 'Walnut'],
    originalPrice: 120,
    salePrice: 80,
    rating: 5.0,
    reviewsCount: 312,
    weight: '500g Valve Bag',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'finely-ground',
    badge: 'INTENSE DARK ROAST',
    name: 'FINELY GROUND ROAST',
    category: 'canister',
    description: 'Micron-calibrated Italian espresso grind. Deep baker chocolate notes with an aromatic cardamom flourish and enduring finish.',
    roastLevel: 'Dark',
    notes: ['Baker Chocolate', 'Black Cherry', 'Cardamom'],
    originalPrice: 150,
    salePrice: 100,
    rating: 4.8,
    reviewsCount: 94,
    weight: '300g Matte Canister',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
  },
];

export const PAIRING_GALLERY: PairingItem[] = [
  {
    id: 'latte-art',
    title: 'Precision Microfoam',
    subtitle: 'Silky Texture Pour',
    category: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    flavorNotes: 'Steamed to 65°C, velvety micro-bubbles highlighting sweet milk lactose and single-origin brightness.',
    chefNote: 'Pairs best with fresh French butter croissants.'
  },
  {
    id: 'artisan-bakery',
    title: 'The Morning Bake',
    subtitle: 'Laminated Pastries Daily',
    category: 'BAKERY',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    flavorNotes: 'AOP French butter folded 72 times, baked at dawn to delicate flaky perfection.',
    chefNote: 'Hand-crafted every sunrise in our open bakery.'
  },
  {
    id: 'savory-kitchen',
    title: 'Umami Broth Bowls',
    subtitle: 'Slow-Simmered Comfort',
    category: 'CUISINE',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    flavorNotes: '18-hour bone broth infused with local aromatics, wild mushrooms, and scallion oil.',
    chefNote: 'An Oura classic blending Asian heritage with cafe refinement.'
  },
  {
    id: 'slow-dining',
    title: 'Handmade Pasta & Mains',
    subtitle: 'Truffle & Parmesan Crust',
    category: 'DINING',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    flavorNotes: 'Fresh extruded rigatoni bathed in shaved black truffle, aged parmigiano-reggiano and herb butter.',
    chefNote: 'Available exclusively for twilight dinner service.'
  }
];

export const ROASTER_PARTNERS = [
  { name: 'SUMATRA GAYO', origin: 'Aceh Highlands, 1500m', process: 'Wet Hulled' },
  { name: 'ETHIOPIA YIRGACHEFFE', origin: 'Gedeo Zone, 2000m', process: 'Natural Washed' },
  { name: 'COLOMBIA HUILA', origin: 'San Agustin, 1750m', process: 'Honey Anaerobic' },
  { name: 'LABORE ARTISAN', origin: 'Specialty Roastery Partner', process: 'Small Batch Drum' },
  { name: 'OURA RESERVE', origin: 'Single-Origin Estate Lot', process: 'Slow Sun-Dried' },
];

export const FULL_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Iced Tiramisu Latte',
    price: '$7.50',
    category: 'Specialty',
    description: 'Double shot espresso over chilled oat milk, layered with mascarpone sabayon and dusting of Valrhona cocoa.',
    tags: ['Signature', 'Cold', 'Customer Favorite']
  },
  {
    id: 'm2',
    name: 'Coconut Cloud Matcha',
    price: '$7.00',
    category: 'Specialty',
    description: 'Ceremonial Uji matcha whisked over fresh organic coconut water with sweet cream cloud foam.',
    tags: ['Matcha', 'Iced', 'Refined']
  },
  {
    id: 'm3',
    name: 'Single-Origin V60 Pour Over',
    price: '$6.50',
    category: 'Coffee',
    description: 'Ethiopia Yirgacheffe notes of bergamot, peach blossoms, and jasmine honey, brewed on light-guided Pourx scale.',
    tags: ['Filter', 'Light Roast', 'Floral']
  },
  {
    id: 'm4',
    name: 'Cortado Corto',
    price: '$5.00',
    category: 'Coffee',
    description: 'Equal parts ristretto espresso and textured silky milk served in custom fluted glassware.',
    tags: ['Hot', 'Strong', 'Classic']
  },
  {
    id: 'm5',
    name: 'Crispy Bebek Confit Bowl',
    price: '$16.50',
    category: 'Food',
    description: 'Spiced aromatic duck leg confit, garlic jasmine rice, sambal matah, and charred lime relish.',
    tags: ['Malang Classic', 'Savory', 'Chef Pick']
  },
  {
    id: 'm6',
    name: 'Truffle Porcini Rigatoni',
    price: '$18.00',
    category: 'Food',
    description: 'Handcrafted pasta, wild sautéed porcini mushrooms, black summer truffle paste, 24-month parmigiano.',
    tags: ['Dining', 'Vegetarian', 'Rich']
  },
  {
    id: 'm7',
    name: 'Pistachio Cream Choux',
    price: '$6.50',
    category: 'Pastries',
    description: 'Craquelin pastry shell stuffed with roasted Bronte pistachio diplomat cream and crushed praline.',
    tags: ['Bakery', 'Sweet', 'Fresh Daily']
  },
  {
    id: 'm8',
    name: 'Almond Frangipane Croissant',
    price: '$5.50',
    category: 'Pastries',
    description: 'Twice-baked sourdough croissant soaked in vanilla syrup, filled with rich almond cream and toasted flakes.',
    tags: ['Bakery', 'Morning Favorite']
  }
];
