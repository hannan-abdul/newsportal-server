const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config()
const port = 5055;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oqra4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection err', err)
  const newsCollection = client.db("newsData").collection("newsCollection");

  app.get('/allnews', (req, res) => {
    newsCollection.find()
      .toArray((err, news) => {
        console.log('from database', news)
        res.send(news)
      })
  })

  app.post('/addNews', (req, res) => {
    const newNews = req.body;
    console.log('adding new news', newNews)
    newsCollection.insertOne(newNews)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  app.delete('/deleteNews/:id', (req, res) => {
    const id = ObjectID(req.params.id);
    console.log('delete this', id)
    newsCollection.findOneAndDelete({ _id: id })
      .then(result => {
        res.send(result.deletedCount > 0)
        // res.send(!!documents.value)
      })
  })
  console.log('Database connected')
  //   client.close();
});


app.listen(process.env.PORT || port)