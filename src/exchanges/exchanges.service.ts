import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { BorrowRequestDto } from './dto/borrow-request.dto';
import { BooksService } from '../books/books.service'; // Import your BookService
import { Exchange } from './entities/exchange.entity'; // Your Exchange entity

@Injectable()
export class ExchangesService {
  private exchanges: Exchange[] = []; // In-memory storage for exchanges
  private nextId = 1; // To generate unique IDs for exchanges

  constructor(private readonly bookService: BooksService) {}

  async createBorrowRequest(borrowRequestDto: BorrowRequestDto, requesterId: string): Promise<Exchange> {
    // Validate if the book exists
    const book = await this.bookService.findOne(borrowRequestDto.bookId);

    // Check if the book exists and if the requester is not the owner
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    
    if (book.ownerId === requesterId) {
      throw new BadGatewayException('You cannot borrow your own book');
    }

    if (book.status !== 'available') {
      throw new NotFoundException('Book is not available for borrowing');
    }

    const exchange: Exchange = {
      id: this.nextId.toString(), // Generate a unique ID
      bookId: borrowRequestDto.bookId,
      bookOwnerId: book.ownerId, // Get the owner's ID from the book
      requesterId: requesterId,
      status: 'Pending',
    };

    this.nextId++; // Increment the ID for the next exchange request

    this.exchanges.push(exchange); // Save the exchange to in-memory storage

    // Optionally update the book's status to indicate it's requested
    await this.bookService.update(borrowRequestDto.bookId, { status: 'Requested' });

    return exchange;
  }

  async acceptRequest(exchangeId: number): Promise<Exchange> {
    const exchange = this.exchanges.find((ex) => ex.id === exchangeId.toString());

    if (!exchange) {
      throw new NotFoundException('Request not found');
    }

    exchange.status = 'Accepted';
    return exchange;
  }

  async rejectRequest(exchangeId: number): Promise<Exchange> {
    const exchange = this.exchanges.find((ex) => ex.id === exchangeId.toString());

    if (!exchange) {
      throw new NotFoundException('Request not found');
    }

    exchange.status = 'Rejected';
    return exchange;
  }

  async returnBook(exchangeId: number): Promise<Exchange> {
    const exchange = this.exchanges.find((ex) => ex.id === exchangeId.toString());

    if (!exchange) {
      throw new NotFoundException('Request not found');
    }

    exchange.status = 'Returned'; // Update status to Returned

    // Optionally update the book's status back to available
    await this.bookService.update(exchange.bookId, { status: 'Available' });

    return exchange;
  }

  async getUserBorrowingRequests(userId: string): Promise<Exchange[]> {
    return this.exchanges.filter((ex) => ex.requesterId === userId);
  }
}
