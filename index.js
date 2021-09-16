const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const port = process.env.PORT || 5055;

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
        // console.log('from database', news)
        res.send(news)
      })
  })

  app.post('/addNews', (req, res) => {
    const newNews = req.body;
    console.log('adding new news', newNews)
    newsCollection.insertOne(newNews)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.redirect('/')
      })
  })

  // delete route 
  app.delete('/delete/:id', (req, res) => {
    // console.log(req.params.id)
    newsCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        // console.log(result)
        res.send(result.deletedCount > 0)
      })
  })

  // app.patch('/update/:id', (req, res) => {
  //   // console.log(req.body)
  //   newsCollection.updateOne({ _id: ObjectId(req.params.id) },
  //     {
  //       $set: req.body,
  //     }
  //   )
  //     .then(result => {
  //       res.send(result.modifiedCount > 0)
  //     })
  // })

  // update route 
  app.put('/update/:id', (req, res) => {
    const updatedItem = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category
    };
    console.log(req.body);
    newsCollection.updateOne({ _id: ObjectId(req.params.id) },
        { $set: updatedItem })
        .then(result => {
            res.send(result.modifiedCount > 0)
        })
})

  console.log('Database connected')
});


app.listen(process.env.PORT || port)