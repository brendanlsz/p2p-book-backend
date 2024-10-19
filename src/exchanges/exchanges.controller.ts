import { Body, Controller, Post, Patch, Param, Get, Req } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { BorrowRequestDto } from './dto/borrow-request.dto';
import { Exchange } from './entities/exchange.entity';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post('/borrow')
  async createBorrowRequest(@Body() borrowRequestDto: BorrowRequestDto, @Req() req): Promise<Exchange> {
    const userId = req.user;
    return this.exchangesService.createBorrowRequest(borrowRequestDto, userId);
  }

  @Patch('/:id/accept')
  async acceptRequest(@Param('id') exchangeId: number): Promise<Exchange> {
    return this.exchangesService.acceptRequest(exchangeId);
  }

  @Patch('/:id/reject')
  async rejectRequest(@Param('id') exchangeId: number): Promise<Exchange> {
    return this.exchangesService.rejectRequest(exchangeId);
  }

  @Patch('/:id/return')
  async returnBook(@Param('id') exchangeId: number): Promise<Exchange> {
    return this.exchangesService.returnBook(exchangeId);
  }

  @Get('/my-requests')
  async getUserBorrowingRequests(@Req() req): Promise<Exchange[]> {
    const userId = req.user;
    return this.exchangesService.getUserBorrowingRequests(userId);
  }
}
