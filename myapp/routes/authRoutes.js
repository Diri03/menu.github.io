const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;