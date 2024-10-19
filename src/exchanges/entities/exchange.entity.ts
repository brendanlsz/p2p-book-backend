// src/exchange/entities/exchange-request.entity.ts
export class Exchange {
  id: string; // Unique ID for the exchange request
  bookId: string; // ID of the book being requested for exchange
  requesterId: string; // ID of the user requesting the exchange
  message: string; // Optional message from the requester
  status: string; // Status of the exchange (e.g., pending, accepted, rejected)
}
