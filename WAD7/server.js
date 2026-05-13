const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())


mongoose.connect("")
.then(() =>  console.log("mogodb is connected"))
.catch((err) => console.log(err))


const studentScheam = new mongoose.Schema({

  name : String,
  email : String,
  city : String

});

const Student = new mongoose.model("Student", studentScheam )


app.post('/addstudent', async (req,res) => {
 
    const student = new Student(req.body)
    await student.save();
    res.send("student created")

});

app.get('/getstudent', async (req,res) => {

    const student = await Student.find(req.body)
    res.send(express.json)
});

app.put('/updatestudent/id', async (req,res) => {

    await Student.findByIdAndUpdate(req.params.id,req.body)
    res.send("student is upadted")
} )
   

app.delete('/deletestudent/id', async (req,res) => {

    await Student.findByIdAndDelete(req.params.id,req.body)
    res.send("student is deleted")
} )

const PORT =3000
app.listen(PORT,() => {
    `Server running at http://localhost:${PORT}`
});