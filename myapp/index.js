const express = require('express');
const pool = require('./connection');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/categories', async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Categories`);
    let dataCategory = data.rows;
    res.json(dataCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get('/products', async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Products`);
    let dataProduct = data.rows;
    res.json(dataProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get('/categories/:id', async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Categories WHERE id = ${req.params.id}`);
    let dataCategory = data.rows[0];
    if (!dataCategory) {
      res.status(404).json({ message: "Data Not Found" });
    } else {
      res.json(dataCategory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Products WHERE id = ${req.params.id}`);
    let dataProduct = data.rows[0];
    if (!dataProduct) {
      res.status(404).json({ message: "Data Not Found" });
    } else {
      res.json(dataProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})