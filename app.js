const express = require('express')

const app = express()
const port = process.env.port || 5001
app.use(express.json())
const mongoose = require('mongoose');
const createError = require('http-errors');

 mongoose.connect('mongodb+srv://anns2000:anas123@cluster0.lyb7wo3.mongodb.net/GP')
   .then(() => console.log('Connected!'));

/*
mongoose.connect('mongodb://0.0.0.0:27017/gptest')
    .then(() => console.log('Connected!'));
*/

app.use('/department', require('./routes/department.route'))
app.use('/building', require('./routes/building.route'))
app.use('/user', require('./routes/user.route'))
app.use('/question', require('./routes/questions.route'))
app.use('/ticket',require('./routes/tickets.route')) 
app.use('/compounent',require('./routes/orderCompounent.route'))  
app.use('/timeTable', require('./routes/timeTable.route'))
app.use('/notification', require('./routes/notification.route'))
app.use('/complain',require('./routes/complains.route'))


  


app.get('/', async(req, res, next) => {

    res.send({ message: 'Awesome it works now 🐻' });
});

app.use((req, res, next) => {
    console.log(req.body);
    next(createError(501, "this root not found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        meg: err.message,
        isError: true,
        data: []
    });
});

// hello world

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
process.on('unhandledRejectionsss', (err) => {
    console.error('unhandledRejectionsss ' + err)
    process.exit(1);
})