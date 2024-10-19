// src/exchanges/exchanges.module.ts
import { Module } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
