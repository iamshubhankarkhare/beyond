const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();


const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));




app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', require('./routes/users.js'));


const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port}`);