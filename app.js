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
app.use('/ticket',require('./routes/tickets.route')) ///Auther Mario Ktkt 
app.use('/OrderCompounent',require('./routes/orderCompounent.route')) ///Auther Mario Ktkt 
app.use('/timeTable', require('./routes/timeTable.route'))


app.get('/', async(req, res, next) => {
    res.send({ message: 'Awesome it works 🐻' });
});

app.use((req, res, next) => {
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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
process.on('unhandledRejectionsss', (err) => {
    console.error('unhandledRejectionsss ' + err)
    process.exit(1);
})