import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import Layout from "../components/Layout/Layout";
import UserProfile from "../components/Profile/Profile";
import api from "../lib/api";
import contractABI from "../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";
import useEthersProvider from "../hooks/useEthersProvider";

const Profile = () => {
  const [userProducts, setUserProducts] = useState([]);
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://eth-mainnet.g.alchemy.com/v2/VGmVyseB5Y9eoTVBCz4ml6ueKEcJeKc8"
  // );

  // 0x4eb1c0bdb7f6bec8346db6593b32ef588fda5bff -> MBUC 1
  // 0x4b120516ec475d651b759bb9d7ee4fb7d2b811a4 -> MBUC 2
  // 0x5828c6fA3F0432531BbC79f683272eA1F44488e4 --> NFT
  // const address = "0xc8C247c212722A02170970dB97226dE6bbd37c7D";
  // const address = "0xeec2c5a427d38cec72fe2f1cf64b42dd7de60961";
  // const address = "0x7d6475d5961e894112737309a93dc2e3ab96beab"; -> owns mb nft and otehrs
  // const address = "0x79a6eCA6d927D5B98abA1977CD83f3443591b4AD"; -> owns MBU NFT
  // const address = "0x8a4800a822819ED4080fC8A5bc272d0D4f6D2840"; -> owns MBU NFT
  // const address = "0x66587C5689F12a46eD1db1898a9B96f5C50F0417"; -> owns many MBU NFT

  //~ https://etherscan.io/token/0xc6c817cd60e17fed0af2a759624e02dd6c812e64?a=0x4B120516eC475d651B759bB9D7Ee4fb7d2b811A4#readContract
  //~ https://etherscan.io/token/0xc6c817cd60e17fed0af2a759624e02dd6c812e64?a=0x4eB1C0BDb7F6bec8346db6593b32Ef588fda5BFF#readContract

  const address = "0x66587c5689f12a46ed1db1898a9b96f5c50f0417";
  useEffect(() => {
    const fetchUserData = async () => {
      //   const collectionData = await axios.get(
      //     `https://api.opensea.io/api/v1/collections?format=json&limit=300&asset_owner=${address}`
      //   );
      //   console.log(collectionData);
      //   const filteredData = collectionData.data.filter((nft: any) => {
      //     return (
      //       nft.name.toUpperCase().includes("METABILLIONAIRE") ||
      //       nft.description.toUpperCase().includes("METABILLIONAIRE")
      //     );
      //   });
      //   console.log(filteredData);
      //   setUserProducts(filteredData);
      axios
        .request({
          method: "GET",
          url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
          params: { chain: "eth", format: "decimal" },
          headers: { accept: "application/json", "X-API-Key": "test" },
        })
        .then(async (response) => {
          let filteredData = response.data.result.filter((nft: any) => {
            if (nft.name == null) {
              const metadata = JSON.parse(nft.metadata);
              return metadata["name"].toLowerCase().includes("metabillionaire");
            }

            return nft.name?.includes("MetaBillionaire") || nft.symbol == "MB";
          });

          const promises = filteredData.map(async (nft: any) => {
            let meta;

            if (nft.token_uri) {
              meta = await fetch(
                `https://ipfs.io/ipfs/${
                  nft.token_uri.split("https://ipfs.moralis.io:2053/ipfs/")[1]
                }`
              )
                .then((responseData) => responseData.json())
                .catch((err) => console.log(err));

              if (meta.image.startsWith("ipfs://"))
                meta.image = `https://ipfs.io/ipfs/${
                  meta.image.split("ipfs://")[1]
                }`;
              // console.log(meta!.image);
            }
            return {
              dna: meta.dna,
              name: nft.token_id,
              image: meta.image,
            };
          });

          const originalData = await Promise.all(promises);

          // @ts-ignore
          setUserProducts(originalData);
        })
        .catch((error) => {
          console.error(error);
        });
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
