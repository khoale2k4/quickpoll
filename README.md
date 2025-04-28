# Backend Poll Application

This repository contains the backend implementation of a polling application built using Express.js. It handles poll creation, voting, and retrieval of poll results. The backend is designed to be connected with a frontend that can interact with these endpoints.

## Setup Instructions

Follow these steps to get the backend up and running on your local machine:

### Prerequisites

Node.js (>= 14.x)

npm or yarn (preferably npm)

### Steps

```
    git clone https://github.com/khoale2k4/quickpoll.git

    git checkout backend

    npm install

    npm run start
```
   
### API Endpoints

Here are the available API endpoints that the backend exposes:

GET /polls

Description: Fetch all polls.

Response: A list of all polls stored in the system.

POST /polls

Description: Create a new poll with a title and options.

Request Body:
```
{
  "title": "What is your favorite color?",
  "options": ["Red", "Blue", "Green"]
}
```

Response: The created poll object, with a unique id and the list of options.

POST /polls/:id/vote

Description: Submit a vote for an option in a poll.

Request Body:
```
{
  "optionId": "option-id-123"
}
```

Response: A success message confirming the vote has been recorded.

GET /polls/:id

Description: Fetch a poll by its ID, including vote counts for each option.

Response: The poll details, including total votes and options.

## How AI Tools Were Used

In this project, Cursor.so were utilized to speed up development and improve code quality:

Assisted in scaffolding the backend API routes. It generated the logic for creating polls, submitting votes, and retrieving poll results.

AI also recommended the best practices for handling in-memory data storage and efficient poll management.

Used to help refactor unclear or inefficient parts of the code to improve scalability and performance.

AI helped generate unit tests for the backend API endpoints. These tests ensure that all functions are working correctly and that API responses conform to the expected structure.


### What You Would Add Next If You Had More Time
If I had more time, I would enhance the backend in the following ways:

Database Integration:

Replace the in-memory data store with a proper database (e.g., MongoDB, PostgreSQL) to persist poll data and votes across server restarts.

Authentication and Authorization:

Add user authentication to ensure only authorized users can create polls or vote on existing polls. This could involve implementing JWT tokens or OAuth for secure access.

Poll Expiry and Cleanup:

Implement a feature to expire polls after a certain period and automatically clean up old polls and vote data from the system.

Rate Limiting:

Introduce rate limiting to prevent abuse of the API, especially for voting endpoints. This would prevent users from casting multiple votes for the same poll in a short period.

Error Handling and Validation:

Improve error handling with more granular responses and input validation. This would ensure the API is more robust and easier to debug.