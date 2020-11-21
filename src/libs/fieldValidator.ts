import { RequestHandler, response } from "express";
import { validationResult } from "express-validator";

const fieldValidator: RequestHandler = (req, res = response, next) => {
	//errors handler
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped(),
		});
	}

	next();
};

export default fieldValidator;
