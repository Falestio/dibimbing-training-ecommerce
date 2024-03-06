import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Product } from "./Product";
import { IsNotEmpty, Length } from "class-validator";

@ObjectType()
@Entity()
export class Category extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    @IsNotEmpty({ message: "Title is required" })
    @Length(3, 255, { message: "Title must be between 3 and 255 characters" })
    title: string;

    @Field(() => [Product], { nullable: true })
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}

@InputType()
export class CategoryInput {
    @Field()
    @IsNotEmpty()
    @Length(3, 255)
    title: string;
}

@InputType()
export class UpdateCategoryInput {
    @Field()
    @IsNotEmpty({ message: "Title is required" })
    @Length(3, 255, { message: "Title must be between 3 and 255 characters long" })
    title: string;
}