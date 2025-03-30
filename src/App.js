import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "./Button.js";
import { Card } from "./Card.js";
import { CardContent } from "./CardContent.js";
import { Input } from "./Input.js";
import { Label } from "./Label.js";

import contractABI from "./CarbonCreditNFT.json";
const CONTRACT_ADDRESS = "0x7566a2a13351713BbEf0e91D38abaCc3817bcd18";
export default function CarbonCreditNFTApp() {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [co2Level, setCo2Level] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.error("Ethereum provider not detected.");
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await web3Provider.getSigner();
      setProvider(web3Provider);

      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
      setContract(nftContract);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. See console for details.");
    }
  };

  const submitAirQualityData = async () => {
    if (!contract) {
      alert("Smart contract not loaded!");
      return;
    }
    if (!co2Level || isNaN(co2Level)) {
      alert("Please enter a valid CO2 level.");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.submitAirQualityData(parseInt(co2Level, 10));
      await tx.wait();
      alert("CO2 data submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed: " + error.message);
    }
    setLoading(false);
  };

  const mintNFT = async () => {
    if (!contract) {
      alert("Smart contract not loaded!");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.validateAndMint(walletAddress, "ipfs://your-metadata-uri");
      await tx.wait();
      alert("NFT Minted Successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed: " + error.message);
    }
    setLoading(false);
  };

  const listNFTForSale = async (tokenId) => {
    if (!contract) {
      alert("Smart contract not loaded!");
      return;
    }
    if (!salePrice || isNaN(salePrice)) {
      alert("Enter a valid price in ETH.");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.listNFTForSale(tokenId, ethers.parseEther(salePrice));
      await tx.wait();
      alert("NFT Listed for Sale!");
    } catch (error) {
      console.error("Listing failed:", error);
      alert("Listing failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Carbon Credit NFT Marketplace</h1>
      {!walletAddress ? (
        <Button onClick={connectWallet} disabled={loading}>Connect Wallet</Button>
      ) : (
        <div>
          <p>Connected: {walletAddress}</p>
          <Card>
            <CardContent>
              <Label>Enter CO2 Level</Label>
              <Input type="number" value={co2Level} onChange={(e) => setCo2Level(e.target.value)} />
              <Button onClick={submitAirQualityData} disabled={loading}>
                Submit Data
              </Button>
            </CardContent>
          </Card>
          <Button onClick={mintNFT} disabled={loading}>
            Mint NFT
          </Button>
          <Card>
            <CardContent>
              <Label>List NFT for Sale (Enter Price in ETH)</Label>
              <Input type="text" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
              <Button onClick={() => listNFTForSale(0)} disabled={loading}>List for Sale</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}