const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const EmployeeModel = require("./models/Employee");

const app = express();

app.use(cors(
    {
        origin:["https://krishna-food-website.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
))
app.use(express.json());


mongoose.connect("mongodb+srv://princekrishna5707:krishna123@cluster0.hiikio8.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.get("/",(req,res)=>{
    res.json("Hello");
})

app.post("/register", async (req, res) => {
    try {
        const { name, email, age, password } = req.body;

        // Check if the user already exists
        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await EmployeeModel.create({ name, email, age, password: hashedPassword });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error("Error registering employee:", error);
        res.status(500).json({ message: "Error creating account. Please try again." });
    }
});

// Dummy login logic for illustration purposes
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await EmployeeModel.findOne({ email });
        if (!employee) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Simulate a token generation
        res.json({ token: 'fake-jwt-token' });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
