const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Using bcryptjs for hashing passwords

// Register Controller
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10); // Salt rounds set to 10

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error in register:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error in login:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};