import { Book } from '../models/books.js';
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

// add book - admin route

const addBook = async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "ID required" });
        }
        const user = await User.findById(id)

        if (user.role !== "admin") {
            return res.status(400).json({ message: "Admin access required" });
        }

        const { url, title, author, price, desc, language } = req.body;
        const book = await Book.create({ url, title, author, price, desc, language });
        return res.status(200).json({ message: "Book added successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}

// update book

const updateBook = async (req, res) => {
    try {
        const { bookid } = req.headers;
        if (!bookid) {
            return res.status(400).json({ message: "An error ocurred" });
        }
        const { url, title, author, price, desc, language } = req.body;

        await Book.findByIdAndUpdate(bookid, { url, title, author, price, desc, language });

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}

// dalete book

const deleteBook = async (req, res) => {
    try {
        const { bookid } = req.headers;
        if (!bookid) {
            return res.status(400).json({ message: "An error ocurred" });
        }

        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}

//get all books

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 })
        return res.status(200).json({ status: "success", data: books })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}

//get recent 4 books

const getRecentBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(5)
        return res.status(200).json({ status: "success", data: books })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}

//get book by id
const getBookById = async (req, res) => {
    try {
        const {id} =req.params
        const book = await Book.findById(id)
        return res.status(200).json({ status: "success", data:book })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export { addBook, updateBook, deleteBook, getAllBooks, getRecentBooks,getBookById }