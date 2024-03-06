import { Box, Text, Image, VStack } from "@chakra-ui/react";
import { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link href={`/product/${product.slug}`} passHref>
            <VStack
                as="a"
                boxShadow="md"
                p="6"
                rounded="md"
                bg="white"
                align="stretch"
                spacing={4}
                height="100%"
            >
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    borderRadius="md"
                    htmlWidth="100%"
                    objectFit="cover"
                />
                <VStack align="start" flex="1" spacing={3}>
                    <Text fontSize="xl" fontWeight="bold">
                        {product.title}
                    </Text>
                    <Text fontSize="md" noOfLines={4}>
                        {product.description}
                    </Text>
                    <Text fontSize="lg" color="teal.500">
                        ${product.price}
                    </Text>
                    {product.category?.title && (
                        <Text fontSize="sm" color="gray.500">
                            Category: {product.category.title}
                        </Text>
                    )}
                </VStack>
            </VStack>
        </Link>
    );
};
