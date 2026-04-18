import { Order } from "../models/order.js";
import { User } from "../models/user.js";

const placeOrder = async (req, res) => {
    try {
        const { id } = req.headers
        const { order } = req.body;
        for (const orderData of order) {
            const newOrder = new Order({ user: id, Book: orderData._id })
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, { $push: { order: orderDataFromDb._id } })
            //removing order from cart
            await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } })
        }
        return res.json({ status: "success", message: "Order placed successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
const orderHistory = async (req, res) => {
    try {
        const { id } = req.headers
        const user=await User.findById(id).populate({path:"order",populate:{path:'Book'}})

        const orderData=user.order.reverse();

        return res.json({ status: "success", data:orderData })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

//admin
const allOrders = async (req, res) => {
    try {
        const userData=await User.find().populate({path:'Book'}).populate({path:'User'}).sort({createdAt:-1})
        return res.json({ status: "success", data:userData })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
const updateStatus = async (req, res) => {
    try {
        const {id}=req.params
        await Order.findById(id,{status:req.body.status});
        return res.json({ status: "success", message:"Status updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export {placeOrder,orderHistory,allOrders,updateStatus}