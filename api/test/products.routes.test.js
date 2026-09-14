beforeEach(() => {
  jest.clearAllMocks();
});
jest.mock('../db');
const db = require('../db');
const productController = require('../controller/produtController');
const { productValidationRules, validateProduct } = require('../middleware/productValidation');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

async function runValidation(body) {
  const req = { body };
  const res = mockRes();
  const next = jest.fn();
  for (const rule of productValidationRules) {
    await rule.run(req);
  }
  validateProduct(req, res, next);
  return { res, next };
}

describe('getAllProducts', () => {
  it('returns the full list', async () => {
    const fakeProducts = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
    db.query.mockResolvedValueOnce([fakeProducts]);
    const res = mockRes();
    await productController.getAllProducts({}, res);
    expect(res.json).toHaveBeenCalledWith(fakeProducts);
  });
});

describe('getProductById', () => {
  it('returns 404 when no match is found', async () => {
    db.query.mockResolvedValueOnce([[]]);
    const req = { params: { id: '999' } };
    const res = mockRes();
    await productController.getProductById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('validateProduct (Day 9 rules)', () => {
  it('rejects an invalid payload', async () => {
    const { res, next } = await runValidation({ name: 'A', price: -5, category: 'Bogus' });
    expect(res.status).toHaveBeenCalledWith(422);
    expect(next).not.toHaveBeenCalled();
  });

  it('accepts a valid payload', async () => {
    const { res, next } = await runValidation({
      name: 'Nice Product', price: 10, category: 'Electronics', in_stock: true
    });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});