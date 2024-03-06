import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, InputType } from 'type-graphql';
import { Category } from './Category';
import { IsNotEmpty, Length, IsUrl, IsPositive, IsInt, Min } from "class-validator";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    @IsNotEmpty({ message: "Title is required" })
    @Length(3, 255, { message: "Title must be between 3 and 255 characters" })
    title: string;

    @Field()
    @Column()
    @IsNotEmpty({ message: "Slug is required" })
    @Length(3, 255, { message: "Slug must be between 3 and 255 characters" })
    slug: string;

    @Field()
    @Column()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @Field()
    @Column()
    @IsUrl({}, { message: "Image URL must be a valid URL" })
    imageUrl: string;

    @Field(() => Category, { nullable: true })
    @ManyToOne(() => Category, category => category.products, {
        nullable: true,
        onDelete: "SET NULL"
    })
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @Field(() => Float)
    @Column("float")
    @IsPositive({ message: "Price must be a positive number" })
    price: number;
}

@InputType()
export class ProductInput {
    @Field()
    @IsNotEmpty({ message: "Title is required" })
    @Length(3, 255, { message: "Title must be between 3 and 255 characters long" })
    title: string;

    @Field()
    @IsNotEmpty({ message: "Slug is required" })
    @Length(3, 255, { message: "Slug must be between 3 and 255 characters long" })
    slug: string;

    @Field()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @Field()
    @IsNotEmpty({ message: "Image URL is required" })
    @IsUrl({}, { message: "Image URL must be a valid URL" })
    imageUrl: string;

    @Field(() => Float)
    @IsNotEmpty({ message: "Price is required" })
    @IsPositive({ message: "Price must be a positive number" })
    price: number;

    @Field()
    @IsInt({ message: "Category ID must be an integer" })
    @Min(1, { message: "Category ID must be greater than 0" })
    categoryId: number;
}

@InputType()
export class UpdateProductInput {
    @Field({ nullable: true })
    @IsNotEmpty()
    @Length(3, 255)
    title?: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @Length(3, 255)
    slug?: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    description?: string;

    @Field({ nullable: true })
    @IsUrl({}, { message: "Image URL must be a valid URL" })
    imageUrl?: string;

    @Field(() => Float, { nullable: true })
    @IsPositive()
    price?: number;

    @Field({ nullable: true })
    @IsInt()
    @Min(1)
    categoryId?: number;
}


