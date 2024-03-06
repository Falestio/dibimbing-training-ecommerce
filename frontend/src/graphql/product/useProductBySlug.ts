import { useQuery } from 'urql';

const GetProductBySlugQuery = `
  query GetProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      id
      title
      slug
      description
      imageUrl
      price
      category {
        id
        title
      }
    }
  }
`;

export function useProductBySlug(slug: string) {
  const [result] = useQuery({
    query: GetProductBySlugQuery,
    variables: { slug },
  });
  const { data, fetching, error } = result;

  return {
    product: data?.productBySlug,
    loading: fetching,
    error,
  };
}
