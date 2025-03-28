export interface ImageType {
  image: string;
}

export interface CategoriesType {
  id: number;
  name: string;
}

export interface ProductType {
  id: number;
  title: string;
  categories: CategoriesType[];
  price: number;
  description: string;
  images: ImageType[];
  sale?: number;
}
