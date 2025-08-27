import Stripe from 'stripe';
import dotenv from 'dotenv'

 dotenv.config()

 
const stripe = new Stripe(process.env.Stripe_Secret_Key,{
apiVersion : '2024-08-01',
});

export default stripe ;