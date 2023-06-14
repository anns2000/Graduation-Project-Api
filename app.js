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

app.post("/gettoken", (req, res) => {
    const appID = "c3e8e71cae794f4eb01046f29e2e84e9";
    const appCertificate = "101f2ad714e742ebbf1303cf7bb032f1";
    const expirationTimeInSeconds = 3600;
    const uid = Math.floor(Math.random() * 100000);
    const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
    const channel = req.body.channel;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
    res.send({ uid, token });
  });
  


app.get('/', async(req, res, next) => {
    res.send({ message: 'Awesome it works 🐻' });
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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
process.on('unhandledRejectionsss', (err) => {
    console.error('unhandledRejectionsss ' + err)
    process.exit(1);
})