import { useQuery } from 'urql';

const GetCategoriesWithProductsQuery = `
  query {
    categories {
      id
      title
      products {
        id
        title
        slug
        description
        imageUrl
        price
      }
    }
  }
`;

export function useCategoriesWithProducts() {
  const [result] = useQuery({ query: GetCategoriesWithProductsQuery });
  const { data, fetching, error } = result;

  return {
    categories: data?.categories,
    loading: fetching,
    error,
  };
}
