"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
/**
 * Las validaciones que estan comentadas(required: true) debería ponerlas en las ruta de POST solamente
 * de lo contrario me afecta el PUT, podria usar express validator o crar un middleware
 */
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        //required: true,
        trim: true,
    },
    category: {
        type: String,
        //required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        //required: true,
        trim: true,
    },
    img: {
        type: String,
        //required: false,
        trim: true,
    },
    price: {
        type: Number,
    },
}, {
    versionKey: false,
    timestamps: true,
});
productSchema.methods.setImgUrl = function setImgUrl(filename) {
    const host = config_1.default.host;
    const port = config_1.default.port;
    this.img = `${host}:${port}/public/${filename}`;
};
exports.default = mongoose_1.model("Product", productSchema);
//# sourceMappingURL=Products.js.map