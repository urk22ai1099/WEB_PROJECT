const http = require('http');
const fs = require('fs');
//To include mongoose module in node js program
const mongoose = require('mongoose');
//Connecting to the mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/p1')

    .then(function () {
        console.log('DB Connected')
    })

//Defining the Structure of mongodb document
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    contact: Number,
    email: String,
    gender: String,
    blood_group: String,
    health_issues: String });
//Create collection model
const customermodel = mongoose.model('d1', customerSchema);

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead('200', { 'Content-Type': 'text/html' });
        fs.createReadStream('list.html').pipe(res);
    }
    else if (req.url === '/s1' && req.method ==='POST') {
        var rawdata = '';
        req.on('data', function (data) {
            rawdata += data;
        })
        req.on('end', function () {
            var formdata = new URLSearchParams(rawdata);
            res.writeHead('200', { 'Content-Type': 'text/html' });
            customermodel.create({
                name:formdata.get('name'),
                age:formdata.get('age'),
                contact:formdata.get('contact'),
                email:formdata.get('email'),
                gender:formdata.get('gender'),
                blood_group:formdata.get('blood_group'),
                health_issues:formdata.get('health_issues')
            })

            res.write('Data Saved Successfully');
            res.end();
        })
    }
});
server.listen('5500', function () {
    console.log('Server started at port http://127.0.0.1:5500');
})