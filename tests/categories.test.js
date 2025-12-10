const request = require('supertest');
const express = require('express');
const categoriesRouter = require('../routes/categories');
const app = express();

jest.mock('../controllers/categories', () => ({
    getAll: (req, res) => res.status(200).json([{ id: 1, name: 'Category 1' }]),
    getSingle: (req, res) => res.status(200).json({ id: req.params.id, name: 'Category 1' }),
    createCategory: (req, res) => res.status(201).json({ id: 1, ...req.body }),
    updateCategory: (req, res) => res.status(204).send(),
    deleteCategory: (req, res) => res.status(200).send()
}));
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next()
}));
jest.mock('../middleware/validate', () => ({
    categoryRules: () => [],
    validate: (req, res, next) => next()
}));

app.use('/categories', categoriesRouter);

describe('Categories Routes', () => {
    test('GET /categories should return all categories', async () => {
        const res = await request(app).get('/categories');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: 'Category 1' }]);
    });

    test('GET /categories/:id should return a specific category', async () => {
        const res = await request(app).get('/categories/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: '1', name: 'Category 1' });
    });

    test('GET /categories should return json', async () => {
        const res = await request(app).get('/categories');
        expect(res.header['content-type']).toMatch(/json/);
    });

    test('GET /categories/:id should return json', async () => {
        const res = await request(app).get('/categories/1');
        expect(res.header['content-type']).toMatch(/json/);
    });
});
