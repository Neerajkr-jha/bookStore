import express from 'express'
import { getUser, login, signup, updateAddress } from '../controllers/user.js';
import authenticateToken from '../auth/userAuth.js';

const userRouter=express.Router();

userRouter.post("/sign-up",signup);
userRouter.post("/sign-in",login);
userRouter.get("/user-info",authenticateToken,getUser);
userRouter.put("/update-address",authenticateToken,updateAddress);

export default userRouter;