import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    Book: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","out for delivery","canceled","Delivered"]
    }
},{timestamps:true})

export const Order= mongoose.model("Order",orderSchema);