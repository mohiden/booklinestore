import {client} from '@/lib/sanity';
import {ICategory} from '@/types';
import {groq} from 'next-sanity';

const getCategory = async (name: string): Promise<ICategory> => {
  return await client.fetch(
    groq`*[_type == "category" && name == $name][0]{
    _id,
    name,
  }`,
    {name},
  );
};

export default getCategory;
