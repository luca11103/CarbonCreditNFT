// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    
    struct CarbonCredit {
        uint256 tokenId;
        address owner;
        uint256 carbonReduction; // CO₂ reduction in kg
        string metadataURI;
        bool isListedForSale;
        uint256 price;
    }

    mapping(uint256 => CarbonCredit) public carbonCredits;
    mapping(address => uint256[]) public userAirQualityData; 
    mapping(address => uint256) public balanceOfNFTs;
    event CarbonCreditMinted(uint256 tokenId, address owner, uint256 carbonReduction, string metadataURI);
    event AirQualityDataSubmitted(address user, uint256 co2Level);
    event NFTListedForSale(uint256 tokenId, uint256 price);
    event NFTPurchased(uint256 tokenId, address buyer, uint256 price);

    constructor(address initialOwner) ERC721("CarbonCreditNFT", "CCNFT") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function submitAirQualityData(uint256 co2Level) public {
        require(userAirQualityData[msg.sender].length == 0 || userAirQualityData[msg.sender][userAirQualityData[msg.sender].length - 1] != co2Level, "Duplicate CO2 value not allowed");
        
        userAirQualityData[msg.sender].push(co2Level);
        emit AirQualityDataSubmitted(msg.sender, co2Level);
    }

    function validateAndMint(address recipient, string memory metadataURI) public onlyOwner {
        require(userAirQualityData[recipient].length >= 2, "Not enough data submitted");
        
        uint256 lastIndex = userAirQualityData[recipient].length - 1;
        uint256 prevCO2 = userAirQualityData[recipient][lastIndex - 1];
        uint256 latestCO2 = userAirQualityData[recipient][lastIndex];
        
        require(latestCO2 < prevCO2, "CO2 levels must decrease to earn credits");
        require(balanceOfNFTs[recipient] == 0, "NFT already minted for this user");

        uint256 carbonReduction = prevCO2 - latestCO2;
        uint256 newTokenId = tokenCounter;
        
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        
        carbonCredits[newTokenId] = CarbonCredit({
            tokenId: newTokenId,
            owner: recipient,
            carbonReduction: carbonReduction,
            metadataURI: metadataURI,
            isListedForSale: false,
            price: 0
        });

        balanceOfNFTs[recipient] = 1;
        emit CarbonCreditMinted(newTokenId, recipient, carbonReduction, metadataURI);
        
        tokenCounter++;
    }

    function listNFTForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "You must own the NFT to sell it");
        require(!carbonCredits[tokenId].isListedForSale, "NFT already listed");
        
        carbonCredits[tokenId].isListedForSale = true;
        carbonCredits[tokenId].price = price;
        
        emit NFTListedForSale(tokenId, price);
    }

    function buyNFT(uint256 tokenId) public payable {
        require(carbonCredits[tokenId].isListedForSale, "NFT is not for sale");
        require(msg.value == carbonCredits[tokenId].price, "Incorrect price sent");
        
        address seller = ownerOf(tokenId);
        payable(seller).transfer(msg.value);
        
        _transfer(seller, msg.sender, tokenId);
        carbonCredits[tokenId].isListedForSale = false;
        carbonCredits[tokenId].price = 0;
        carbonCredits[tokenId].owner = msg.sender;
        
        balanceOfNFTs[seller] -= 1;
        balanceOfNFTs[msg.sender] += 1;
        
        emit NFTPurchased(tokenId, msg.sender, msg.value);
    }

    function getNFTDetails(uint256 tokenId) public view returns (CarbonCredit memory) {
        return carbonCredits[tokenId];
    }
}
