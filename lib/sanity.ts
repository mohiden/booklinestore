import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  // projectId: 'mnr5czpw',
  // dataset: 'production',
  projectId: 'l41xa7wo',
  dataset: 'production',
  apiVersion: '2021-08-11',
  useCdn: false,
};

const builder = imageUrlBuilder(config);

export function urlFor(source: string) {
  return builder.image(source);
}
export const client = createClient(config);
