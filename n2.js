const http = require('http');
const fs = require('fs');
//To include mongoose module in node js program
const mongoose = require('mongoose');
//Connecting to the mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

    .then(function () {
        console.log('DB Connected')
    })

//Defining the Structure of mongodb document
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    Mobile: Number,
    email: String,
    gender: String,
    cname: String,
    car_rnum: String });
//Create collection model
const customermodel = mongoose.model('customers', customerSchema);

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead('200', { 'Content-Type': 'text/html' });
        fs.createReadStream('new.html').pipe(res);
    }
    else if (req.url === '/server' && req.method ==='POST') {
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
                cname:formdata.get('cname'),
                car_rnum:formdata.get('car_rnum')
            })

            res.write('Data Saved Successfully');
            res.end();
        })
    }
});
server.listen('8000', function () {
    console.log('Server started at port http://127.0.0.1:8000');
})