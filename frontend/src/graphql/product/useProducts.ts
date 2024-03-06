import { useQuery } from 'urql';

const GetAllProductsQuery = `
  query GetAllProducts {
    products {
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

export function useProducts() {
  const [result] = useQuery({ query: GetAllProductsQuery });
  const { data, fetching, error } = result;

  return {
    products: data?.products,
    loading: fetching,
    error,
  };
}
