import express from "express";
import product from './product.mjs'
import payment from './payment.mjs';
import user from './user.mjs'
const router = express.Router();

router.use('/product', product);
router.use('/payment', payment);
router.use('/user',user);




export default router;