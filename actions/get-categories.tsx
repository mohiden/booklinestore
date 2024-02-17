import {client} from '@/lib/sanity';
import {ICategory} from '@/types';
import {groq} from 'next-sanity';

const getCategories = async (): Promise<ICategory[]> => {
  return await client.fetch(groq`*[_type == "category"]{
    _id,
    name
  }`);
};

export default getCategories;
