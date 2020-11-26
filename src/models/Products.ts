import { Schema, model, Document } from "mongoose";
import config from "../config";

export interface IProduct extends Document {
	title: string; //lowercase because is typescript not mongoose
	category: string;
	description: string;
	img: string;
	cloudinary_id: string;
	price: number;
}
/**
 * Las validaciones que estan comentadas(required: true) debería ponerlas en las ruta de POST solamente
 * de lo contrario me afecta el PUT, podria usar express validator o crar un middleware
 */
const productSchema = new Schema(
	{
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
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model<IProduct>("Product", productSchema);
