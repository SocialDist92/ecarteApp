const express = require('express');
const app = express();
const bodyParser = require('body-parser')

/*DB SETUP*/
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://armando:armando@cluster0-1qgup.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to ecarte db')
});

const studentSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    courses: Array
})
const courseSchema = new mongoose.Schema({
    name: String,
    price: String,
    startDate: Date,
    endDate: Date
})

const Student = mongoose.model('student', studentSchema)
const Course = mongoose.model('course', courseSchema)

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/get-students', function (req, res) {
    Student.find({}, function (err, students) {
        if (err) return res.status(500).send(err)
        res.send(students)
    })
})

app.get('/api/get-courses', function (req, res) {
    Course.find({}, function (err, courses) {
        if (err) return res.status(500).send(err)
        res.send(courses)
    })
})

app.post('/api/add-student', function (req, res) {
    if (req.body.name && req.body.lastName) {
        const name = req.body.name.toLowerCase();
        const lastName = req.body.lastName.toLowerCase();
        Student.findOne({name, lastName}, function (err, student) {
            if (err) return res.status(500).send(err)
            if (student) return res.status(500).send('user already exists')
            else {

                const student = new Student({name, lastName, courses: req.body.courses})
                student.save(function (err, student) {
                    if (err) return res.status(500).send(err)
                    res.send(student)
                })
            }
        })
    } else res.status(500).send('missing attributes')

})

app.post('/api/delete-student', function (req, res) {
    const id = req.query.id;
    Student.findOneAndDelete({_id: id}, function (err, course) {
        if (err) return res.status(500).send(err)
        if (course) return res.send('success');
    })
})

app.post('/api/delete-course', function (req, res) {
    const id = req.query.id;
    Course.findOneAndDelete({_id: id}, function (err, course) {
        if (err) return res.status(500).send(err)
        if (course) return res.send('success');
    })
})

app.post('/api/add-course', function (req, res) {
    const name = req.query.name.toLowerCase()
    const price = parseFloat(req.query.price).toFixed(2).toString()
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)
    Course.findOne({name}, function (err, course) {
        if (err) return res.status(500).send(err)
        if (course) return res.status(500).send('course already exists')
        else {
            const course = new Course({name, price, startDate, endDate})
            course.save(function (err, course) {
                if (err) return res.status(500).send(err)
                res.send(course)
            })
        }
    })

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});