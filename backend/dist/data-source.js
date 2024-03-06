const { DataSource } = require("typeorm");
const AppDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "Superduper123",
    "database": "dibimbing-training-ecommerce",
    "synchronize": true,
    "logging": false,
    "entities": ["dist/src/entities/**/*.js"],
    "migrations": ["dist/src/migrations/**/*.js"],
    "subscribers": ["dist/src/subscribers/**/*.js"]
});
module.exports = {
    datasource: AppDataSource,
};
//# sourceMappingURL=data-source.js.map