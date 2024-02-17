import {client} from '@/lib/sanity';
import {ILanguage} from '@/types';
import {groq} from 'next-sanity';

const getLanguages = async (): Promise<ILanguage[]> => {
  return await client.fetch(groq`*[_type == "language"]{
  _id,
  name,
  }`);
};

export default getLanguages;
