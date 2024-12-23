const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Bin = require('../models/Bin');
const router = express.Router();

// Middleware to check user authorization
const authorizeUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Route to create a new bin
router.post('/create', async (req, res) => {
    const { name, location, status } = req.body;

    try {
        if (!name || !location || !status) {
            return res.status(400).json({ message: 'All fields (name, location, status) are required.' });
        }

        const newBin = new Bin({ name, location, status });
        const savedBin = await newBin.save();

        // Emit the new bin to all connected clients
        const io = req.app.get('socketio');
        io.emit('binCreated', savedBin);

        res.status(201).json({ message: 'Bin created successfully', bin: savedBin });
    } catch (err) {
        console.error('Error creating bin:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to update a bin
router.post('/update', authorizeUser, async (req, res) => {
    const { binId, status } = req.body;

    try {
        if (!binId || !status) {
            return res.status(400).json({ message: 'binId and status are required.' });
        }

        if (!mongoose.Types.ObjectId.isValid(binId)) {
            return res.status(400).json({ message: 'Invalid binId format.' });
        }

        const bin = await Bin.findByIdAndUpdate(binId, { status }, { new: true });

        if (!bin) {
            return res.status(404).json({ message: 'Bin not found.' });
        }

        // Emit the updated bin to all connected clients
        const io = req.app.get('socketio');
        io.emit('binUpdated', bin);

        res.status(200).json({ message: 'Bin updated successfully', bin });
    } catch (err) {
        console.error('Error updating bin:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all bins
router.get('/all', async (req, res) => {
    try {
        const bins = await Bin.find();

        if (!bins || bins.length === 0) {
            return res.status(404).json({ message: 'No bins found.' });
        }

        // Emit the fetched bins to all connected clients
        const io = req.app.get('socketio');
        io.emit('binsFetched', bins);

        res.status(200).json({ bins });
    } catch (err) {
        console.error('Error fetching bins:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
