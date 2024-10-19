import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowRequestDto {
  @IsNotEmpty()
  @IsString()
  bookId: string; // ID of the book being borrowed
}
