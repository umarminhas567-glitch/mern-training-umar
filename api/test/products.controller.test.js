beforeEach(() => {
  jest.clearAllMocks();
});
jest.mock('../db');
const db = require('../db');
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = require('../server');

const SECRET = process.env.JWT_SECRET || 'mysecretkey123';
const makeToken = (role) => jwt.sign({ id: 1, email: 'test@test.com', role }, SECRET, { expiresIn: '1h' });

const validPayload = { name: 'New Item', price: 10, category: 'Electronics', in_stock: true };
const invalidPayload = { name: 'A', price: -1, category: 'NotACategory' };

describe('GET /api/products', () => {
  it('without a token -> 401', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(401);
  });

  it('with a valid user token -> 200', async () => {
    db.query.mockResolvedValueOnce([[{ id: 1, name: 'Widget' }]]);
    const res = await request(app).get('/api/products').set('Authorization', `Bearer ${makeToken('user')}`);
    expect(res.status).toBe(200);
  });
});

describe('POST /api/products', () => {
  it('with a user token (not manager/admin) -> 403', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${makeToken('user')}`)
      .send(validPayload);
    expect(res.status).toBe(403);
  });

  it('with a manager token and a valid payload -> 201', async () => {
    db.query.mockResolvedValueOnce([{ insertId: 5 }]);
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${makeToken('manager')}`)
      .send(validPayload);
    expect(res.status).toBe(201);
  });

  it('with a manager token and an invalid payload -> 422', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${makeToken('manager')}`)
      .send(invalidPayload);
    expect(res.status).toBe(422);
    expect(db.query).not.toHaveBeenCalled();
  });
});