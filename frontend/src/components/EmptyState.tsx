import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface EmptyStateProps {
    item: string;
}

export const EmptyState = ({ item }: EmptyStateProps) => {
    return (
        <Box textAlign="center" mt={4}>
            <Image src="/images/empty-box.png" alt="Empty Box" width={500} height={300} />
            <Text fontSize="2xl">{item} Tidak Ditemukan.</Text>
        </Box>
    );
};
