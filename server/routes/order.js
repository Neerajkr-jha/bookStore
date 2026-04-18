import express from "express";
import { allOrders, orderHistory, placeOrder, updateStatus } from "../controllers/order.js";
import authenticateToken from "../auth/userAuth.js";

const orderRouter=express.Router();

orderRouter.post("/place-order",authenticateToken,placeOrder);
orderRouter.get("/get-order-history",authenticateToken,orderHistory);
orderRouter.post("/get-all-orders",authenticateToken,allOrders);
orderRouter.post("/update-status/:id",authenticateToken,updateStatus);

export default orderRouter;