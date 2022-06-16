import { IBook } from '../models/bookModel'

class Book {
  id: string
  title: string
  description: string
  genre: string
  author: string
  yearPublished: number
  availability: boolean
  borrower?: string
  constructor(book: IBook) {
    this.id = book.id ?? ''
    this.title = book.title
    this.description = book.description
    this.genre = book.genre
    this.author = book.author
    this.yearPublished = book.yearPublished
    this.availability = book.availability
    this.borrower = book.borrower
  }
}
/**
 * Mapping single book response from DB
 */
export class BookResponse {
  message: string
  book: Book
  constructor(message: string, book: IBook) {
    this.message = message
    this.book = new Book(book)
  }
}
/**
 * Mapping list of book response from DB
 */
export class BookListResponse {
  message: string
  books: Book[]
  constructor(message: string, books: IBook[]) {
    this.message = message
    this.books = []
    books.map((book) => this.books.push(new Book(book)))
  }
}
