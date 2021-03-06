"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidator = (req, res, next) => {
    const token = req.header("x-token");
    if (!token)
        return res.status(401).json("Access denied");
    const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "tokenTest");
    /**
     * for userId to work it was necessary to configure the types.d.ts
     * file and also add it to the end of the tsconfig.json file
     */
    req.userId = payload.id;
    next();
};
//# sourceMappingURL=varifyToken.js.map