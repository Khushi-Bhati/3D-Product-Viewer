const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Settings = require('../models/Settings');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('model'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});


router.post('/settings', async (req, res) => {
    try {
        const { backgroundColor, wireframe } = req.body;
        const newSettings = new Settings({ backgroundColor, wireframe });
        await newSettings.save();
        res.json(newSettings);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/settings', async (req, res) => {
    try {
        const settings = await Settings.findOne().sort({ timestamp: -1 });
        res.json(settings || { backgroundColor: '#ffffff', wireframe: false });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
