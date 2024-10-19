// src/books/entities/book.entity.ts
export class Book {
  id: string; // Unique identifier for the book
  title: string; // Book title
  author: string; // Author name
  description: string; // Short description
  location: string; // Book's physical location (where it's available)
  condition: string; // Condition of the book (e.g. Good, Excellent)
  coverImage?: string; // Optional cover image URL
  ownerId: string; // User ID of the current owner
  status: string; // Status of the book (e.g. available, pending exchange, exchanged)
  borrowedBy?: string; // User ID of the borrower (if borrowed)
}
