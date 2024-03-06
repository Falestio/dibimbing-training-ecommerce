import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useCreateCategory } from "@/graphql/category/createOne";
import { useState } from "react";
import { useRouter } from "next/router";
import * as yup from 'yup';

const categorySchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters').max(255, 'Title must be less than 255 characters'),
});

interface FormErrors {
    title?: string;
}

export function CreateCategoryForm() {
    const [title, setTitle] = useState("");
    const { createCategory, result } = useCreateCategory();
    const { fetching, error } = result;
    const toast = useToast();
    const router = useRouter();
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = async () => {
        try {
            await categorySchema.validate({ title }, { abortEarly: false });
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
    const onSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid && !fetching) {
            createCategory({ title });
            toast({
                title: "Category created.",
                description: "We've created your category for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            router.push("/admin/category");
        }
    };

    if (error) {
        return <Box>Error: {error.message}</Box>;
    }

    return (
        <Box as="form" onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={fetching}>Create Category</Button>
        </Box>
    );
}
