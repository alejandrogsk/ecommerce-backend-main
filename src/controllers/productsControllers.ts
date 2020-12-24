import { RequestHandler } from "express";
import Product, { IProduct } from "../models/Products";

import cloudinary from "../libs/cloudinary";
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
			const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
				req.file.path
			);
			product.img = secure_url;
			product.cloudinary_id = public_id;
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

		const product = await Product.findById(id);

		if (!product) {
			return res.status(400).json({
				ok: false,
				msg: "The ID doesn't exist",
			});
		}

		if (req.file) {
			await cloudinary.v2.uploader.destroy(product.cloudinary_id);
			const resp = await cloudinary.v2.uploader.upload(req.file.path);

			const data = {
				title: req.body.title || product.title,
				category: req.body.category || product.category,
				description: req.body.description || product.description,
				price: req.body.price || product.price,
				img: resp.secure_url || product.img,
				cloudinary_id: resp.public_id || product.cloudinary_id,
			};

			const productUpdated = await Product.findByIdAndUpdate(id, data, {
				new: true,
			});

			return res.status(200).json({ ok: true, productUpdated });
		}

		const productUpdated = await Product.findByIdAndUpdate(id, body, {
			new: true,
		});

		return res.status(200).json({ ok: true, productUpdated });
	} catch (err) {
		console.error(err);
		res.json(err);
	}
};

/**
 * GET ALL PRODUCTS
 */
export const getProducts: RequestHandler = async (req, res) => {
	try {
		const products = await Product.find();
		return res.status(200).json(products);
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

		return res.status(200).json(productFound);
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
		//find user
		const productFound = await Product.findById(req.params.id);
		//delete image from cloudinary
		if (productFound?.img) {
			await cloudinary.v2.uploader.destroy(productFound.cloudinary_id);
		}

		//delete user form db
		await productFound?.remove();

		return res.json(productFound);
	} catch (err) {
		console.error(err);
	}
};

/**
 * GET BY CATEGORY
 */

export const getCategory: RequestHandler = async (req, res) => {
	try {
		let categoryByRequest = req.params;

		Product.find(categoryByRequest, (err, productCategory) => {
			if (err) return res.status(404).json(err);
			if (productCategory.length < 1)
				return res.status(404).json({ msg: "no hay productos" });

			return res.status(200).json(productCategory);
		});
	} catch (err) {
		console.log(err);
		res.status(404).json(err);
	}
};
