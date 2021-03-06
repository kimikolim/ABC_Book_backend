import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  CurrentUser,
  BadRequestError,
} from 'routing-controllers'
import { IBook } from '../models/bookModel'
import { BookService } from '../services/bookService'
const { bookValidator } = require('../resources/bookValidation')

@JsonController('/books')

/**
 * All the validations
 * mapping request to service
 * mapping service result to API response
 */

@Authorized()
export class BookController {
  private bookService = new BookService()
  @Get()
  getAll() {
    const result = this.bookService.getAllBooks()
    return result
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    const result = this.bookService.getBookById(id)
    return result
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Post('')
  async createBook(@Body() book: IBook) {
    // Joi validation of incoming body: IBook
    const validateNewBook = await bookValidator.validate(book)
    if (validateNewBook.error) {
      const message = validateNewBook.error.details[0].message
      throw new BadRequestError(`${message}`)
    }

    const validatedBook = validateNewBook.value

    const result = this.bookService.createBook(validatedBook)
    return result
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Put('/:id')
  async updateBook(@Param('id') id: string, @Body() book: any) {
    // Joi validation of incoming body: IBook
    const validateNewBook = await bookValidator.validate(book)
    if (validateNewBook.error) {
      const message = validateNewBook.error.details[0].message
      throw new BadRequestError(`${message}`)
    }

    const validatedBook = validateNewBook.value
    const result = this.bookService.updateBookById(id, validatedBook)
    return result
  }

  @Authorized(['ADMIN', 'EDITOR', 'MEMBER'])
  @Put('/borrow/:id')
  borrowBook(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    // Borrow Book Logic
    const result = this.bookService.setBorrowerById(id, user.id)
    return result
  }

  @Authorized(['ADMIN', 'EDITOR', 'MEMBER'])
  @Put('/return/:id')
  returnBook(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    // Borrow Book Logic
    const result = this.bookService.setBookReturnById(id)
    return result
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Delete('/:id')
  removeBook(@Param('id') id: string) {
    const result = this.bookService.deleteBookById(id)
    return result
  }
}
