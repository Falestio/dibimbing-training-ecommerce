import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { ProductResolver } from './resolvers/productResolver.js';
import { CategoryResolver } from "./resolvers/categoryResolver.js";
import cors from 'cors';

async function startApolloServer() {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [ProductResolver, CategoryResolver],
        emitSchemaFile: true,
    });

    const server = new ApolloServer({
        schema
    });

    await server.start();

    const app = express();

    app.use(cors());

    server.applyMiddleware({ app });

    const PORT = 4000;
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}${server.graphqlPath}`));
}

startApolloServer().catch(error => {
    console.error('Error starting server', error);
});
