import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import Layout from "../components/Layout/Layout";
import UserProfile from "../components/Profile/Profile";
import api from "../lib/api";
import contractABI from "../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";

import useEthersProvider from "../hooks/useEthersProvider";

const Profile = () => {
  // 0x4eb1c0bdb7f6bec8346db6593b32ef588fda5bff -> MBUC 1
  // 0x5828c6fA3F0432531BbC79f683272eA1F44488e4 --> NFT
  const [userProducts, setUserProducts] = useState([]);

  const { provider } = useEthersProvider();
  const contract = new ethers.Contract(
    "0x5828c6fA3F0432531BbC79f683272eA1F44488e4",
    contractABI.abi,
    provider
  );

  const getUserOwnedProducts = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_POLYGON_API_KEY
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
      contractABI.abi,
      provider
    );
    try {
      const products = await contract.getUserOwnedProducts(
        "0xc8C247c212722A02170970dB97226dE6bbd37c7D"
      );
      console.log(products.toString());
      setUserProducts(products);
    } catch (err) {
      console.log("error when fetching store content on contract");
      console.log(err);
    }
  };

  useEffect(() => {
    getUserOwnedProducts();
  });

  const [nftData, setNftData] = useState([]);
  // const address = "0xc8C247c212722A02170970dB97226dE6bbd37c7D";
  // const address = "0xeec2c5a427d38cec72fe2f1cf64b42dd7de60961";
  // useEffect(() => {
  //   (async () => {
  //     const collectionData = await axios.get(
  //       `https://api.opensea.io/api/v1/collections?format=json&limit=300&asset_owner=${address}`,
  //       {
  //         headers: {
  //           //@ts-ignore
  //           //! "X-API-KEY": process.env.OPENSEA_KEY,
  //         },
  //       }
  //     );
  //     console.log(collectionData);
  //     return collectionData;
  //   })()
  //     // @ts-ignore
  //     .then((_collectionData) => {
  //       setNftData(_collectionData.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Layout>
      <UserProfile nftData={nftData} products={userProducts} />
    </Layout>
  );
};

export default Profile;
