import { IsNotEmpty, IsInt } from 'class-validator';

export class BorrowRequestDto {
  @IsNotEmpty()
  @IsInt()
  bookId: number; // ID of the book being borrowed
}
