const Account = require('../models/accountModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new account
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) return res.status(400).json({ message: 'Account already exists' });

        const newAccount = new Account({ username, email, password });
        await newAccount.save();
        res.status(201).json({ message: 'Account successfully created', accountId: newAccount._id });
    } catch (error) {
        res.status(500).json({ message: 'Server encountered an issue', error });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const account = await Account.findOne({ email });
        if (!account) return res.status(400).json({ message: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, account.password);
        if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ accountId: account._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login successful' });
    }
};
