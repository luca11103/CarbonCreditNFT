# CarbonCreditNFT
Carbon Credit NFT is a decentralized application (dApp) that allows users to mint, buy, and trade carbon credit NFTs on the blockchain. It integrates with MetaMask for wallet connectivity and is deployed on Vercel.
# 🌱 Carbon Credit NFT  

A **decentralized, NFT-based carbon credit system** where users earn tokenized rewards for improving air quality. This project leverages **Ethereum, Solidity, and React** to create a transparent and immutable platform for carbon credit tracking and trading.  

---

## Problem Statement  

**Centralization Issues** – Current carbon credit systems are centralized, making them prone to corruption and inaccessibility.  

**Lack of Rewards** – Many individuals and small businesses contributing to a cleaner environment don’t get rewarded.  

**Data Manipulation** – Air pollution data is often altered by authorities, reducing transparency.  

---

## Solution  

**Decentralized Carbon Credit System** – No central authority controls the issuance of carbon credits.  

**NFT-Based Carbon Credits** – Users earn tokenized rewards for air quality improvements.  

**Transparent & Tamper-Proof** – Data is recorded on the blockchain, ensuring immutability.  

**Open Marketplace** – Companies and individuals can **buy, sell, and trade carbon credits** freely.  

---

## How It Works  

1️ **Air Quality Monitoring** – Sensors collect air pollution data.  
2️ **NFT Minting** – Users receive **Carbon Credit NFTs** as proof of environmental contributions.  
3️ **Trading & Rewards** – NFTs can be **bought, sold, or used for incentives** in the marketplace.  
4️ **Decentralized Ledger** – Transactions are stored on Ethereum, ensuring full transparency.  

---

## Tech Stack  

### **Frontend:**  
 React.js – User-friendly interface.  
 ethers.js – Blockchain interaction.  

### **Blockchain & Smart Contracts:**  
 Solidity – Smart contract logic.  
 Hardhat – Ethereum development framework.  
 Ethereum (Testnet) – Blockchain network for transactions.  

### **Deployment:**  
 Vercel – Hosting for the frontend.  
 IPFS (Optional) – Immutable NFT metadata storage.  

---

## 🌟 Features  

1 **Mint Carbon Credit NFTs** – Convert carbon credits into unique NFTs.  
2 **Wallet Integration** – Connect **MetaMask** for blockchain interactions.  
3 **Smart Contract Transactions** – Secure, decentralized, and verifiable.  
4 **Live Marketplace (Coming Soon)** – Buy, sell, and trade carbon credits.  
5 **Fully Transparent** – No central authority manipulation.  

---

##  Installation & Setup  

### ** Clone the Repository**  
```bash
git clone https://github.com/luca11103/CarbonCreditNFT.git
cd carbon-credit-nft
npm install
npm start
npx vercel
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npx hardhat run scripts/deploy.js --network goerli

