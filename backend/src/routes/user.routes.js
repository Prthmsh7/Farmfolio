const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Admin routes
router.get('/', authMiddleware.protect, authMiddleware.admin, userController.getAllUsers);
router.delete('/:id', authMiddleware.protect, authMiddleware.admin, userController.deleteUser);

// User routes
router.get('/:id', authMiddleware.protect, userController.getUserById);
router.put('/:id', authMiddleware.protect, userController.updateUserProfile);
router.put('/:id/password', authMiddleware.protect, userController.changePassword);

module.exports = router; 