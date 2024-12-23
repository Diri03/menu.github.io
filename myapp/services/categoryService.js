const pool = require('../config/connection');

exports.getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM Categories');
  return result.rows;
};

exports.getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM Categories WHERE id = $1', [id]);
  return result.rows[0];
};