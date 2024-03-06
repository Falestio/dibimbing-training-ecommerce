import { useQuery } from 'urql';

const GetCategoryWithProductsByIdQuery = `
  query GetCategoryWithProductsById($id: Float!) {
    categoryWithProducts(id: $id) {
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

export function useCategoryWithProductsById(id: number) {
  const [result] = useQuery({
    query: GetCategoryWithProductsByIdQuery,
    variables: { id },
    pause: id === undefined,
  });
  const { data, fetching, error } = result;

  return {
    categoryWithProducts: data?.categoryWithProducts,
    loading: fetching,
    error,
  };
}
