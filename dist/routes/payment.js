"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paymentController_1 = require("../controllers/paymentController");
const express_1 = require("express");
const router = express_1.Router();
router.post('/checkout', paymentController_1.checkout);
exports.default = router;
//# sourceMappingURL=payment.js.map