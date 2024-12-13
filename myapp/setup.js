const pool = require('./connection');

let createTableCategories = `
  CREATE TABLE Categories (
  "id" SERIAL PRIMARY KEY, 
  "name" VARCHAR(50) NOT NULL UNIQUE
);
`;

let createTableProducts = `
  CREATE TABLE Products (
  "id" SERIAL PRIMARY KEY, 
  "name" VARCHAR(50) NOT NULL UNIQUE,
  "price" INTEGER NOT NULL,
  "description" TEXT,
  "link_image" VARCHAR(100) NOT NULL,
  "category_id" INTEGER REFERENCES categories(id)
);
`;

async function runSetup() {
    try {
        await pool.query(createTableCategories);
        await pool.query(createTableProducts);
        console.log("Berhasil Membuat Tabel Data");
    } catch (error) {
        console.log(error);
    }
};

runSetup();