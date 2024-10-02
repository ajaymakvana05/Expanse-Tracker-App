const usermodel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { password: _, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Login failed', error });
    }
};


const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: 'Error creating user', error });
    }
};


module.exports = {
    loginController,
    registerController
};
