import { ObjectId } from "mongoose"
import { ForbiddenError } from "routing-controllers"
import { BookResponse } from "../controllers/BookResponse"

import { Book, IBook } from "../models/bookModel"

export class BookService {
  async createBook(book: IBook) {
    const {
      title,
      description,
      genre,
      author,
      yearPublished,
      availability,
      borrower,
    } = book
    const newBook = new Book({
      title,
      description,
      genre,
      author,
      yearPublished,
      availability,
      borrower,
    })

    try {
      const response = await newBook.save() // writes to db
    //   console.log(book);
    
      return new BookResponse('Book successfully created', response)
    } catch (error) {
      throw new ForbiddenError("Book was not created")
    }
  }

  async getAllBooks() {
    try {
      const response = await Book.find({})
      return { status: "OK", response: response }
    } catch (error) {
      throw new ForbiddenError("Fetch Failed")
    }
  }

  async getBookById(id: ObjectId) {
    try {
      const response = await Book.findById({ _id: id })
      return { status: "OK", response: response }
    } catch (error) {
      throw new Error("Book not found")
    }
  }

  async updateBook(id: ObjectId, book: IBook) {
    try {
      const response = await Book.findByIdAndUpdate(id, book)
      return { status: "OK", response: response }
    } catch (error) {
      throw new Error("Update failed")
    }
  }

  async deleteBook(id: ObjectId) {
    try {
      const response = await Book.findByIdAndDelete(id)
      return { status: "OK", response: response }
    } catch (error) {
      throw new Error("Delete failed")
    }
  }
}
