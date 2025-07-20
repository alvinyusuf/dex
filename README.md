# 🦄 Decentralized Exchange (DEX) – Personal Project

## 📌 Overview

This is a simple Decentralized Exchange (DEX) project built using **React** (frontend), **Express.js** (backend), and integrated with **1inch Aggregator API** and **Moralis** for token pricing and swapping. This project serves as a personal proof-of-concept and demonstrates practical Web3 integration in a fullstack environment.

---

## ⚙️ Tech Stack


| Layer      | Technology     |
|------------|----------------|
| Frontend   | React.js       |
| Backend    | Express.js     |
| Web3 APIs  | [1inch API](https://docs.1inch.io/) & [Moralis](https://docs.moralis.io/) |
| Tools      | Axios, dotenv, Ethers.js / Web3.js |

---

## 🧩 Key Features

- 🔍 **Token Price Fetching** – Get real-time token prices via Moralis.
- 🔁 **Token Swapping** – Swap tokens through the 1inch Aggregator.
- 🛡️ **Approval Handling** – Check and handle token allowances before swap.
- ⚙️ **CORS Proxy Backend** – Use Express as a proxy to avoid CORS issues with 1inch.

---

## 📁 Project Structure

```
dex-project/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
├── server/ # Express Backend
│ ├── routes/
│ └── index.js
├── .env
└── README.md
```


---

## 🔐 Environment Variables

### Frontend (`client/.env`)

```
env
VITE_MORALIS_API_KEY=your_moralis_api_key
VITE_BACKEND_URL=http://localhost:5000

PORT=5000
MORALIS_API_KEY=your_moralis_api_key
ONEINCH_API=https://api.1inch.dev/swap/v6.1/1
```

# 📦 Installation & Running
### Backend
```
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```

# 👤 Author
### Alvin Yusuf Riziq – Fullstack & Web3 Developer
📧 alvinyusufriziq@example.com
🔗 LinkedIn: https://www.linkedin.com/in/alvin-yusuf-riziq
🔗 GitHub
