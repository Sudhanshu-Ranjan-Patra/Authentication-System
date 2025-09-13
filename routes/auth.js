const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Register
router.post('/register', async (req, res)=>{
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email});
        if(user) return res.status(400).json({ msg: 'User exists'});

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { name: user.name, email: user.email } });
    }catch(err){
        res.status(500).send({ msg: 'Server error' });
    }
})

// Login
router.post('/login', async (req, res) => {
    const {email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({msg: 'Invalid credentials'});

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;