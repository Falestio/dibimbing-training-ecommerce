import { useMutation } from "urql";

const DeleteProductMutation = `
mutation DeleteProduct($id: Float!) {  
    deleteProduct(id: $id)
  } 
`;

export function useDeleteProduct() {
    const [state, executeMutation] = useMutation(DeleteProductMutation);

    const deleteProduct = (id: any) => {
        const floatId = parseFloat(id);

        executeMutation({ id: floatId })
            .then((result) => {
                if (result.error) {
                    console.error(
                        "Error:",
                        result.error.message
                    );
                }
            })
            .catch((error) => {
                console.error("Error executing mutation:", error);
            });
    };

    return { deleteProduct, state };
}
