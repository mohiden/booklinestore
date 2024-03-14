import {groq} from 'next-sanity';
import {client} from '@/lib/sanity';
import {IBook} from '@/types';

const getBooks = async (): Promise<IBook[]> => {
  return await client.fetch(groq`*[_type == "book" && quantity > 0]{
    _id,
    title,
    price,
    isFeatured,
    author,
    isArchived,
    quantity,
    description,
    "language": language->{"name": name, "_id": _id},
    "images": images[].asset->{"url": url, "_id": _id},
    "categories": categories[]->{"name":name, "_id":_id},
  }`);
};

export default getBooks;
