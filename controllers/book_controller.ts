
import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { BookService } from '../service/book_service';

@JsonController('/books')

// all the validations
// mapping of request to service 
// mapping of service result to API response
export class BookController {
  @Get()
  getAll() {
    return 'This action returns all users';
  }

  @Get('/:id')
  getBookById(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('')
  createBook(@Body() book: any) {
      // bookService.createBook(book.name, book.author)
    return 'Saving user...';
  }

  @Put('/:id')
  updateBook(@Param('id') id: number, @Body() book: any) {

    return 'Updating a user...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }
}