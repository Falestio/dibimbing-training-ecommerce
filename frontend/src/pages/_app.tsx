import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import client from "@/utils/urqlClient";
import { urqlConfig } from "@/utils/urqlConfig";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Navbar />
            <Box px={{ base: "4", md: "8", lg: "16" }} pt="4">
                <Component {...pageProps} />
            </Box>
        </ChakraProvider>
    );
}

export default withUrqlClient(() => urqlConfig)(MyApp);
