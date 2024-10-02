const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URI

mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Connected to MongoDB',))
    .catch(err => console.error('Error connecting to MongoDB:', err));
