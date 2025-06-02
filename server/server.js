const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const cors = require('cors');
const User = require('./db')
const mongoose = require('mongoose')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json())


mongoose.connect('mongodb+srv://admin:admin@soni.hyhztqy.mongodb.net/?retryWrites=true&w=majority&appName=soni')

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(req.body)
    const savedUser = await user.save()
    //Save data to database here
    console.log('User registered:', { username, email, hashedPassword });
    console.log('savedUser:', savedUser);

    res.status(201).send({ message: 'User registered successfully.' })
})

app.listen(port, () => console.log(`Server running on port ${port}`));

