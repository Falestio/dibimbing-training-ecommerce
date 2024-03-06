import { useMutation } from "urql";

const DeleteCategoryMutation = `
mutation DeleteCategory($id: Float!) {  
    deleteCategory(id: $id)
}
`;

export function useDeleteCategory() {
    const [state, executeMutation] = useMutation(DeleteCategoryMutation);

    const deleteCategory = (id: number) => {
        executeMutation({ id });
    };

    return { deleteCategory, state };
}
