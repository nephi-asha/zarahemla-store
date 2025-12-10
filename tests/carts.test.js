const request = require('supertest');
const express = require('express');
const cartsRouter = require('../routes/carts');
const app = express();

jest.mock('../controllers/carts', () => ({
    getUserCarts: (req, res) => res.status(200).json([{ id: 1, userId: 'user1' }]),
    getCartById: (req, res) => res.status(200).json({ id: req.params.cartId }),
    createCart: (req, res) => res.status(201).json({ id: 1, ...req.body }),
    updateCart: (req, res) => res.status(204).send(),
    deleteCart: (req, res) => res.status(200).send()
}));
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next()
}));
jest.mock('../middleware/validate', () => ({
    cartRules: () => [],
    validate: (req, res, next) => next()
}));

app.use('/carts', cartsRouter);

describe('Carts Routes', () => {
    test('GET /carts should return user carts', async () => {
        const res = await request(app).get('/carts');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, userId: 'user1' }]);
    });

    test('GET /carts/:cartId should return a specific cart', async () => {
        const res = await request(app).get('/carts/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: '1' });
    });

    test('GET /carts should return json', async () => {
        const res = await request(app).get('/carts');
        expect(res.header['content-type']).toMatch(/json/);
    });

    test('GET /carts/:cartId should return json', async () => {
        const res = await request(app).get('/carts/1');
        expect(res.header['content-type']).toMatch(/json/);
    });
});
