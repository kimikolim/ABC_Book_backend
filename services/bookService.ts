import { ForbiddenError, NotFoundError } from 'routing-controllers';
import { BookListResponse, BookResponse } from '../resources/bookResponse';

import { Book, IBook } from '../models/bookModel';

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
    } = book;
    const newBook = new Book({
      title,
      description,
      genre,
      author,
      yearPublished,
      availability,
      borrower,
    });

    try {
      const response = await newBook.save(); // writes to db
      return new BookResponse('Book successfully created', response);
    } catch (error) {
      throw new ForbiddenError('Book was not created');
    }
  }

  async getAllBooks() {
    try {
      const response = await Book.find();
      return new BookListResponse('Fetched all books', response);
    } catch (error) {
      throw new ForbiddenError('Fetch Failed');
    }
  }

  async getBookById(id: string) {
    try {
      const response = await Book.findById({ _id: id });
      return new BookResponse('something', response!);
    } catch (error) {
      throw new NotFoundError('Book not found');
    }
  }

  async updateBookById(id: string, book: IBook) {
    try {
      const response = await Book.findByIdAndUpdate(id, book);
      return new BookResponse('Book updated', response!);
    } catch (error) {
      throw new Error('Update failed');
    }
  }

  async deleteBookById(id: string) {
    try {
      const response = await Book.findByIdAndDelete(id);
      return new BookResponse('Book deleted', response!);
    } catch (error) {
      throw new Error('Delete failed');
    }
  }
}
