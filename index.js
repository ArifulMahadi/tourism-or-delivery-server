const express = require('express');
const cors = require('cors')
const { MongoClient } = require('mongodb');

const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://travellerUser:aeAp5uwAdwI1XwED@cluster0.dbdl3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run () {
    try{
        await client.connect()
        const database = client.db('online_Shop')
        const ticketCollection = database.collection('tickets')
        const orderCollection = database.collection('orders')

        //get tickets api 
        app.get('/tickets', async(req, res) =>{
            const cursor = ticketCollection.find({});
            const tickets = await cursor.toArray();
            res.send(tickets)
        })
        // order api 
        app.post('/order',async(req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.json(result)
        })
    }
    finally{
        // await client.close()
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('hello traveller!')
})
app.listen(port, () => {
    console.log('server runnig from',port)
})