const pool = require('../config/connection');

exports.getAllProducts = async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM Products');
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query('SELECT * FROM Products WHERE id = $1', [id]);
    const product = data.rows[0];
    if (!product) {
      return res.status(404).json({ message: 'Data Not Found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};