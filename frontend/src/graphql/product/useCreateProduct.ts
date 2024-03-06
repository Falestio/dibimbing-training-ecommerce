import { useMutation } from "urql";

const CreateProduct = `
mutation CreateNewProduct($title: String!, $slug: String!, $description: String!, $imageUrl: String!, $price: Float!, $categoryId: Float!) {
  createProduct(input: {
    title: $title,
    slug: $slug,
    description: $description,
    imageUrl: $imageUrl,
    price: $price,
    categoryId: $categoryId
  }) {
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

export function useCreateProduct() {
  const [result, createProduct] = useMutation(CreateProduct);

  return {
    createProduct,
    result,
  };
}