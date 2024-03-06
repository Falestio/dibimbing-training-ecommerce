import { Box, Text, Image, Flex, VStack } from '@chakra-ui/react';
import { Product } from '@/types';

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <Flex p="6" rounded="md" bg="white" align="center">
      <Image
        src={product.imageUrl}
        alt={product.title}
        borderRadius="md"
        htmlWidth="50%"
      />
      <VStack align="start" ml="6" spacing="4">
        <Text fontSize="4xl" fontWeight="bold">{product.title}</Text>
        <Text fontSize="3xl" color="teal.500">${product.price}</Text>
        <Text fontSize="lg">{product.description}</Text>
        {product.category?.title && (
          <Text fontSize="sm" color="gray.500">
            Category: {product.category.title}
          </Text>
        )}
      </VStack>
    </Flex>
  );
};

export default ProductDetail;
