import { useMutation } from 'urql';

const UpdateCategoryMutation = `
mutation UpdateCategory($id: Float!, $input: UpdateCategoryInput!) {
  updateCategory(id: $id, input: $input) {
    id
    title
  }
}
`;

interface UpdateCategoryInput {
  id: number;
  input: {
    title: string;
  };
}

export function useUpdateCategory() {
  const [result, executeMutation] = useMutation(UpdateCategoryMutation);

  const updateCategory = async (variables: UpdateCategoryInput) => {
    await executeMutation(variables);
  };

  return [updateCategory, result] as const;
}
