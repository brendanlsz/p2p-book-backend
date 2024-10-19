import { Injectable, NotFoundException } from '@nestjs/common';
import { BorrowRequestDto } from './dto/borrow-request.dto';
import { BooksService } from '../books/books.service'; // Import your BookService
import { Exchange } from './entities/exchange.entity'; // Your Exchange entity

@Injectable()
export class ExchangesService {
  private exchanges: Exchange[] = []; // In-memory storage for exchanges
  private nextId = 1; // To generate unique IDs for exchanges

  constructor(private readonly bookService: BooksService) {}

  async createBorrowRequest(borrowRequestDto: BorrowRequestDto, userId: number): Promise<Exchange> {
    // Validate book ownership
    const userBook = await this.bookService.findById(borrowRequestDto.bookId, userId);

    if (!userBook) {
      throw new NotFoundException('Book not found or not owned by user');
    }

    const exchange: Exchange = {
      id: this.nextId++, // Generate a unique ID
      bookId: borrowRequestDto.bookId,
      borrowerId: userId,
      status: 'Pending',
    };

    this.exchanges.push(exchange); // Save the exchange to in-memory storage
    return exchange;
  }

  async acceptRequest(exchangeId: number): Promise<Exchange> {
    const exchange = this.exchanges.find((ex) => ex.id === exchangeId);

    if (!exchange) {
      throw new NotFoundException('Request not found');
    }

    exchange.status = 'Accepted';
    return exchange;
  }

  async rejectRequest(exchangeId: number): Promise<Exchange> {
    const exchange = this.exchanges.find((ex) => ex.id === exchangeId);

    if (!exchange) {
      throw new NotFoundException('Request not found');
    }

    exchange.status = 'Rejected';
    return exchange;
  }

  async returnBook(exchangeId: number): Promise<Exchange> {
    const exchange = this.exchanges.find((ex) => ex.id === exchangeId);

    if (!exchange) {
      throw new NotFoundException('Request not found');
    }

    exchange.status = 'Returned'; // Update status to Returned
    return exchange;
  }

  async getUserBorrowingRequests(userId: number): Promise<Exchange[]> {
    return this.exchanges.filter((ex) => ex.borrowerId === userId);
  }
}
