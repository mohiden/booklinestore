import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: 'l41xa7wo',
  dataset: 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-08-11',
  useCdn: process.env.NODE_ENV === 'production',
};

const builder = imageUrlBuilder(config);

export function urlFor(source: string) {
  return builder.image(source);
}
export const client = createClient(config);
