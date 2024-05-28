const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());


app.use(cors(
    {
        origin:["https://deploy-mern-lwhq.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
))

mongoose.connect("mongodb+srv://princekrishna5707:krishna123@cluster0.hiikio8.mongodb.net/CalorieTracker?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/",(req,res)=>{
    res.json("Hello");
})


const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    const { name, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ name, email, age, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
