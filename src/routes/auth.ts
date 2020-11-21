import { Router } from "express";
import { signup, signin, profile } from "../controllers/authController";

import fieldValidator from "../libs/fieldValidator";
import { check } from "express-validator";

import { TokenValidator } from "../libs/verifyToken";

const router: Router = Router();

router.post(
	"/signup",
	[
		check("name", "Name is required").notEmpty(),
		check("email", "Email is required").isEmail(),
		check("password", "Password must have at least 6 characters").isLength({
			min: 6,
		}),
		fieldValidator,
	],
	signup
);

router.post(
	"/signin",
	[
		check("email", "Email is required").isEmail(),
		check("password", "Password must have at least 6 characters").notEmpty(),
		fieldValidator,
	],
	signin
);

router.get("/profile", TokenValidator, profile);

export default router;
