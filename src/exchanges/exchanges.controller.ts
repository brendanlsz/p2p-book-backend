import { Controller, Post, Body, Param, Put, Get, UseGuards, Request } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { BorrowRequestDto } from './dto/borrow-request.dto';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  async createBorrowRequest(@Body() borrowRequestDto: BorrowRequestDto, @Request() req) {
    const userId = req.user.id; // Get user ID from the JWT payload
    return this.exchangesService.createBorrowRequest(borrowRequestDto, userId);
  }

  @Put(':id/accept')
  async acceptRequest(@Param('id') id: string) {
    return this.exchangesService.acceptRequest(+id);
  }

  @Put(':id/reject')
  async rejectRequest(@Param('id') id: string) {
    return this.exchangesService.rejectRequest(+id);
  }

  @Put(':id/return') // New route for returning a book
  async returnBook(@Param('id') id: string) {
    return this.exchangesService.returnBook(+id);
  }

  @Get('borrower')
  async getUserBorrowingRequests(@Request() req) {
    const userId = req.user.id; // Get user ID from the JWT payload
    return this.exchangesService.getUserBorrowingRequests(userId);
  }
}
