# Node.js Server Project

A simple Node.js server built with Express.js.

## Features

- RESTful API endpoints
- Environment variable configuration
- Express middleware setup
- Basic error handling
- Polling system (create polls, vote, and view results)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```
   PORT=3000
   NODE_ENV=development
   ```

### Running the Server

Development mode with auto-restart:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Items API
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

### Polling API
- `GET /polls` - Get all polls
- `GET /polls/:id` - Get a specific poll with vote counts
- `POST /polls` - Create a new poll with title and options
- `POST /polls/:id/vote` - Submit a vote for a poll option

#### Creating a Poll
```
POST /polls
Content-Type: application/json

{
  "title": "Poll title",
  "options": ["Option 1", "Option 2", "Option 3"]
}
```

#### Voting on a Poll
```
POST /polls/:id/vote
Content-Type: application/json

{
  "optionId": "option-id-from-poll"
}
```

## Project Structure

```
nodejs-server/
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
├── examples.http          # Example API requests
└── src/                   # Source code
    ├── server.js          # Main server file
    ├── routes/            # Route definitions
    │   ├── api.js         # API routes
    │   └── polls.js       # Poll routes
    ├── controllers/       # Route controllers (empty)
    ├── models/            # Data models (empty)
    └── middleware/        # Middleware functions
        └── logger.js      # Example logging middleware
``` 