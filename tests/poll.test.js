const request = require('supertest');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const pollRouter = require('../src/routes/polls'); 

describe('Poll API', () => {
  let app;
  let server;
  let io;
  
  beforeAll(() => {
    app = express();
    app.use(express.json());
    io = new Server(http.createServer(app));
    app.use('/polls', pollRouter(io).router);
    server = app.listen(3000, () => console.log('Server running on port 3000'));
  });

  afterAll(() => {
    server.close();
  });

  describe('POST /polls', () => {
    it('should create a poll successfully with title and options', async () => {
      const response = await request(app)
        .post('/polls')
        .send({
          title: 'What is your favorite color?',
          options: ['Red', 'Blue', 'Green']
        });
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Poll created successfully');
      expect(response.body.poll.title).toBe('What is your favorite color?');
      expect(response.body.poll.options).toHaveLength(3);
    });

    it('should return 400 for poll with insufficient options', async () => {
      const response = await request(app)
        .post('/polls')
        .send({
          title: 'What is your favorite color?',
          options: ['Red']
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Poll must have a title and at least 2 options');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/polls')
        .send({
          options: ['Red', 'Blue']
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Poll must have a title and at least 2 options');
    });
  });

  describe('POST /polls/:id/vote', () => {
    let pollId;

    beforeAll(async () => {
      const response = await request(app)
        .post('/polls')
        .send({
          title: 'What is your favorite color?',
          options: ['Red', 'Blue', 'Green']
        });
      pollId = response.body.poll.id;
    });

    it('should vote for an option successfully', async () => {
      const poll = await request(app).get(`/polls/${pollId}`);
      const optionId = poll.body.poll.options[0].id; // Chọn option đầu tiên

      const response = await request(app)
        .post(`/polls/${pollId}/vote`)
        .send({ optionId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Vote recorded successfully');
      expect(response.body.poll.options[0].votes).toBe(1);
    });

    it('should return 400 if optionId is missing', async () => {
      const response = await request(app)
        .post(`/polls/${pollId}/vote`)
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Option ID is required');
    });

    it('should return 404 if poll not found', async () => {
      const response = await request(app)
        .post('/polls/999/vote') // pollId không tồn tại
        .send({ optionId: 'some-option-id' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Poll not found');
    });

    it('should return 404 if option not found', async () => {
      const response = await request(app)
        .post(`/polls/${pollId}/vote`)
        .send({ optionId: 'non-existing-option-id' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Option not found');
    });
  });

  describe('GET /polls/:id', () => {
    let pollId;

    beforeAll(async () => {
      const response = await request(app)
        .post('/polls')
        .send({
          title: 'What is your favorite color?',
          options: ['Red', 'Blue', 'Green']
        });
      pollId = response.body.poll.id;
    });

    it('should fetch poll with correct vote counts', async () => {
      const response = await request(app).get(`/polls/${pollId}`);
      expect(response.status).toBe(200);
      expect(response.body.poll.title).toBe('What is your favorite color?');
      expect(response.body.totalVotes).toBe(0);
    });

    it('should return 404 if poll not found', async () => {
      const response = await request(app).get('/polls/999');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Poll not found');
    });
  });
});
