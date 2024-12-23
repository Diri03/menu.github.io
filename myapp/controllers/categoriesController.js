const { getAllCategories, getCategoryById } = require('../services/categoryService');
const { success, error } = require('../utils/responseFormatter');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(success(categories));
  } catch (err) {
    res.status(500).json(error('Internal Server Error'));
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json(error('Data Not Found'));
    }
    res.json(success(category));
  } catch (err) {
    res.status(500).json(error('Internal Server Error'));
  }
};