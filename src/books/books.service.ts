// src/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = []; // Temporary in-memory storage

  create(bookData: Book): Book {
    const newBook: Book = {
      id: Date.now().toString(),
      ...bookData,
      status: 'available',  // New books are listed as "available"
      borrowedBy: null,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll(filters: Partial<Book>): Book[] {
    // Filter based on criteria (e.g., title, location)
    return this.books.filter(book => {
      for (let key in filters) {
        if (book[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findOne(id: string): Book {
    return this.books.find(book => book.id === id);
  }

  update(id: string, updateData: Partial<Book>): Book {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updateData };
      return this.books[bookIndex];
    }
    return null;
  }

  findMyBooks(ownerId: string): Book[] {
    return this.books.filter(book => book.ownerId === ownerId);
  }
}
