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
exports.UpdateCategoryInput = exports.CategoryInput = exports.Category = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Product_1 = require("./Product");
const class_validator_1 = require("class-validator");
let Category = class Category extends typeorm_1.BaseEntity {
};
exports.Category = Category;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Title is required" }),
    (0, class_validator_1.Length)(3, 255, { message: "Title must be between 3 and 255 characters" }),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Product_1.Product], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Product_1.Product, product => product.category),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
exports.Category = Category = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Category);
let CategoryInput = class CategoryInput {
};
exports.CategoryInput = CategoryInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 255),
    __metadata("design:type", String)
], CategoryInput.prototype, "title", void 0);
exports.CategoryInput = CategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], CategoryInput);
let UpdateCategoryInput = class UpdateCategoryInput {
};
exports.UpdateCategoryInput = UpdateCategoryInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Title is required" }),
    (0, class_validator_1.Length)(3, 255, { message: "Title must be between 3 and 255 characters long" }),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "title", void 0);
exports.UpdateCategoryInput = UpdateCategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateCategoryInput);
//# sourceMappingURL=Category.js.map