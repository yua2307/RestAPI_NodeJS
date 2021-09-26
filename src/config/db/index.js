const mongoose = require('mongoose');

async function connect(options) {
    try {
        await mongoose.connect('mongodb://localhost:27017/restAPI', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect DB successfully');

    }
    catch (err) {
        console.log('Connect DB fail');
    }

}

module.exports = { connect };