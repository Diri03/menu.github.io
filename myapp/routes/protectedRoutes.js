const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/admin', authMiddleware, authorizeRoles(['ADMIN']), (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

router.get('/user', authMiddleware, authorizeRoles(['USER', 'ADMIN']), (req, res) => {
  res.json({ message: "Welcome User", user: req.user });
});

module.exports = router;