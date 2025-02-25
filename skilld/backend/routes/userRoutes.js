
// const express = require('express');
// const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// const router = express.Router();

// router.get('/', getUsers); // Get all users
// router.get('/:id', getUserById); // Get a user by ID
// router.post('/', createUser); // Create a new user
// router.put('/:id', updateUser); // Update user by ID
// router.delete('/:id', deleteUser); // Delete user by ID

// module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import PostgreSQL connection

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM userlist');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
