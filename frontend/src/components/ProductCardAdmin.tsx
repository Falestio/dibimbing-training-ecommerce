import React from "react";
import {
    Box,
    Button,
    Image,
    Flex,
    Spacer,
    Text,
    useToast,
    Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDeleteProduct } from "@/graphql/product/useDeleteProduct";

export function ProductCardAdmin({ product }: any) {
    const router = useRouter();
    const { state, deleteProduct } = useDeleteProduct();
    const toast = useToast();

    const onEdit = () => {
        router.push(`/admin/edit?id=${product.id}`);
    };

    const onDelete = (id: number) => {
        deleteProduct(id);
        toast({
            title: "Product deleted.",
            description: `Product with id ${id} has been deleted.`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        router.reload();
    };

    return (
        <Flex
            alignItems="center"
            p={4}
            borderWidth={1}
            borderRadius="md"
            width="100%"
            justifyContent="flex-start"
        >
            <Image src={product.imageUrl} boxSize="64px" />
            <Box ml={4} maxW="70%">
                <Text fontWeight="bold">{product.title}</Text>
                <Text
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                        textOverflow: "ellipsis",
                    }}
                >
                    {product.description}
                </Text>
                <Text>${product.price}</Text>
                {product.category && (
                    <Badge colorScheme="teal">{product.category.title}</Badge>
                )}
            </Box>
            <Spacer />
            <Box>
                <Button onClick={onEdit}>Edit</Button>
                <Button
                    ml={2}
                    colorScheme="red"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </Button>
            </Box>
        </Flex>
    );
}
