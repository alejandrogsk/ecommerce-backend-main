import { RequestHandler } from "express";
import Product, { IProduct } from "../models/Products";

/**
 * CREATE PRODUCT
 */
export const createProduct: RequestHandler = async (req, res) => {
	try {
		const { title, category, description, price } = req.body;

		const productFound = await Product.findOne({ title });
		if (productFound) {
			return res.status(301).json({ msg: "This product already exists" });
		}

		//console.log(req.file);
		//const img = req.file.path;

		const product: IProduct = new Product({
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

		const savedProduct = await product.save();

		return res.json({
			menssage: "Photo saved",
			savedProduct,
		});
	} catch (err) {
		console.error(err);
	}
};

// =============================
// EDIT PRODUCT
// =============================
export const updateProduct: RequestHandler = async (req, res) => {
	try {
		let id = req.params.id;
		let body = req.body;

		const product = await Product.findById(id).exec();

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
			//delete previus image

			//
			const { filename } = req.file;
			product.setImgUrl(filename);
		}

		await product.save();

		return res.json({
			ok: true,
			product,
		});
	} catch (err) {
		console.error(err);
	}
};

/**
 * GET ALL PRODUCTS
 */
export const getProducts: RequestHandler = async (req, res) => {
	try {
		const products = await Product.find();
		return res.json(products);
	} catch (err) {
		console.error(err);
	}
};

/**
 * GET A SINGLE PRODUCT
 */
export const getProduct: RequestHandler = async (req, res) => {
	try {
		const productFound = await Product.findById(req.params.id);

		if (!productFound)
			return res.status(204).json({ msg: "Product not found" });

		return res.json(productFound);
	} catch (err) {
		console.error(err);
		res.status(404).json({ msg: "Product not found" });
	}
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct: RequestHandler = async (req, res) => {
	try {
		const productFound = await Product.findByIdAndDelete(req.params.id);

		if (!productFound)
			return res.status(204).json({ msg: "Product not found" });

		return res.json(productFound);
	} catch (err) {
		console.error(err);
	}
};

/**
 * GET BY CATEGORY
 */

export const getCategory: RequestHandler = async (req, res) => {
	let categoryByRequest = req.params;

	Product.find(categoryByRequest, (err, productCategory) => {
		if (err) return res.status(404).json(err);
		if (productCategory.length < 1)
			return res.status(404).json({ msg: "no hay productos" });

		return res.status(200).json({ ok: true, res: productCategory });
	});
};
