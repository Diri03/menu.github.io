const bcrypt = require('bcrypt');
const pool = require('../config/connection');
const categories = require('../data/categories.json');
const products = require('../data/products.json');

async function seedCategories() {
  const values = categories.map(cat => `('${cat.name}')`).join(',');
  const query = `INSERT INTO Categories (name) VALUES ${values} ON CONFLICT DO NOTHING`;
  return pool.query(query);
}

async function seedProducts() {
  const values = products.map(prod =>
    `('${prod.name}', ${prod.price}, '${prod.description}', '${prod.link_image}', ${prod.category_id})`
  ).join(',');
  const query = `INSERT INTO Products (name, price, description, link_image, category_id) VALUES ${values} ON CONFLICT DO NOTHING`;
  return pool.query(query);
}

async function runSeeding() {
  try {
    await seedCategories();
    await seedProducts();
    console.log('Data seeding successful');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

async function seedUsers() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
  
    const query = `
      INSERT INTO Users (username, password, role)
      VALUES 
        ('admin', '${adminPassword}', 'ADMIN'),
        ('user', '${userPassword}', 'USER')
    `;
  
    try {
      await pool.query(query);
      console.log("Users seeded successfully!");
    } catch (error) {
      console.log(error);
    }
}

// runSeeding();
seedUsers();