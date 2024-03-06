import React from "react";
import { Box, Button, VStack, Flex } from "@chakra-ui/react";
import { ProductCardAdmin } from "@/components/ProductCardAdmin";
import { useProducts } from "@/graphql/product/useProducts";
import { Product } from "@/types";
import { useRouter } from "next/router";
import { EmptyState } from "@/components/EmptyState";

function ProductPageAdmin() {
    const { products, loading, error } = useProducts();
    const router = useRouter();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const onAddNew = () => {
        router.push("/admin/create");
    };

    return (
        <Box p={4}>
            <Flex>
                <Button mb={4} onClick={() => router.push("/admin/create")}>
                    Add new Product
                </Button>
                <Button
                    ml={4}
                    mb={4}
                    onClick={() => router.push("/admin/category")}
                >
                    Manage Categories
                </Button>
            </Flex>
            <VStack spacing={4}>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCardAdmin key={product.id} product={product} />
                    ))
                ) : (
                    <EmptyState item="Produk" />
                )}
            </VStack>
        </Box>
    );
}

export default ProductPageAdmin;
