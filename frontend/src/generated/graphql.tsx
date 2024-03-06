import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  title: Scalars['String'];
  products?: Maybe<Array<Product>>;
};

export type CategoryInput = {
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  updateProduct: Product;
  deleteProduct: Scalars['Boolean'];
  createCategory: Category;
  updateCategory: Category;
  deleteCategory: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
  id: Scalars['Float'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
  id: Scalars['Float'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  category?: Maybe<Category>;
  price: Scalars['Float'];
};

export type ProductInput = {
  title: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  price: Scalars['Float'];
  categoryId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  productBySlug?: Maybe<Product>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  categoryWithProducts?: Maybe<Category>;
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['Float'];
};


export type QueryCategoryWithProductsArgs = {
  id: Scalars['Float'];
};

export type UpdateCategoryInput = {
  title: Scalars['String'];
};

export type UpdateProductInput = {
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  categoryId?: Maybe<Scalars['Float']>;
};

export type ReadAllCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadAllCategoryQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'title'>
  )> }
);


export const ReadAllCategoryDocument = gql`
    query readAllCategory {
  categories {
    id
    title
  }
}
    `;

export function useReadAllCategoryQuery(options: Omit<Urql.UseQueryArgs<ReadAllCategoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReadAllCategoryQuery>({ query: ReadAllCategoryDocument, ...options });
};