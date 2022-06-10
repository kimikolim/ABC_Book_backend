
import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { IBook } from '../models/bookModel';
import { BookService } from '../services/bookService';


@JsonController('/books')
// all the validations
// mapping of request to service 
// mapping of service result to API response
export class BookController {
    private bookService = new BookService()
  @Get()
  getAll() {
    const result = this.bookService.getAllBooks()
    
    return result
  }

  @Get('/:id')
  getBookById(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('')
  createBook(@Body() book: IBook) {
    // console.log(book)
    const result = this.bookService.createBook(book)
     
    return result
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