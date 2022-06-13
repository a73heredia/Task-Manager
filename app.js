//console.log('Task Manager App')
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connecDb = require('./db/connect')
require('dotenv').config();

const port = 3000;


//midlewares
app.use(express.static('./public'))
app.use(express.json());

/* app.get('/hello', (req, res) => {
    res.send('task manager');
}); */

//routes

app.use('/api/v1/tasks', tasks);

const start = async () => {
    try {
        await connecDb(process.env.MONGO_URI);
        console.log('Connected to DB');
        app.listen(port, () => console.log(`Listening on ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();