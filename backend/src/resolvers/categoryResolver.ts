import { Resolver, Query, Mutation, Arg } from "type-graphql";
import {
    Category,
    CategoryInput,
    UpdateCategoryInput,
} from "../entities/Category";
import { getRepository } from "typeorm";

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        const categoryRepository = getRepository(Category);
        return categoryRepository.find({ relations: ["products"] });
    }

    @Query(() => Category, { nullable: true })
    async category(@Arg("id") id: number): Promise<Category | null> {
        const category = await getRepository(Category).findOne({
            where: { id }
        });
        return category ?? null;
    }

    @Query(() => Category, { nullable: true })
    async categoryWithProducts(@Arg("id") id: number): Promise<Category | null> {
        const category = await getRepository(Category).findOne({
            where: { id },
            relations: ["products"]
        });
        return category ?? null;
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg("input") input: CategoryInput
    ): Promise<Category> {
        const categoryRepository = getRepository(Category);
        const category = categoryRepository.create(input);
        await categoryRepository.save(category);
        return category;
    }

    @Mutation(() => Category)
    async updateCategory(
        @Arg("id") id: number,
        @Arg("input") input: UpdateCategoryInput
    ): Promise<Category> {
        const categoryRepository = getRepository(Category);
        let category = await categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new Error("Category not found");
        }

        // Update dan simpan kategori
        category.title = input.title;
        await categoryRepository.save(category);
        return category;
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id") id: number): Promise<boolean> {
        const categoryRepository = getRepository(Category);
        try {
            const result = await categoryRepository.delete(id);
            if (result.affected === 0) {
                throw new Error("Category not found");
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
