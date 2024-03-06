import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, useToast } from '@chakra-ui/react';
import { EditCategoryForm } from '@/components/EditCategoryForm';
import { readOne } from '@/graphql/category/readOne';

const EditCategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const { category, loading, error } = readOne(parseInt(id as string));

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error fetching category',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category not found</p>;

  return (
    <Box p={5}>
      <EditCategoryForm category={category} />
    </Box>
  );
};

export default EditCategoryPage;
