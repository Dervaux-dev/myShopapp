const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Make sure to: npm install bcryptjs

/**
 * Handles user login using Bcrypt for secure password comparison.
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log("--- Secure Login Attempt ---");
    console.log("Input Username:", username);

    try {
        // 1. Find the user by username
        const user = await User.findOne({ username: username.trim() });

        if (!user) {
            console.log("Result: User not found in database.");
            return res.status(401).json({ 
                success: false, 
                message: "Invalid Username or Password." 
            });
        }

        // 2. Compare the plain text password from the phone with the HASH in the DB
        const isMatch = await bcrypt.compare(password.trim(), user.password);

        if (isMatch) {
            console.log("Result: Password matched with Bcrypt!");
            res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } else {
            console.log("Result: Bcrypt password mismatch.");
            res.status(401).json({ 
                success: false, 
                message: "Invalid Username or Password." 
            });
        }

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server error during login." 
        });
    }
};

module.exports = { loginUser };