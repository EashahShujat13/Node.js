import mongoose from "mongoose"
import { Schema } from "mongoose"


const orderSchema = new Schema({

    order_id:{
        type: String,
        required: true,
    },
     quantity:{
        type: Number,
        required: true,
        default: 1,
    },
    user_id:{
        type: String,
        required: true,
    }
})

const Order = mongoose.model("order", orderSchema)
export default Order