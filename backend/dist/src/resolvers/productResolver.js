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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Product_js_1 = require("../entities/Product.js");
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
let ProductResolver = class ProductResolver {
    products() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
            return productRepository.find({ relations: ["category"] });
        });
    }
    productBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
            return productRepository.findOne({
                where: { slug },
                relations: ["category"],
            });
        });
    }
    createProduct(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            const category = yield categoryRepository.findOne({
                where: { id: input.categoryId },
            });
            if (!category) {
                throw new Error("Category not found");
            }
            const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
            const product = productRepository.create(Object.assign(Object.assign({}, input), { category }));
            yield productRepository.save(product);
            return product;
        });
    }
    updateProduct(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
            let product = yield productRepository.findOne({
                where: { id },
                relations: ["category"],
            });
            if (!product) {
                throw new Error("Product not found");
            }
            if (input.categoryId !== undefined) {
                const category = yield categoryRepository.findOne({
                    where: { id: input.categoryId },
                });
                if (!category) {
                    throw new Error("Category not found");
                }
                product.category = category;
            }
            const { categoryId } = input, updateInput = __rest(input, ["categoryId"]);
            product = productRepository.merge(product, updateInput);
            yield productRepository.save(product);
            return product;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = (0, typeorm_1.getRepository)(Product_js_1.Product);
            const product = yield productRepository.findOne({ where: { id } });
            if (!product) {
                throw new Error("Product not found");
            }
            yield productRepository.remove(product);
            return true;
        });
    }
};
exports.ProductResolver = ProductResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Product_js_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    (0, type_graphql_1.Query)(() => Product_js_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productBySlug", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_js_1.Product),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product_js_1.ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_js_1.Product),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Product_js_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
//# sourceMappingURL=productResolver.js.map