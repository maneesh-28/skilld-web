const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const registerUser = async (req, res) => {
    try {
        const client = await pool.connect();
        const { name, username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log(name, username, email, password, role);

         // Check if the role is valid (must be 'student', 'teacher', or 'admin')
         const validRoles = ['student', 'teacher', 'admin'];
         if (!role || !validRoles.includes(role.toLowerCase())) {
             return res.status(400).json({ success: false, message: 'Invalid role. Allowed roles: student, teacher, admin' });
         }

        // Insert the new user into the database
        await client.query({
            text: 'INSERT INTO userlist(name, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)',
            values: [name, username, email, hashedPassword, role]
        });

        // If insertion is successful, send a success message
        res.json({ success: true, message: 'User registered successfully' });

        client.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const client = await pool.connect();
        const { email, password } = req.body;

        // Query to check if the user exists
        const result = await client.query({
            text: 'SELECT user_id, password_hash, role FROM userlist WHERE email = $1',
            values: [email]
        });

        client.release(); // Release the client after query execution

        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const user = result.rows[0];

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.user_id, name: user.name, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ success: true, message: 'Login successful', token, user: { id: user.user_id,name: user.name, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { registerUser, loginUser };
 