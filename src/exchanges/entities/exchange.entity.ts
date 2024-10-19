// src/exchange/entities/exchange-request.entity.ts
export class Exchange {
  id: string; // Unique ID for the exchange request
  bookId: string; // ID of the book being requested for exchange
  bookOwnerId: string; // User ID of the book owner
  requesterId: string; // User ID of the requester
  status: string; // Status of the exchange request (e.g. pending, accepted, rejected)
}
