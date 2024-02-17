export interface IBook {
  _id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  quantity: string;
  language: ILanguage;
  cateogries: ICategory[];
  price: string;
  images: IImage[];
}

export interface IImage {
  url: string;
  _id: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ILanguage {
  _id: string;
  name: string;
}
