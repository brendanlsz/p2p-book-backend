Book Exchange API
Overview
The Book Exchange API is a RESTful API that facilitates the management of a book lending system. Users can list their books, make borrow requests, and manage incoming and outgoing requests. This API is designed to be intuitive, scalable, and secure, utilizing JWT for authentication and authorization.

Key Features
User Authentication: Users can log in and register with email and password, generating a JWT for secure access to API endpoints.
Book Management: Users can create, read, update, and delete book listings.
Borrow Requests: Users can send requests to borrow books and track the status of their requests.
Request Management: Users can view incoming requests for their books and accept or reject them.
Data Persistence: All data is stored in a MongoDB database for reliable persistence.
Error Handling: The API includes comprehensive error handling to ensure a smooth user experience.
Setup Instructions
Prerequisites
Node.js: Make sure you have Node.js (v14 or later) installed on your machine.
MongoDB: You need a running MongoDB instance. You can set up a local instance or use a cloud-based solution like MongoDB Atlas.
Installation
Clone the Repository:

```
git clone https://github.com/brendanlsz/p2p-book-backend
```

Install Dependencies:
```
npm install
```


Set Up Environment Variables: Create a .env file in the root directory and include the following:
```
JWT_SECRET=your_jwt_secret
Replace your_jwt_secret with a secure random string.
```

Run the Server:

```
npm start
The API should now be running on http://localhost:3000.
```

API Endpoints

```
Here are some key API endpoints you can use:

User Authentication

POST /users/login: Log in a user and receive a JWT.
POST /users: Register a new user.


Book Management

POST /books: Create a new book listing.
GET /books: Get a list of all books.


Borrow Requests

POST /exchanges/borrow: Request to borrow a book.
GET /exchanges/my-requests: Get a list of user's borrow requests.
GET /exchanges/incoming-requests: Get a list of incoming borrow requests.


Request Management

PATCH /exchanges/:requestId/accept: Accept a borrow request.
PATCH /exchanges/:requestId/reject: Reject a borrow request.
```

Decisions Worth Noting
JWT for Authentication: We opted for JSON Web Tokens (JWT) for secure authentication and authorization. This decision simplifies session management and enhances security.

RESTful API Design: The API follows RESTful principles, making it easy to understand and use for frontend developers.

Project Plan and Future Milestones
Current Milestones
User Authentication: Complete
Book Management: Complete
Borrow Request System: Complete
Request Management: Complete
Testing and Documentation: Complete
Future Extensions
Notification System: Implement a notification system to inform users about the status of their borrow requests.

Estimated Completion: Q1 2025
Rate Limiting and Throttling: Add rate limiting to prevent abuse of the API.

Estimated Completion: Q2 2025
Search Functionality: Allow users to search for books by title, author, or condition.

Estimated Completion: Q3 2025
User Profile Management: Enable users to manage their profiles, including updating contact information and preferences.

Estimated Completion: Q4 2025
Conclusion
The Book Exchange API aims to simplify the process of borrowing and lending books among users. With a solid foundation in place, we are excited about the future enhancements planned to make the platform even more robust and user-friendly.