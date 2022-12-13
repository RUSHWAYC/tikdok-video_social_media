import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'ljooeezw',
  dataset: 'production',
  apiVersion: '2022-12-13',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});