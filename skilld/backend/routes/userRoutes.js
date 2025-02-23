
const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers); // Get all users
router.get('/:id', getUserById); // Get a user by ID
router.post('/', createUser); // Create a new user
router.put('/:id', updateUser); // Update user by ID
router.delete('/:id', deleteUser); // Delete user by ID

module.exports = router;
