import { useMutation } from "urql";

const UpdateProductMutation = `
mutation UpdateProduct($id: Float!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    title
    description
    price
    slug
    imageUrl
    category {
      id
      title
    }
  }
}`;

export function useEditProduct() {
    const [state, executeMutation] = useMutation(UpdateProductMutation);

    const editProduct = (id: any, input: any) => {
        executeMutation({ id, input });
    };

    return { editProduct, state };
}
