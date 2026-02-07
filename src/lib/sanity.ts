import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'l23a5gbu', // Replace with your project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper function to fetch data
export async function getBlogPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "mainImage": mainImage.asset->url,
    body,
    publishedAt,
    "seoDescription": string(body[0].children[0].text)
  }`;
  return client.fetch(query, { slug });
}
