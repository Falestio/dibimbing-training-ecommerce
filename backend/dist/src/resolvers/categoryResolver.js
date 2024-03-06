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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Category_1 = require("../entities/Category");
const typeorm_1 = require("typeorm");
let CategoryResolver = class CategoryResolver {
    categories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            return categoryRepository.find({ relations: ["products"] });
        });
    }
    category(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield (0, typeorm_1.getRepository)(Category_1.Category).findOne({
                where: { id }
            });
            return category !== null && category !== void 0 ? category : null;
        });
    }
    categoryWithProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield (0, typeorm_1.getRepository)(Category_1.Category).findOne({
                where: { id },
                relations: ["products"]
            });
            return category !== null && category !== void 0 ? category : null;
        });
    }
    createCategory(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            const category = categoryRepository.create(input);
            yield categoryRepository.save(category);
            return category;
        });
    }
    updateCategory(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            let category = yield categoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new Error("Category not found");
            }
            category.title = input.title;
            yield categoryRepository.save(category);
            return category;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            try {
                const result = yield categoryRepository.delete(id);
                if (result.affected === 0) {
                    throw new Error("Category not found");
                }
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
};
exports.CategoryResolver = CategoryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Category_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, type_graphql_1.Query)(() => Category_1.Category, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category", null);
__decorate([
    (0, type_graphql_1.Query)(() => Category_1.Category, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categoryWithProducts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Category_1.UpdateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
exports.CategoryResolver = CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
//# sourceMappingURL=categoryResolver.js.map