import express from 'express'
import { addToFav, getFav, removeFromFav } from '../controllers/favourite.js';
import authenticateToken from '../auth/userAuth.js';

const favRouter=express.Router();

favRouter.put("/add-to-fav",authenticateToken,addToFav);
favRouter.put("/remove-from-fav",authenticateToken,removeFromFav);
favRouter.get("/get-fav",authenticateToken,getFav);

export default favRouter;