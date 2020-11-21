"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const fieldValidator_1 = __importDefault(require("../libs/fieldValidator"));
const express_validator_1 = require("express-validator");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.post("/signup", [
    express_validator_1.check("name", "Name is required").notEmpty(),
    express_validator_1.check("email", "Email is required").isEmail(),
    express_validator_1.check("password", "Password must have at least 6 characters").isLength({
        min: 6,
    }),
    fieldValidator_1.default,
], authController_1.signup);
router.post("/signin", [
    express_validator_1.check("email", "Email is required").isEmail(),
    express_validator_1.check("password", "Password must have at least 6 characters").notEmpty(),
    fieldValidator_1.default,
], authController_1.signin);
router.get("/profile", verifyToken_1.TokenValidator, authController_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map