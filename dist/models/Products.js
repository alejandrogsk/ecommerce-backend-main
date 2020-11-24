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
    this.img = `https://ecommerce-restapi.herokuapp.com/public/${filename}`;
    /*
    Para borrar las imagenes del file sistem debería usar algo así
    let str = "https://ecommerce-restapi.herokuapp.com/public/image-1606088038950.jpg";
    let res = str.slice(47);
      
      */
};
exports.default = mongoose_1.model("Product", productSchema);
//# sourceMappingURL=Products.js.map