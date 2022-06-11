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
} from 'routing-controllers';
import { IBook } from '../models/bookModel';
import { BookService } from '../services/bookService';

@JsonController('/books')

/**
 * All the validations
 * mapping request to service
 * mapping service result to API response
 */

// @Authorized()
export class BookController {
  private bookService = new BookService();
  @Get()
  getAll() {
    const result = this.bookService.getAllBooks();
    return result;
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    const result = this.bookService.getBookById(id);
    return result;
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Post('')
  createBook(@Body() book: IBook) {
    const result = this.bookService.createBook(book);
    return result;
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() book: any) {
    const result = this.bookService.updateBookById(id, book);
    return result;
  }

  @Authorized(['ADMIN', 'EDITOR', 'MEMBER'])
  @Put('/borrow/:id')
  borrowBook(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() book: any,
  ) {
    console.log(user);
    // Userid??
    // const result = this.bookService.updateBookById(id, book);
    // return result;

    return 'OK';
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Delete('/:id')
  removeBook(@Param('id') id: string) {
    const result = this.bookService.deleteBookById(id);
    return result;
  }
}
