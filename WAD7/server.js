const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")

.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))



const studentSchema = new mongoose.Schema({

    name: String,
    email: String,
    city: String

})

const Student = mongoose.model("Student", studentSchema)


app.post('/addstudent', async (req, res) => {

    const student = new Student(req.body)

    await student.save()

    res.send("Student Created")

})


app.get('/getstudent', async (req, res) => {

    const student = await Student.find()

    res.send(student)

})


app.put('/updatestudent/:id', async (req, res) => {

    await Student.findByIdAndUpdate(req.params.id, req.body)

    res.send("Student Updated")

})


app.delete('/deletestudent/:id', async (req, res) => {

    await Student.findByIdAndDelete(req.params.id)

    res.send("Student Deleted")

})


const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`)

})