export type Category = {
    id: string;
    title: string;
};

export type Product = {
    id: string;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    price: number;
    category: Category;
};
