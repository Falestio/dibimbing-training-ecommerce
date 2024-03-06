// components/Navbar.tsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Link,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCategories } from "@/graphql/category/readAll";
import { Category } from "@/types";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";

const Navbar = () => {
    const { categories, loading, error } = useCategories();

    return (
        <Flex bg="teal.500" p="4" color="white" alignItems="center">
            <Box p="2">
                <NextLink href="/" passHref>
                    <Flex alignItems={"center"} gap={4}>
                        <Image
                            src="/images/sakura.png"
                            alt="logo"
                            width={50}
                            height={30}
                        />
                        <Text fontSize={"xl"}>Sakura Store</Text>
                    </Flex>
                </NextLink>
            </Box>
            <Spacer />
            <Flex>
                <NextLink href="/admin" passHref>
                    <Text p="2">Admin</Text>
                </NextLink>
                <Menu>
                    <MenuButton
                        as={Button}
                        p="2"
                        rightIcon={<ChevronDownIcon />}
                    >
                        Categories
                    </MenuButton>
                    <MenuList>
                        {!loading &&
                            !error &&
                            categories.map((category: Category) => (
                                <NextLink
                                    key={category.id}
                                    href={`/category/${category.id}`}
                                    passHref
                                >
                                    <MenuItem
                                        as={Link}
                                        color="teal.600"
                                        _hover={{ color: "teal.800" }}
                                    >
                                        {category.title}
                                    </MenuItem>
                                </NextLink>
                            ))}
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
};

export default Navbar;
