// src/resolvers/ProductResolver.ts
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import {
    Product,
    ProductInput,
    UpdateProductInput,
} from "../entities/Product.js";
import { getRepository } from "typeorm";
import { Category } from "../entities/Category";

@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    async products(): Promise<Product[]> {
        const productRepository = getRepository(Product);
        return productRepository.find({ relations: ["category"] });
    }

    @Query(() => Product, { nullable: true })
    async productBySlug(@Arg("slug") slug: string): Promise<Product | null> {
        const productRepository = getRepository(Product);
        return productRepository.findOne({
            where: { slug },
            relations: ["category"],
        });
    }

    @Mutation(() => Product)
    async createProduct(@Arg("input") input: ProductInput): Promise<Product> {
        const categoryRepository = getRepository(Category);
        const category = await categoryRepository.findOne({
            where: { id: input.categoryId },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        const productRepository = getRepository(Product);
        const product = productRepository.create({
            ...input,
            category,
        });

        await productRepository.save(product);
        return product;
    }

    @Mutation(() => Product)
    async updateProduct(
        @Arg("id") id: number,
        @Arg("input") input: UpdateProductInput
    ): Promise<Product> {
        const productRepository = getRepository(Product);
        const categoryRepository = getRepository(Category);

        let product = await productRepository.findOne({
            where: { id },
            relations: ["category"],
        });
        if (!product) {
            throw new Error("Product not found");
        }

        if (input.categoryId !== undefined) {
            const category = await categoryRepository.findOne({
                where: { id: input.categoryId },
            });
            if (!category) {
                throw new Error("Category not found");
            }
            product.category = category;
        }

        const { categoryId, ...updateInput } = input;

        product = productRepository.merge(product, updateInput);
        await productRepository.save(product);
        return product;
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id") id: number): Promise<boolean> {
        const productRepository = getRepository(Product);
        const product = await productRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error("Product not found");
        }

        await productRepository.remove(product);
        return true;
    }
}
