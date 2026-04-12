import { User } from "../models/user.js";

// add book to favourites
const addToFav = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        if (!bookid || !id) {
            return res.status(400).json({ message: "Error in adding to favourites" });
        }
        const userData = await User.findById(id);
        const isBookFav =  userData.favourites.includes(bookid);
        if (isBookFav) {
            return res.status(200).json({ message: "book already added to favrouites" });
        }
        await User.findByIdAndUpdate(id, { $push:{ favourites: bookid }});
         return res.status(200).json({ message: "book added to favrouites" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const removeFromFav = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        if (!bookid || !id) {
            return res.status(400).json({ message: "Error in removing to favourites" });
        }
        const userData = await User.findById(id);
        const isBookFav = await userData.favourites.includes(bookid);
        if (isBookFav) {
            await User.findByIdAndUpdate(id, { $pull:{ favourites: bookid }});
        }
        return res.status(200).json({ message: "book removed from favrouites" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const getFav = async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "Error in getting favourites" });
        }
        const userData = await User.findById(id).populate('favourites');
        const favBooks = userData.favourites;
        
        return res.status(200).json({ status:"success",data:favBooks });
    } catch (error) {
        console.error("getFav error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export {addToFav,removeFromFav,getFav}