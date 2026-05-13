// server.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* Schema */

const studentSchema = new mongoose.Schema({

    name: String,
    email: String,
    city: String

});

/* Model */

const Student = mongoose.model("Student", studentSchema);

/* CREATE API */

app.post("/addStudent", async (req, res) => {

    const student = new Student(req.body);

    await student.save();

    res.send("Student Added");

});

/* READ API */

app.get("/getStudents", async (req, res) => {

    const students = await Student.find();

    res.json(students);

});

/* UPDATE API */

app.put("/updateStudent/:id", async (req, res) => {

    await Student.findByIdAndUpdate(req.params.id, req.body);

    res.send("Student Updated");

});

/* DELETE API */

app.delete("/deleteStudent/:id", async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.send("Student Deleted");

});

/* Server */

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});