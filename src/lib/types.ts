export interface Product {
  id: string;
  name: string;
  category: 'desk-mats' | 'keyboards' | 'mice' | 'organization' | 'audio';
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  badge?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  colors: {
    name: string;
    hex: string;
    image: string;
  }[];
  primaryImage: string;
  secondaryImage?: string;
  specs: { label: string; value: string }[];
  details: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  quantity: number;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  count: number;
  image: string;
  featured?: boolean;
}

export interface StoryItem {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  quote?: string;
  author?: string;
  image: string;
  aspect: string;
}
