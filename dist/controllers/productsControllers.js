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
exports.getCategory = exports.deleteProduct = exports.getProduct = exports.getProducts = exports.updateProduct = exports.createProduct = void 0;
const Products_1 = __importDefault(require("../models/Products"));
/**
 * CREATE PRODUCT
 */
exports.createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, description, price } = req.body;
        const productFound = yield Products_1.default.findOne({ title });
        if (productFound) {
            return res.status(301).json({ msg: "This product already exists" });
        }
        //console.log(req.file);
        //const img = req.file.path;
        const product = new Products_1.default({
            title,
            category,
            description,
            price,
        });
        //req.file exists thanks to multer
        if (req.file) {
            const { filename } = req.file;
            product.setImgUrl(filename);
        }
        const savedProduct = yield product.save();
        return res.json({
            menssage: "Photo saved",
            savedProduct,
        });
    }
    catch (err) {
        console.error(err);
    }
});
// =============================
// EDIT PRODUCT
// =============================
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        let body = req.body;
        const product = yield Products_1.default.findById(id).exec();
        if (!product) {
            return res.status(400).json({
                ok: false,
                msg: "The ID doesn't exist",
            });
        }
        //saving data
        product.set(body);
        //Saving image
        //req.file exists thanks to multer
        if (req.file) {
            const { filename } = req.file;
            product.setImgUrl(filename);
        }
        yield product.save();
        return res.json({
            ok: true,
            product,
        });
    }
    catch (err) {
        console.error(err);
    }
});
/**
 * GET ALL PRODUCTS
 */
exports.getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products_1.default.find();
        return res.json(products);
    }
    catch (err) {
        console.error(err);
    }
});
/**
 * GET A SINGLE PRODUCT
 */
exports.getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productFound = yield Products_1.default.findById(req.params.id);
        if (!productFound)
            return res.status(204).json({ msg: "Product not found" });
        return res.json(productFound);
    }
    catch (err) {
        console.error(err);
    }
});
/**
 * DELETE PRODUCT
 */
exports.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productFound = yield Products_1.default.findByIdAndDelete(req.params.id);
        if (!productFound)
            return res.status(204).json({ msg: "Product not found" });
        return res.json(productFound);
    }
    catch (err) {
        console.error(err);
    }
});
/**
 * GET BY CATEGORY
 */
exports.getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryByRequest = req.params;
    Products_1.default.find(categoryByRequest, (err, productCategory) => {
        if (err)
            return res.status(404).json(err);
        if (productCategory.length < 1)
            return res.status(404).json({ msg: "no hay productos" });
        return res.status(200).json({ ok: true, res: productCategory });
    });
});
//# sourceMappingURL=productsControllers.js.map