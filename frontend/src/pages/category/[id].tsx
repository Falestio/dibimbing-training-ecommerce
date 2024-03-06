import { useRouter } from 'next/router';
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useCategoryWithProductsById } from '@/graphql/category/readOneAndItsProduct';
import { ProductCard } from '@/components/ProductCard'; 
import { Product } from '@/types';

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { categoryWithProducts, loading, error } = useCategoryWithProductsById(Number(id));

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!categoryWithProducts) return <Text>No category found</Text>;

  return (
    <Box p={5}>
      <Heading mb={4}>{categoryWithProducts.title}</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {categoryWithProducts.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryPage;
