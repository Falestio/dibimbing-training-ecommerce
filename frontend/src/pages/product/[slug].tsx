import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetail from "@/components/ProductDetail";
import { useProductBySlug } from "@/graphql/product/useProductBySlug";
import { useCategoryWithProductsById } from "@/graphql/category/readOneAndItsProduct";
import { ProductCard } from "@/components/ProductCard";
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { Product } from "@/types";

const ProductPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const {
        product,
        loading: productLoading,
        error: productError,
    } = useProductBySlug(typeof slug === "string" ? slug : "");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const {
        categoryWithProducts,
        loading: categoryLoading,
        error: categoryError,
    } = useCategoryWithProductsById(categoryId as number);

    useEffect(() => {
        if (product?.category?.id) {
            setCategoryId(Number(product.category.id));
        }
    }, [product]);

    if (productLoading || categoryLoading) return <p>Loading...</p>;
    if (productError || categoryError)
        return <p>Error: {productError?.message || categoryError?.message}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <Box>
            <ProductDetail product={product} />
            <Box mt={10}>
                <Heading mb={4}>Produk lain dalam kategori ini</Heading>
                <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                    {categoryWithProducts?.products.map(
                        (relatedProduct: Product) =>
                            relatedProduct.id !== product.id && (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                />
                            )
                    )}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default ProductPage;
