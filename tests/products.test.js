const request = require('supertest');
const express = require('express');
const productsRouter = require('../routes/products');
const app = express();

jest.mock('../controllers/products', () => ({
    getAllProducts: (req, res) => res.status(200).json([{ id: 1, name: 'Product 1' }]),
    getProductById: (req, res) => res.status(200).json({ id: req.params.id, name: 'Product 1' }),
    createProduct: (req, res) => res.status(201).json({ id: 1, ...req.body }),
    updateProduct: (req, res) => res.status(204).send(),
    deleteProduct: (req, res) => res.status(200).send()
}));
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next()
}));
jest.mock('../middleware/validate', () => ({
    productRules: () => [],
    validate: (req, res, next) => next()
}));

app.use('/products', productsRouter);

describe('Products Routes', () => {
    test('GET /products should return all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: 'Product 1' }]);
    });

    test('GET /products/:id should return a specific product', async () => {
        const res = await request(app).get('/products/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: '1', name: 'Product 1' });
    });

    test('GET /products should return json', async () => {
        const res = await request(app).get('/products');
        expect(res.header['content-type']).toMatch(/json/);
    });

    test('GET /products/:id should return json', async () => {
        const res = await request(app).get('/products/1');
        expect(res.header['content-type']).toMatch(/json/);
    });
});
