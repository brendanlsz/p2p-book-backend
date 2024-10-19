// src/app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { UsersModule } from './users/users.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';


@Module({
  imports: [BooksModule, ExchangesModule, UsersModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('books*')
      .apply(JwtMiddleware)
      .forRoutes('exchanges*'); // Apply to all routes starting with 'books'
  }
}
