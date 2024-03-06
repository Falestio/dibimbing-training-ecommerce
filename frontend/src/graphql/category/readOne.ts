import { useQuery } from 'urql';

const GetCategoryByIdQuery = `
  query GetCategoryById($id: Float!) {
    category(id: $id) {
      id
      title
    }
  }
`;

export function readOne(id: number) {
  const [result] = useQuery({
    query: GetCategoryByIdQuery,
    variables: { id },
    pause: id === undefined,
  });
  const { data, fetching, error } = result;

  return {
    category: data?.category,
    loading: fetching,
    error,
  };
}
