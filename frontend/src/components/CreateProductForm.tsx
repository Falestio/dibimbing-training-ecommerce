import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
    Select,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useCreateProduct } from "@/graphql/product/useCreateProduct";
import { useCategories } from "@/graphql/category/readAll";
import { Category, Product } from "@/types";
import { useRouter } from "next/router";
import * as yup from "yup";

const productSchema = yup.object({
    title: yup
        .string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters long")
        .max(255, "Title must be less than 255 characters"),
    slug: yup
        .string()
        .required("Slug is required")
        .min(3, "Slug must be at least 3 characters long")
        .max(255, "Slug must be less than 255 characters"),
    description: yup.string().required("Description is required"),
    imageUrl: yup
        .string()
        .required("Image URL is required")
        .url("Image URL must be a valid URL"),
    price: yup
        .number()
        .required("Price is required")
        .positive("Price must be a positive number"),
    categoryId: yup
        .number()
        .required("Category ID is required")
        .positive("Category ID must be greater than 0")
        .integer("Category ID must be an integer"),
});

interface FormErrors {
    title?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    price?: string;
    categoryId?: string;
}

export function CreateProductForm() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const { createProduct, result } = useCreateProduct();
    const { data, fetching, error } = result;
    const toast = useToast();
    const router = useRouter();
    const [errors, setErrors] = useState<FormErrors>({});

    const { categories, loading, error: categoriesError } = useCategories();

    const validateForm = async () => {
        try {
            const formData = {
                title,
                slug,
                description,
                imageUrl,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
            };
            await productSchema.validate(formData, { abortEarly: false });
            return formData; // validation success
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors = err.inner.reduce(
                    (acc, currentError) => ({
                        ...acc,
                        [currentError.path as string]: currentError.message,
                    }),
                    {}
                );
                setErrors(newErrors);
            }
            return null; // Validation failed
        }
    };

    const onSubmit = async () => {
        const validData = await validateForm();

        if (validData) {
            try {
                const response = await createProduct(validData);

                toast({
                    title: "Product created successfully.",
                    description: "Your product has been created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.push("/admin");
            } catch (err) {
                let errorMessage = "Validation failed.";
                if (err instanceof yup.ValidationError) {
                    errorMessage = err.errors.join(", ");
                }

                toast({
                    title: "Error creating product.",
                    description: errorMessage,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    if (error) {
        return <Box>Error: {error.message}</Box>;
    }

    return (
        <Box
            as="form"
            onSubmit={(e: any) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.slug}>
                <FormLabel>Slug</FormLabel>
                <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Slug"
                />
                <FormErrorMessage>{errors.slug}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    height="auto"
                    maxHeight="160px"
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.imageUrl}>
                <FormLabel>Image URL</FormLabel>
                <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
                <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.price}>
                <FormLabel>Price</FormLabel>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    min="0"
                />
                <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                    placeholder="Select category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    isDisabled={loading}
                >
                    {categories?.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" isLoading={fetching} marginTop={4}>
                Create Product
            </Button>
        </Box>
    );
}
