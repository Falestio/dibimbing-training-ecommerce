import { useQuery } from "urql";

const GetCategoriesQuery = `
  query {
    categories {
      id
      title
    }
  }
`;

export function useCategories() {
  const [result] = useQuery({ query: GetCategoriesQuery });
  const { data, fetching, error } = result;

  return {
    categories: data?.categories,
    loading: fetching,
    error,
  };
}
