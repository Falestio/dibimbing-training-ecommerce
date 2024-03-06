import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProducts } from '@/graphql/product/useProducts';
import EditProductForm from '@/components/EditProductForm';
import { Product } from '@/types';

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id && products) {
      const productToEdit = products.find((product: Product) => product.id === id);
      setProduct(productToEdit);
    }
  }, [id, products]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <Box>
      {product && <EditProductForm product={product} />}
    </Box>
  );
};

export default EditProductPage;