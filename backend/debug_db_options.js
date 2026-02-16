const mongoose = require('mongoose');

const uri = 'mongodb+srv://khushi:khushi123@cluster0.ekeiemg.mongodb.net';

console.log('Attempting to connect with options to:', uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Successfully connected!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection failed with options:');
        console.error(err);
        process.exit(1);
    });
