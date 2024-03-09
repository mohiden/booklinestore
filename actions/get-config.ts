import {client} from '@/lib/sanity';
import {IConfig} from '@/types';
import {groq} from 'next-sanity';

const getConfig = async (): Promise<IConfig> => {
  return await client.fetch(
    groq`*[_type == "config"][0]{
    _id,
    exchangeRate,
  }`,
  );
};

export default getConfig;
