const pool = require('../config/connection');

const createTableCategories = `
  CREATE TABLE IF NOT EXISTS Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
  );
`;

const createTableProducts = `
  CREATE TABLE IF NOT EXISTS Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    description TEXT,
    link_image VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES Categories(id)
  );
`;

let createTableUsers = `
  CREATE TABLE IF NOT EXISTS Users (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL
  );
`;

async function runSetup() {
  try {
    await pool.query(createTableCategories);
    await pool.query(createTableProducts);
    await pool.query(createTableUsers);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

runSetup();