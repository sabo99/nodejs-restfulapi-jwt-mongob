require('dotenv/config');

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    TOKEN_JWT: process.env.TOKEN_JWT,
};
