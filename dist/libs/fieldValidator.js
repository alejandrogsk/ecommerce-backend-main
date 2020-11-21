"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fieldValidator = (req, res = express_1.response, next) => {
    //errors handler
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    next();
};
exports.default = fieldValidator;
//# sourceMappingURL=fieldValidator.js.map