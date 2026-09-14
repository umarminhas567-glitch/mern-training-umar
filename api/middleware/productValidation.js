const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('name')
  .exists().withMessage('name is required')
  .isString().withMessage('name must be a string')
  .isLength({ min: 2, max: 150 }).withMessage('name must be between 2 and 150 characters'),

  body('price')
  .exists().withMessage('price is required')
  .isFloat({ gt: 0 }).withMessage('price must be a number greater than 0'),

  body('category')
  .exists().withMessage('category is required')
  .isIn(['Electronics', 'Apparel', 'Home', 'Sports', 'Other'])
  .withMessage('category must be one of Electronics, Apparel, Home, Sports, Other'),

  body('in_stock')
  .optional().isBoolean().withMessage('inStock must be a boolean')
];

const validateProduct = (req, res, next) => {
  const allowedFields = ['name', 'price', 'category', 'in_stock'];
  const extraFields = Object.keys(req.body)
  .filter(key => !allowedFields.includes(key));

  const errors = validationResult(req);
  let aggregatedErrors = 
  errors.isEmpty() ? [] : errors.array().map(err => ({
     field: err.path, message: err.msg 
    }));

  extraFields.forEach(field => aggregatedErrors.push({ 
    field, message: `Unexpected field '${field}' is not allowed`
   }));

  if (aggregatedErrors.length > 0) 
    return res.status(422).json({ errors: aggregatedErrors 
  });
  next();
};

module.exports = {
    productValidationRules,
    validateProduct,
};