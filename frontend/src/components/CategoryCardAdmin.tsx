import React from "react";
import { Box, Button, Flex, Spacer, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useDeleteCategory } from "@/graphql/category/deleteOne";
import { useRouter } from "next/router";

interface CategoryCardProps {
    category: {
        id: string;
        title: string;
    };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const toast = useToast();
    const { deleteCategory, state } = useDeleteCategory();
    const router = useRouter()

    const handleDelete = async (id: string) => {
        await deleteCategory(parseFloat(id));
        toast({
            title: "Berhasil",
            description: "Berhasil menghapus kategori.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        router.reload()
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
            <Box>
                <Text fontWeight="bold">{category.title}</Text>
            </Box>
            <Spacer />
            <Box>
                <Link href={`/admin/category/edit?id=${category.id}`} passHref>
                    <Button>Edit</Button>
                </Link>
                <Button
                    ml={2}
                    colorScheme="red"
                    onClick={() => handleDelete(category.id)}
                    isLoading={state.fetching}
                >
                    Delete
                </Button>
            </Box>
        </Flex>
    );
};
