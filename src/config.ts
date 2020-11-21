//this tow lines execute de .env file
import dotenv from "dotenv";
dotenv.config();

export default {
	jwtSecret: process.env.SECRET_KEY || "tokenTest",
	//`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.yknr9.mongodb.net/${config.MONGO_DATABASE}`
	host: process.env.APP_HOST,
	port: process.env.APP_PORT,
	DB: {
		URI: process.env.DB_CONNECTION || "connection",
	},
};
