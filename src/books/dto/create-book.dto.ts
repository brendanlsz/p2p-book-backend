import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUrl, MaxLength } from 'class-validator';

// Define the possible statuses for a book
export enum BookStatus {
  AVAILABLE = 'available',
  PENDING_EXCHANGE = 'pending exchange',
  EXCHANGED = 'exchanged',
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // Maximum length for the title
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // Maximum length for the author
  author: string;

  @IsString()
  @IsOptional()
  @MaxLength(500) // Optional short description with a max length
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // Maximum length for the location
  location: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50) // Maximum length for the condition
  condition: string;

  @IsOptional()
  @IsUrl() // Validates that the coverImage is a valid URL if provided
  coverImage?: string;
}
