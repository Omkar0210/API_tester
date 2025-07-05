const bcrypt = require('bcryptjs');
require('dotenv').config();

const { connectDB, getDB } = require('../config/database');

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Admin User',
    email: 'admin@shoppyglobe.com',
    password: 'admin123',
    role: 'admin'
  }
];

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features and premium design',
    price: 1199.99,
    stock: 50,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    tags: JSON.stringify(['smartphone', 'apple', 'premium'])
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Flagship Android phone with exceptional camera quality',
    price: 999.99,
    stock: 75,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    tags: JSON.stringify(['smartphone', 'android', 'camera'])
  },
  {
    name: 'MacBook Pro M3',
    description: 'Professional laptop with M3 chip for ultimate performance',
    price: 2499.99,
    stock: 25,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg',
    tags: JSON.stringify(['laptop', 'apple', 'professional'])
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with modern design',
    price: 149.99,
    stock: 100,
    category: 'Sports',
    imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    tags: JSON.stringify(['shoes', 'running', 'nike'])
  },
  {
    name: 'Levi\'s 501 Jeans',
    description: 'Classic denim jeans with timeless style',
    price: 89.99,
    stock: 200,
    category: 'Clothing',
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    tags: JSON.stringify(['jeans', 'casual', 'denim'])
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    stock: 150,
    category: 'Books',
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    tags: JSON.stringify(['classic', 'literature', 'american'])
  },
  {
    name: 'Ceramic Plant Pot',
    description: 'Beautiful ceramic pot perfect for indoor plants',
    price: 24.99,
    stock: 80,
    category: 'Home & Garden',
    imageUrl: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    tags: JSON.stringify(['plant', 'ceramic', 'indoor'])
  },
  {
    name: 'Moisturizing Face Cream',
    description: 'Premium skincare cream for all skin types',
    price: 34.99,
    stock: 120,
    category: 'Beauty',
    imageUrl: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
    tags: JSON.stringify(['skincare', 'moisturizer', 'beauty'])
  },
  {
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 199.99,
    stock: 60,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    tags: JSON.stringify(['audio', 'wireless', 'music'])
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for comfortable practice',
    price: 39.99,
    stock: 90,
    category: 'Sports',
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
    tags: JSON.stringify(['yoga', 'fitness', 'exercise'])
  }
];

const seedDatabase = async () => {
  try {
    const db = getDB();
    
    // Clear existing data
    db.exec('DELETE FROM cart_items');
    db.exec('DELETE FROM carts');
    db.exec('DELETE FROM products');
    db.exec('DELETE FROM users');
    
    console.log('🧹 Cleared existing data');

    // Prepare statements
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `);
    
    const insertProduct = db.prepare(`
      INSERT INTO products (name, description, price, stock, category, imageUrl, tags) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertCart = db.prepare(`
      INSERT INTO carts (userId) VALUES (?)
    `);
    
    const insertCartItem = db.prepare(`
      INSERT INTO cart_items (cartId, productId, quantity, price) 
      VALUES (?, ?, ?, ?)
    `);

    // Create users
    const userIds = [];
    for (let userData of sampleUsers) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const result = insertUser.run(userData.name, userData.email, hashedPassword, userData.role);
      userIds.push(result.lastInsertRowid);
    }
    
    console.log(`👥 Created ${userIds.length} users`);

    // Create products
    const productIds = [];
    for (let productData of sampleProducts) {
      const result = insertProduct.run(
        productData.name,
        productData.description,
        productData.price,
        productData.stock,
        productData.category,
        productData.imageUrl,
        productData.tags
      );
      productIds.push(result.lastInsertRowid);
    }
    
    console.log(`📦 Created ${productIds.length} products`);

    // Create sample cart for first user
    const cartResult = insertCart.run(userIds[0]);
    const cartId = cartResult.lastInsertRowid;
    
    // Add items to cart
    insertCartItem.run(cartId, productIds[0], 1, sampleProducts[0].price);
    insertCartItem.run(cartId, productIds[3], 2, sampleProducts[3].price);
    
    console.log('🛒 Created sample cart');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Data Summary:');
    console.log(`   Users: ${userIds.length}`);
    console.log(`   Products: ${productIds.length}`);
    console.log(`   Carts: 1`);
    
    console.log('\n👤 Sample User Credentials:');
    console.log('   Regular User: john@example.com / password123');
    console.log('   Admin User: admin@shoppyglobe.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();