import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Select,
    FormErrorMessage,
    Textarea,
} from "@chakra-ui/react";
import { useEditProduct } from "@/graphql/product/useEditProduct";
import { useCategories } from "@/graphql/category/readAll";
import { Category, Product } from "@/types";
import { useRouter } from "next/router";
import * as yup from "yup";

interface EditProductFormProps {
    product: Product;
}

interface FormErrors {
    title?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    price?: string;
    categoryId?: string;
}

const editProductSchema = yup.object({
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

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
    const [title, setTitle] = useState(product.title);
    const [slug, setSlug] = useState(product.slug);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.toString());
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [categoryId, setCategoryId] = useState(
        product.category ? product.category.id.toString() : ""
    );
    const { categories, loading: categoriesLoading } = useCategories();
    const { editProduct, state: editState } = useEditProduct();
    const [errors, setErrors] = useState<FormErrors>({});
    const toast = useToast();
    const router = useRouter();


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
            await editProductSchema.validate(formData, { abortEarly: false });
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

        if (!editState.fetching && validData) {
            editProduct(parseFloat(product.id), validData);
            toast({
                title: "Product updated.",
                description: "We've updated your product for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            router.push("/admin");
        }
    };

    if (editState.error) {
        return <Box>Error: {editState.error.message}</Box>;
    }

    return (
        <Box
            as="form"
            onSubmit={(e) => {
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
                    isDisabled={categoriesLoading}
                >
                    {categories?.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" isLoading={editState.fetching}>
                Update Product
            </Button>
        </Box>
    );
};

export default EditProductForm;
