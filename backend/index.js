const express = require('express');
const Moralis = require('moralis').default;
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/token-price', async (req, res) => {
  
  const {query} = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne,
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo,
  })

  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
  }

  return res.status(200).json(usdPrices);
});


Moralis.start({
  apiKey: process.env.MORAILS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port http://127.0.0.1:${port}`);
  });
}).catch((error) => {
  console.error('Error starting Morails:', error);
})