import { useMutation } from 'urql';

const CreateCategoryMutation = `
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      id
      title
    }
  }
`;

export function useCreateCategory() {
  const [result, createCategoryMutation] = useMutation(CreateCategoryMutation);

  const createCategory = async (input: { title: string }) => {
    return createCategoryMutation({ input });
  };

  return {
    createCategory,
    result,
  };
}
