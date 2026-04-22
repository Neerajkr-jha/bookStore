import express from 'express'
import 'dotenv/config'
import './db/connection.js'
import cors from 'cors'
import userRouter from './routes/user.js';
import bookRouter from './routes/book.js';
import favRouter from './routes/favourite.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';


const app=express();
const PORT=process.env.PORT || 8080;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Bookify API is running",
  });
});

app.use("/api/users",userRouter);
app.use("/api/books",bookRouter);
app.use("/api/favourite",favRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})