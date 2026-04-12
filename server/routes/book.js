import express from 'express'
import { addBook, deleteBook, getAllBooks, getBookById, getRecentBooks, updateBook } from '../controllers/book.js';
import authenticateToken from '../auth/userAuth.js';

const bookRouter=express.Router();
//admin APIs
bookRouter.post("/add-book",authenticateToken,addBook);
bookRouter.put("/update-book",authenticateToken,updateBook);
bookRouter.delete("/delete-book",authenticateToken,deleteBook);
//public APIs
bookRouter.get("/get-all-books",getAllBooks);
bookRouter.get("/get-recent-books",getRecentBooks);
bookRouter.get("/get-book-by-id/:id",getBookById);

export default bookRouter;