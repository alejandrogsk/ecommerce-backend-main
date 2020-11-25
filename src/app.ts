import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import produtRoutes from "./routes/products";

const app = express();

//Create the port
app.set("port", process.env.PORT || 4000);

//middlewares
//Is a development aid
app.use(morgan("dev"));
//understand json objects
app.use(express.json());

//understand the fields of a form that come per POST
app.use(express.urlencoded({ extended: false }));

//for img uploads
app.use("/public", express.static(__dirname + "/storage/pimg"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", produtRoutes);

export default app;
