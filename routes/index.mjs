import express from "express";
import product from './product.mjs'
import payment from './payment.mjs';
const router = express.Router();

router.use('/product', product);
router.use('/payment', payment);





export default router;