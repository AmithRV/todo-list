const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const connection_url = 'mongodb+srv://amith:1YXuTYrPtCYVxUKw@cluster0.xhbwavq.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(connection_url).then(
//     () => console.log('Connected!')
// );

app.get('/', (req, res) => {
    res.send('hello');
    res.end();
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});