const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/p1').then(() => {
    console.log('db connected')
})
const schema = new mongoose.Schema({name: String, age: Number, contact: Number, email: String, gender: String, blood_group: String,health_issues:String})
const model = mongoose.model('d1', schema)
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const htmlContent = fs.readFileSync('index.html', 'utf8');
        res.end(htmlContent);
    }
    else if (req.url === '/server' & req.method === "POST") {
        let rawdata = '';
        req.on('data', (data) => {
            rawdata += data;
        })
        req.on('end', () => {
            let params = new URLSearchParams(rawdata);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Name: ' + params.get('name') + '<br>');
            res.write('age: ' + params.get('age') + '<br>');
            res.write('contact: ' + params.get('contact') + '<br>');
            res.write('email: ' + params.get('email') + '<br>');
            res.write('gender: ' + params.get('gender') + '<br>');
            res.write('blood_group: ' + params.get('blood_group') + '<br>');
            res.write('health_issues'+params.get('health_issues')+'<br>');
            model.create({
                name: params.get('name'),
                age: params.get('age'),
                contact: params.get('contact'),
                email: params.get('email'),
                gender: params.get('gender'),
                blood_group: params.get('blood_group'),
                health_issues:params.get('health_issues')
            })
            res.write("Data saved")
            res.end();
        })
    }
    else if (req.url == '/view') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        model.find().then((users) => {
            res.write("<table border='1' cellspacing='0' style='width: 100%;'><tr><th>Name</th><th>Age</th><th>Mobile Number</th><th>Email</th><th>Gender</th><th>Blood group</th><th>Health Issue</th></tr>")
            users.forEach((record) => {
                res.write('<tr>')
                res.write('<td style="padding: 10px;">' + record.name + '</td>')
                res.write('<td style="padding: 10px;">' + record.age + '</td>')
                res.write('<td style="padding: 10px;">' + record.contact + '</td>')
                res.write('<td style="padding: 10px;">' + record.email + '</td>')
                res.write('<td style="padding: 10px;">' + record.gender + '</td>')
                res.write('<td style="padding: 10px;">' + record.blood_group + '</td>')
                res.write('<td style="padding: 10px;">' + record.health_issues + '</td></tr>')
            })
            res.write('</table>')
            res.end()
        })
    }
});
server.listen('8000', function () {
    console.log('Server started at port http://127.0.0.1:8000');
})