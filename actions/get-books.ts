import {groq} from 'next-sanity';
import {client} from '@/lib/sanity';
import {IBook} from '@/types';

const getBooks = async (
  languageId: string = '',
  categoryId: string = '',
): Promise<IBook[]> => {
  return languageId
    ? await client.fetch(
        groq`*[_type == "book" && language->_id == $languageId]{
    _id,
    title,
    price,
    isFeatured,
    isArchived,
    author,
    quantity,
    description,
    "language": language->{"name": name, "_id": _id},
    "images": images[].asset->{"url": url, "_id": _id},
    "categories": categories[]->{"name":name, "_id":_id},
  }`,
        {languageId},
      )
    : await client.fetch(groq`*[_type == "book" && quantity > 0]{
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
