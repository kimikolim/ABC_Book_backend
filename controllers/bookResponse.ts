import { title } from "process"
import { IBook } from "../models/bookModel"

class Book {
  id: string
  title: string
  description: string
  genre: string
  author: string
  yearPublished: number
  availability: boolean
  borrower: string
  constructor(book: IBook) {
    this.id = book.id ?? ""
    this.title = book.title
    this.description = book.description
    this.genre = book.genre
    this.author = book.author
    this.yearPublished = book.yearPublished
    this.availability = book.availability
    this.borrower = book.borrower
  }
}

export class BookResponse {
    message: string
    book: Book
    constructor(message: string, book: IBook) {
      this.message = message
      this.book = new Book(book)
    }
  }