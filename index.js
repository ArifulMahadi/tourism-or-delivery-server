const express = require('express');
const app = express();
const port = process.env.PORT || 5000;











app.get('/', (req, res) => {
    res.send('hello traveller!')
})
app.listen(port, () => {
    console.log('server runnig from',port)
})