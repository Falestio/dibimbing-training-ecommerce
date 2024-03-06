import React from "react";
import { Box, Button, VStack, Flex } from "@chakra-ui/react";
import { CategoryCard } from "@/components/CategoryCardAdmin";
import { EmptyState } from "@/components/EmptyState";
import { useReadAllCategoryQuery } from "@/generated/graphql";
import { Category } from "@/types";
import Link from "next/link";

const CategoryPageAdmin = () => {
    const result = useReadAllCategoryQuery();
    const { data, error, fetching: loading } = result[0];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Box p={4}>
            <Flex justifyContent="space-between">
                <Link href="/admin/category/create">
                    <Button>Tambah</Button>
                </Link>
            </Flex>

            <VStack spacing={4} mt={4}>
                {/* @ts-ignore */}
                {data?.categories?.length > 0 ? (
                    data?.categories?.map((category: Category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))
                ) : (
                    <EmptyState item="Kategori" />
                )}
            </VStack>
        </Box>
    );
};

export default CategoryPageAdmin;
