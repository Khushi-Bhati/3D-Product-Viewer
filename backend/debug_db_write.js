const mongoose = require('mongoose');

const uri = 'mongodb+srv://khushi:khushi123@cluster0.ekeiemg.mongodb.net';

const settingsSchema = new mongoose.Schema({
    backgroundColor: { type: String, default: '#ffffff' },
    wireframe: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const Settings = mongoose.model('Settings', settingsSchema);

console.log('Attempting to connect and write to:', uri);

mongoose.connect(uri)
    .then(async () => {
        console.log('Successfully connected!');

        try {
            const newSettings = new Settings({ backgroundColor: '#00ff00', wireframe: true });
            await newSettings.save();
            console.log('Successfully saved settings!');
            process.exit(0);
        } catch (err) {
            console.error('Failed to save settings:', err);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
