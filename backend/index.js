const express = require('express');
const Morails = require('morails').default;

const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/tokenPrice', async (req, res) => {
  return res.status(200).json(usdPrice);
});

const startServer = async () => {
  await Morails.start({
    apiKey: process.env.MORAILS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer()