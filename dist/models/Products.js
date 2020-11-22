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
    //const host = config.host;
    //const port = config.port;
    //this.img = `${host}:${port}/public/${filename}`; desarrollo?
    //tengo que actualizarlo en heroku
    this.img = `${process.env.HOST}:${process.env.PORT}/public/${filename}`;
};
exports.default = mongoose_1.model("Product", productSchema);
//# sourceMappingURL=Products.js.map