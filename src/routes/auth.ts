import { Router } from "express";
import { signup, signin, profile } from "../controllers/authController";


import { TokenValidator } from "../libs/verifyToken";

const router: Router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/profile", TokenValidator, profile);

export default router;