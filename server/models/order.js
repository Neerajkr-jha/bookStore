import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "book",
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","Out if delivery","Cancelled","Delivered"]
    }
},{timestamps:true})

export const Order= mongoose.model("Order",orderSchema);