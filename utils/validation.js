const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

// Product validation schemas
const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name must be at least 2 characters',
    'string.max': 'Product name cannot exceed 100 characters'
  }),
  description: Joi.string().trim().max(500).required().messages({
    'string.empty': 'Description is required',
    'string.max': 'Description cannot exceed 500 characters'
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required'
  }),
  stock: Joi.number().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required'
  }),
  category: Joi.string().valid('Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Other').default('Other'),
  imageUrl: Joi.string().uri().optional(),
  tags: Joi.array().items(Joi.string().trim()).optional()
});

// Cart validation schemas
const cartItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'Product ID is required'
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required'
  })
});

const updateCartItemSchema = Joi.object({
  quantity: Joi.number().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required'
  })
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  cartItemSchema,
  updateCartItemSchema,
  validate
};