export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  imageUrl: string;
  categoryName?: string; 
  quantity?: number;
}