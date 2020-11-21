import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

import config from "../config";

export const signup = async (req: Request, res: Response) => {
	const { email } = req.body;

	//saving a new user
	const findUser = await User.findOne({ email });

	if (findUser) {
		return res.status(400).json({ ok: false, msg: "User already exist" });
	}

	const user: IUser = new User(req.body);

	//encrypt password before saving it on database
	user.password = await user.encryptPassword(user.password);

	const savedUser = await user.save();

	//token
	const token: string = jwt.sign(
		{ id: savedUser.id },
		config.jwtSecret || "tokenTest"
	);

	return res.status(201).header("x-token", token).json({
		ok: true,
		user,
		token,
	});
};

export const signin = async (req: Request, res: Response) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).json({ msg: "User does not exist" });

	const isMatch = await user.validatePassword(req.body.password);

	//user not found
	if (!isMatch) {
		return res.status(400).json({
			msg: "Email or password are incorrect",
		});
	}

	//Generate Token
	//token
	const token: string = jwt.sign(
		{ id: user.id },
		config.jwtSecret || "tokenTest",
		{ expiresIn: 86400 }
	);

	return res.status(200).header("x-token", token).json({
		ok: true,
		email: user.email,
		password: user.password,
		token,
	});
};

export const profile = async (req: Request, res: Response) => {
	//where does userID come from? verifyToken
	const user = await User.findById(req.userId);
	if (!user) return res.status(400).json({ msg: "User does not exist" });

	return res.json(user);
};
