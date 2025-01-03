const User = require('../models/userModels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require('../utlis/config')

const userController = {
    register: async (request, response) => {
        try {
            const { username, email, password, role } = request.body

            const user = await User.findOne({ email })

            if (user) {
                return response.json({ message: "This email is already registered" })
            }

            if (!password) {
                throw new Error('Password is required');
            }

            const passwordhash = await bcrypt.hash(password, 10)
            const newuser = new User({
                username,
                email,
                password: passwordhash,
                role
            })
            await newuser.save();

            response.json({ message: "User registered successfully" })
        }
        catch (error) {

            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(val => val.message);
                return response.status(400).json({ message: 'Validation failed', errors: errors });
            }

            response.status(500).json({
                message: 'Server error', error: error.message
            });
        }
    },
    login: async (request, response) => {
        try {

            const { email, passworld } = request.body;

            const user = await User.findOne({ email })

            if (!user) {
                return response.status(404).json({ message: "Email not found" });
            }

            const ismatch = await bcrypt.compare(passworld, user.password);
            if (!ismatch) {
                return response.status(401).json({ message: 'Invalid password' });
            }
            const token = await jwt.sign(
                { id: user._id },
                SECRET_KEY
            )
            response.json({ token, message: "User logged in successfully" });
        }
        catch (error) {
            response.status(500).json(error)
        }
    },
    me: async (request, response) => {
        try {
            const userid = request.userid;

            const user = await User.findById(userid).select('-password -created_at -updated_at -__v');
            if (!user) {
                return response.status(500).json({ message: "Invalid token" })
            }
            response.json(user)
        }
        catch (error) {
            response.status(500).json(error)
        }
    }

}

module.exports = userController

