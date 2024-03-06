import { Box, SimpleGrid } from "@chakra-ui/react";
import { useProducts } from "@/graphql/product/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";
import { EmptyState } from "@/components/EmptyState";

const HomePage = () => {
    const { products, loading, error } = useProducts();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <Box padding="4">
            <SimpleGrid columns={3} spacing={10}>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <EmptyState item="Produk" />
                )}
            </SimpleGrid>
        </Box>
    );
};

export default HomePage;
