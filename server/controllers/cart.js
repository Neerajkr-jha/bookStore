import { User } from '../models/user.js';

const addToCart = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        if (!bookid || !id) {
            return res.status(400).json({ message: "Error in adding to cart" });
        }
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.status(200).json({ message: "book already added to cart" });
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.status(200).json({ message: "book added to cart successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const removeFromCart= async (req,res)=>{
    try {
        const { bookid, id } = req.headers;
        if (!bookid || !id) {
            return res.status(400).json({ message: "Error in removing from cart" });
        }
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            await User.findByIdAndUpdate(id, { $pull:{ cart: bookid }});
        }
        return res.status(200).json({ message: "book removed from cart" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const getCart = async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "Error in getting cart" });
        }
        const userData = await User.findById(id).populate('cart');
        const cart = userData.cart.reverse();
        
        return res.status(200).json({ status:"success",data:cart });
    } catch (error) {
        console.error("getFav error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export {addToCart,removeFromCart,getCart}