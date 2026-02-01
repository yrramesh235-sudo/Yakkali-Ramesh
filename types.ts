
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Hoodie' | 'T-Shirt' | 'Accessory' | 'Limited';
  image: string;
  description: string;
  powerLevel: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type AppView = 'Home' | 'Shop' | 'Studio' | 'Oracle';
