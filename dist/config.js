"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//this tow lines execute de .env file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    jwtSecret: process.env.SECRET_KEY || "tokenTest",
    //`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.yknr9.mongodb.net/${config.MONGO_DATABASE}`
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    DB: {
        URI: process.env.DB_CONNECTION || "connection",
    },
};
//# sourceMappingURL=config.js.map