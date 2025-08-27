import express from "express";
import stripe from "../utlis/Stripe_Client.mjs";



const router = express.Router();

router.post('/create-checkout-session',async (req,res)=>{
try{
 const {allproduct} = req.body

if(!allproduct?.name  || !allproduct?.price){
return res.status(400).send({message: "invalid product data  "});
}

 const session = await stripe.checkout.sessions.create({
   payment_method_types : ["card"],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: allproduct.name,
            description:allproduct.description,
          },

          unit_amount:allproduct.price*100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'process.env.Client_Url /success',
    cancel_url: 'process.envClient_Url /cancel',
  });


 res.send({ url:session.url});

}catch(error){
res.status(500).send({
message:"Stripe checkout session failed",
error: error.message,})
}
});


export default router;