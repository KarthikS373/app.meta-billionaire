import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import Layout from "../components/Layout/Layout";
import UserProfile from "../components/Profile/Profile";
import api from "../lib/api";
import contractABI from "../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";

const Profile = () => {
  const [userProducts, setUserProducts] = useState([]);
  // 0x4eb1c0bdb7f6bec8346db6593b32ef588fda5bff -> MBUC 1
  // 0x5828c6fA3F0432531BbC79f683272eA1F44488e4 --> NFT
  // const address = "0xc8C247c212722A02170970dB97226dE6bbd37c7D";
  // const address = "0xeec2c5a427d38cec72fe2f1cf64b42dd7de60961";
  // const address = "0x4b120516ec475d651b759bb9d7ee4fb7d2b811a4"; -> owns mb nft
  // const address = "0x7d6475d5961e894112737309a93dc2e3ab96beab"; -> owns mb nft and otehrs

  const address = "0x7d6475d5961e894112737309a93dc2e3ab96beab";
  useEffect(() => {
    const fetchUserData = async () => {
      const collectionData = await axios.get(
        `https://api.opensea.io/api/v1/collections?format=json&limit=300&asset_owner=${address}`
      );
      console.log(collectionData);
      const filteredData = collectionData.data.filter((nft: any) => {
        return (
          nft.name.toUpperCase().includes("METABILLIONAIRE") ||
          nft.description.toUpperCase().includes("METABILLIONAIRE")
        );
      });
      setUserProducts(filteredData);
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <UserProfile userId={address} products={userProducts} />
    </Layout>
  );
};

export default Profile;
