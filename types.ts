export interface IBook {
  _id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  author: string;
  quantity: number;
  language: ILanguage;
  cateogries: ICategory[];
  price: number;
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

export interface IOrderItem {
  _id: string;
  book: IBook;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  fullName: string;
  totalPrice: number;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  deliveryOption: string;
  orderDate: string;
}

export interface IConfig {
  _id: string;
  exchangeRate: number;
}
