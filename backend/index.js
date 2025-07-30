const express = require('express');
const Moralis = require('moralis').default;
const cors = require('cors');
const { default: axios } = require('axios');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/check', (req, res) => res.status(200).json({ message: "Hello World!" }))

app.get('/token-price', async (req, res) => {
  
  const {query} = req;

  try {
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
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return res.status(500).json({
      error: 'Failed to fetch token prices',
      details: error.message,
    });
  }

});

app.get('/allowance', async (req, res) => {
  
  const { tokenAddress, walletAddress } = req.query;

  try {
   const result = await axios.get('https://api.1inch.dev/swap/v6.1/1/approve/allowance', {
    params: {
      tokenAddress,
      walletAddress,
    },
    headers: {
      Authorization: `Bearer ${process.env.BE_1INCH_API_KEY}`,
    }
   })
    return res.status(200).json(result.data); 
  } catch (error) {
    console.error('Error fetching allowance:', error);
    return res.status(500).json({
      error: 'Failed to fetch allowance',
      details: error.message,
    });
  }
});

app.get('/approve-transaction', async (req, res) => {
  const { tokenAddress } = req.query;

  try {
    const result = await axios.get('https://api.1inch.dev/swap/v6.1/1/approve/transaction', {
      params: {
        tokenAddress,
      },
      headers: {
        Authorization: `Bearer ${process.env.BE_1INCH_API_KEY}`,
      }
    });
    return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching approve transaction:', error);
    return res.status(500).json({
      error: 'Failed to fetch approve transaction',
      details: error.message,
    });
  }
});

app.get('/swap', async (req, res) => {
  const { src, dst, amount, from, origin, slippage } = req.query;

  try {
    const result = await axios.get('https://api.1inch.dev/swap/v6.1/1/swap', {
      params: {
        src,
        dst,
        amount,
        from,
        origin,
        slippage,
      },
      headers: {
        Authorization: `Bearer ${process.env.BE_1INCH_API_KEY}`,
      }
    });
    return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching swap:', error);
    return res.status(500).json({
      error: 'Failed to fetch swap',
      details: error.message,
    });
  }
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