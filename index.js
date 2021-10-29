const express = require('express')
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 5500;
const news = require("./routes/news")
const auth = require("./routes/auth")
const categories = require("./routes/categories")

dotenv.config()
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// All Routes
app.use("/api/news", news)
app.use("/api/auth", auth)
app.use("/api/categories", categories)


app.get('/', (req, res) => {
  res.send('News Portal Server')
})

app.listen(port, () => {
  console.log(`${port}`, 'server connected')
})
