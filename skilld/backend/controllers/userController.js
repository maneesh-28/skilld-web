const pool = require('../config/db'); // Correct import for PostgreSQL connection


// Get all users
const getUsers = async (req, res) => {
    try {
        const client = await pool.connect(); // Connect to the database
        const result = await client.query('SELECT user_id, name, username, email, role FROM userlist'); // Fetch all users without password hash

        client.release(); // Release the connection
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM userlist WHERE user_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, username, email, role, password_hash } = req.body;
       
        // Ensure only valid roles are accepted
        const validRoles = ['student', 'teacher', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role selected' });
        }

        const result = await pool.query(
            'INSERT INTO userlist (name, username, email, role, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, username, email, role, password_hash]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, email, role } = req.body;

        // Ensure only valid roles are accepted
        const validRoles = ['student', 'teacher', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role selected' });
        }

        
        const result = await pool.query(
            'UPDATE userlist SET name = $1, username = $2, email = $3, role = $4 WHERE user_id = $5 RETURNING *',
            [name, username, email, role, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM userlist WHERE user_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
