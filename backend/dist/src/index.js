"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const productResolver_js_1 = require("./resolvers/productResolver.js");
const categoryResolver_js_1 = require("./resolvers/categoryResolver.js");
const cors_1 = __importDefault(require("cors"));
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)();
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [productResolver_js_1.ProductResolver, categoryResolver_js_1.CategoryResolver],
            emitSchemaFile: true,
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema
        });
        yield server.start();
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        server.applyMiddleware({ app });
        const PORT = 4000;
        app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}${server.graphqlPath}`));
    });
}
startApolloServer().catch(error => {
    console.error('Error starting server', error);
});
//# sourceMappingURL=index.js.map