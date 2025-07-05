# ShoppyGlobe E-commerce Backend API

A comprehensive e-commerce backend API built with Node.js, Express.js, and MongoDB. This API provides complete functionality for product management, user authentication, shopping cart operations, and more.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Password hashing with bcrypt
  - Profile management

- **Product Management**
  - Full CRUD operations for products
  - Product categories and filtering
  - Search functionality
  - Pagination support
  - Stock management

- **Shopping Cart**
  - Add items to cart
  - Update item quantities
  - Remove items from cart
  - Clear entire cart
  - User-specific cart management

- **Security & Validation**
  - Input validation with Joi
  - Rate limiting
  - CORS enabled
  - Helmet for security headers
  - Global error handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omkar0210/API_tester.git
   cd API_tester
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/shoppyglobe
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `search` - Search in name and description
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort field (name, price, createdAt)
- `sortOrder` - Sort order (asc, desc)

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "name": "iPhone 15",
  "description": "Latest iPhone model",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics",
  "imageUrl": "https://example.com/iphone15.jpg"
}
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 1199.99,
  "stock": 30
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer <admin-jwt-token>
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
Authorization: Bearer <your-jwt-token>
```

#### Add Item to Cart
```http
POST /api/cart
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "productId": "60f7b1b3c4d4f3a2b4c5d6e7",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/:productId
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/:productId
Authorization: Bearer <your-jwt-token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <your-jwt-token>
```

## 🗂️ Project Structure

```
shoppy-globe-backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product management
│   └── cartController.js    # Cart operations
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── errorHandler.js     # Global error handling
├── models/
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   └── Cart.js             # Cart schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── products.js         # Product routes
│   └── cart.js             # Cart routes
├── utils/
│   └── validation.js       # Input validation schemas
├── .env                    # Environment variables
├── server.js               # Main server file
└── README.md              # This file
```

## 🧪 Testing with ThunderClient

### Test Authentication
1. Register a new user
2. Login with credentials
3. Copy the JWT token from login response
4. Use token in Authorization header for protected routes

### Test Products
1. Get all products (public)
2. Get single product (public)
3. Create product (admin only)
4. Update product (admin only)
5. Delete product (admin only)

### Test Cart Operations
1. Add items to cart (authenticated)
2. Get cart contents (authenticated)
3. Update item quantities (authenticated)
4. Remove items from cart (authenticated)
5. Clear entire cart (authenticated)

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: Joi validation for all inputs
- **CORS**: Cross-origin resource sharing enabled
- **Helmet**: Security headers for protection
- **Error Handling**: Comprehensive error responses

## 📊 Database Collections

### Users Collection
```javascript
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "role": String (enum: ['user', 'admin']),
  "isActive": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Products Collection
```javascript
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "price": Number,
  "stock": Number,
  "category": String,
  "imageUrl": String,
  "isActive": Boolean,
  "tags": [String],
  "ratings": {
    "average": Number,
    "count": Number
  },
  "createdAt": Date,
  "updatedAt": Date
}
```

### Carts Collection
```javascript
{
  "_id": ObjectId,
  "userId": ObjectId (ref: 'User'),
  "items": [{
    "productId": ObjectId (ref: 'Product'),
    "quantity": Number,
    "price": Number,
    "addedAt": Date
  }],
  "totalItems": Number,
  "totalPrice": Number,
  "isActive": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shoppyglobe
JWT_SECRET=your-super-secure-production-secret
JWT_EXPIRES_IN=7d
PORT=5000
```

### Deployment Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Vercel**: Serverless deployment option
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 or Lambda deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@shoppyglobe.com or create an issue in the repository.

## 🎯 Future Enhancements

- [ ] Order management system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] API versioning
- [ ] Caching with Redis
- [ ] File upload for product images
- [ ] Advanced search with filters

---

Made with ❤️ by the ShoppyGlobe Team
