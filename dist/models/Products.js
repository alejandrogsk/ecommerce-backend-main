"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Las validaciones que estan comentadas(required: true) debería ponerlas en las ruta de POST solamente
 * de lo contrario me afecta el PUT, podria usar express validator o crar un middleware
 */
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
    },
    img: {
        type: String,
        trim: true,
    },
    cloudinary_id: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = mongoose_1.model("Product", productSchema);
//# sourceMappingURL=Products.js.map