"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductInput = exports.ProductInput = exports.Product = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("./Category");
const class_validator_1 = require("class-validator");
let Product = class Product extends typeorm_1.BaseEntity {
};
exports.Product = Product;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Title is required" }),
    (0, class_validator_1.Length)(3, 255, { message: "Title must be between 3 and 255 characters" }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Slug is required" }),
    (0, class_validator_1.Length)(3, 255, { message: "Slug must be between 3 and 255 characters" }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Description is required" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsUrl)({}, { message: "Image URL must be a valid URL" }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Category_1.Category, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, category => category.products, {
        nullable: true,
        onDelete: "SET NULL"
    }),
    (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    (0, typeorm_1.Column)("float"),
    (0, class_validator_1.IsPositive)({ message: "Price must be a positive number" }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
exports.Product = Product = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Product);
let ProductInput = class ProductInput {
};
exports.ProductInput = ProductInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Title is required" }),
    (0, class_validator_1.Length)(3, 255, { message: "Title must be between 3 and 255 characters long" }),
    __metadata("design:type", String)
], ProductInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Slug is required" }),
    (0, class_validator_1.Length)(3, 255, { message: "Slug must be between 3 and 255 characters long" }),
    __metadata("design:type", String)
], ProductInput.prototype, "slug", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Description is required" }),
    __metadata("design:type", String)
], ProductInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Image URL is required" }),
    (0, class_validator_1.IsUrl)({}, { message: "Image URL must be a valid URL" }),
    __metadata("design:type", String)
], ProductInput.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    (0, class_validator_1.IsNotEmpty)({ message: "Price is required" }),
    (0, class_validator_1.IsPositive)({ message: "Price must be a positive number" }),
    __metadata("design:type", Number)
], ProductInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsInt)({ message: "Category ID must be an integer" }),
    (0, class_validator_1.Min)(1, { message: "Category ID must be greater than 0" }),
    __metadata("design:type", Number)
], ProductInput.prototype, "categoryId", void 0);
exports.ProductInput = ProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProductInput);
let UpdateProductInput = class UpdateProductInput {
};
exports.UpdateProductInput = UpdateProductInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 255),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 255),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "slug", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsUrl)({}, { message: "Image URL must be a valid URL" }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "categoryId", void 0);
exports.UpdateProductInput = UpdateProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateProductInput);
//# sourceMappingURL=Product.js.map