// src/books/books.controller.ts
import { Controller, Get, Post, Body, Param, Put, UsePipes, ValidationPipe, BadRequestException, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: Book, @Req() request) {
    const book = plainToClass(CreateBookDto, createBookDto);
    const errors = await validate(book);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed: ' + errors.join('; '));
    }

    // get user email from request
    const user = request.user;
    createBookDto.ownerId = user;
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Body() filter: Partial<Book>) {
    return this.booksService.findAll(filter);
  }

  @Get('/my-books')
  findMyBooks(@Req() request) {
    // get user email from request
    const user = request.user;
    return this.booksService.findMyBooks(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: any) {
    return this.booksService.update(id, updateBookDto);
  }
}
