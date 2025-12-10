const request = require('supertest');
const express = require('express');
const usersRouter = require('../routes/users');
const app = express();

jest.mock('../controllers/users', () => ({
    getUser: (req, res) => res.status(200).json({ username: req.params.username }),
    createUser: (req, res) => res.status(201).json({ ...req.body }),
    updateUser: (req, res) => res.status(204).send(),
    deleteUser: (req, res) => res.status(200).send()
}));
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next()
}));
jest.mock('../middleware/validate', () => ({
    userRules: () => [],
    validate: (req, res, next) => next()
}));

app.use('/users', usersRouter);

describe('Users Routes', () => {
    test('GET /users/:username should return a user', async () => {
        const res = await request(app).get('/users/jdoe');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ username: 'jdoe' });
    });

    test('GET /users/:username should return json', async () => {
        const res = await request(app).get('/users/jdoe');
        expect(res.header['content-type']).toMatch(/json/);
    });

    test('GET /users/:username should handle specialized characters', async () => {
        const res = await request(app).get('/users/test-user');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ username: 'test-user' });
    });

    test('GET /users/:username should respond quickly (performance check)', async () => {
        const start = Date.now();
        await request(app).get('/users/jdoe');
        const end = Date.now();
        expect(end - start).toBeLessThan(200);
    });
});
