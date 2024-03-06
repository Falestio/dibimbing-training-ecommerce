import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useUpdateCategory } from "@/graphql/category/updateOne";
import { Category } from "@/types";
import { useRouter } from "next/router";
import * as yup from "yup";

interface EditCategoryFormProps {
    category: Category;
}

interface FormErrors {
    title?: string;
}

const editCategorySchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must be less than 255 characters"),
});

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
    category,
}) => {
    const [title, setTitle] = useState(category.title);
    const [updateCategory, result] = useUpdateCategory();
    const { fetching, error } = result;
    const toast = useToast();
    const router = useRouter();
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = async () => {
        try {
            await editCategorySchema.validate({ title }, { abortEarly: false });
            return true; // Validation passed
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
            return false; // Validation failed
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid && !fetching) {
            try {
                const result = await updateCategory({
                    id: parseInt(category.id),
                    input: { title },
                });
                toast({
                    title: "Kategori berhasil diperbarui.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.push("/admin/category");
            } catch (err) {
                toast({
                    title: "Terjadi kesalahan saat memperbarui kategori.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel htmlFor="title">Category Title</FormLabel>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter category title"
                />
            </FormControl>
            <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                isLoading={fetching}
            >
                Update Category
            </Button>
        </form>
    );
};
