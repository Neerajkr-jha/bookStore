import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.js';
import authenticateToken from '../auth/userAuth.js';

const cartRouter=express.Router();

cartRouter.put("/add-to-cart",authenticateToken,addToCart);
cartRouter.put("/remove-from-cart/:bookid",authenticateToken,removeFromCart);
cartRouter.get("/get-cart",authenticateToken,getCart);

export default cartRouter