import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import Layout from "../../components/Layout/Layout";
import UserProfile from "../../components/Profile/Profile";
import useEthersProvider from "../../hooks/useEthersProvider";

import StakingContract from "../../utils/ABIs/Staking";
import ERC721Contract from "../../utils/ABIs/ERC721";
import HoldingsContract from "../../utils/ABIs/Holdings";
import ClaimContract from "../../utils/ABIs/Claim";

const Post = () => {
  const router = useRouter();
  const { provider: walletProvider } = useEthersProvider();

  const [provider, setProvider] = useState();
  const [userProducts, setUserProducts] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [holdings, setHoldings] = useState("0");
  const [claims, setClaims] = useState("0");

  const polygonProvider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_POLYGON_API_KEY
  );

  useEffect(() => {
    const web3 = walletProvider;
    if (!web3)
      if (window && window.ethereum) {
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        // @ts-ignore
        setProvider(web3);
      }

    if (!web3) {
      setProvider(
        // @ts-ignore
        new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_INFURA_MAIN_NET
        )
      );
    }
  }, [walletProvider]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (provider && router.query.address) {
        try {
          const ERC721 = new ethers.Contract(
            ERC721Contract.address,
            ERC721Contract.abi,
            provider
          );

          let walletAddress = router.query.address;
          let balance = (await ERC721.balanceOf(walletAddress)).toString();

          let nfts: any = [];
          let tokens = [];

          for (let i = 0; i < balance; i++) {
            tokens.push(
              (await ERC721.tokenOfOwnerByIndex(walletAddress, i)).toString()
            );
          }

          for (let i = 0; i < tokens.length; i++) {
            const ipfs = await ERC721.tokenURI(tokens[i]);

            const meta = await fetch(
              `https://ipfs.io/ipfs/${ipfs.split("ipfs://")[1]}`
            )
              .then((response) => response.json())
              .catch((err) => {
                throw new Error(err.message);
              });

            if (meta.image.startsWith("ipfs://")) {
              const image = `https://ipfs.io/ipfs/${
                meta.image.split("ipfs://")[1]
              }`;

              nfts.push({
                dna: i,
                name: tokens[i],
                image: image || "",
              });
            }
          }
          setUserProducts(nfts);
        } catch (e) {
          console.log(e);
        }
      }
    };

    // fetchUserData();
  }, [provider, router.query.address]);

  useEffect(() => {
    const fetchHoldingsData = async () => {
      if (router.query.address) {
        const holdingContract = new ethers.Contract(
          HoldingsContract.address,
          HoldingsContract.abi,
          polygonProvider
        );

        const claimingContract = new ethers.Contract(
          ClaimContract.address,
          ClaimContract.abi,
          polygonProvider
        );

        try {
          const holding = (
            await holdingContract.balanceOf(router.query.address)
          ).toString();
          console.log();
          setHoldings((holding / 10 ** 18).toFixed(2));
        } catch (e) {
          console.log(e);
        }

        try {
          const claiming = (
            await claimingContract.claimableAmounts(router.query.address)
          ).toString();
          setClaims((claiming / 10 ** 18).toFixed(2));
        } catch (e) {
          console.log(e);
        }
      }
    };

    fetchHoldingsData();
  }, [polygonProvider, router.query.address]);

  useEffect(() => {
    let walletAddress = router.query.address;
    const FetchStakingData = async () => {
      const stakingContract = new ethers.Contract(
        StakingContract.address,
        StakingContract.abi,
        provider
      );
      const tokens = [];

      try {
        let amount = (
          await stakingContract.depositedTokenAmounts(walletAddress)
        ).toString();

        console.log(amount);

        setStakeAmount(amount);

        for (let i = 0; i < amount; ++i) {
          const stakedNft = (
            await stakingContract.depositedTokenIds(walletAddress, i)
          ).toString();
          tokens.push(stakedNft);
        }
      } catch (e) {
        console.log(e);
      }

      // Fetching staked NFTs
      try {
        const ERC721 = new ethers.Contract(
          ERC721Contract.address,
          ERC721Contract.abi,
          provider
        );

        let nfts: any = [];

        for (let i = 0; i < tokens.length; i++) {
          const ipfs = await ERC721.tokenURI(tokens[i]);

          const meta = await fetch(
            `https://ipfs.io/ipfs/${ipfs.split("ipfs://")[1]}`
          )
            .then((response) => response.json())
            .catch((err) => {
              console.log(err);
              throw new Error(err.message);
            });

          console.log(meta);
          if (meta.image.startsWith("ipfs://")) {
            const image = `https://ipfs.io/ipfs/${
              meta.image.split("ipfs://")[1]
            }`;

            nfts.push({
              dna: meta.dna,
              name: meta.name.split(" ")[1],
              image: image,
            });
          }
          setStakedNfts(nfts);
        }
      } catch (e) {
        console.log(e);
      }
    };

    // FetchStakingData();
  }, [provider, router.query.address]);

  return (
    <Layout>
      <UserProfile
        userId={router.query.address?.toString()}
        // @ts-ignore
        products={userProducts}
        holding={holdings}
        balance={stakeAmount}
        stakedNfts={stakedNfts}
        claims={claims}
      />
    </Layout>
  );
};

export default Post;
