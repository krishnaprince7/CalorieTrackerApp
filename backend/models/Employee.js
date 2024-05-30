const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

const EmployeesModel = mongoose.model("Employee", EmployeesSchema);

module.exports = EmployeesModel;
