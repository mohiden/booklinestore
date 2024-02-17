import {client} from '@/lib/sanity';
import {IBook} from '@/types';
import {groq} from 'next-sanity';

const getBook = async (id: string): Promise<IBook> => {
  return await client.fetch(
    groq`*[_type == "book" && _id == $id][0]{
    _id,
    title,
    price,
    quantity,
    description,
    "language": language->{"name": name, "_id": _id},
    "images": images[].asset->{"url": url, "_id": _id},
    "categories": categories[]->{"name":name, "_id":_id},
      }`,
    {id},
  );
};

export default getBook;
