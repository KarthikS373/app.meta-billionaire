import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import Layout from "../../components/Layout/Layout";
import UserProfile from "../../components/Profile/UserProfile";
import useEthersProvider from "../../hooks/useEthersProvider";

import StakingContract from "../../utils/ABIs/Staking";
import ERC721Contract from "../../utils/ABIs/ERC721";
import HoldingsContract from "../../utils/ABIs/Holdings";
import ClaimContract from "../../utils/ABIs/Claim";
import { Flex, Text, useToast } from "@chakra-ui/react";

const Post = () => {
  const router = useRouter();
  const [renderFlag, setRenderFlag] = useState(true);

  const {
    provider: walletProvider,
    chainId,
    address: connectedAddress,
  } = useEthersProvider();
  const toast = useToast();

  const [provider, setProvider] = useState();
  const [polygonProvider, setpolygonProvider] = useState<any>();

  const [userProducts, setUserProducts] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [holdings, setHoldings] = useState("0");
  const [claims, setClaims] = useState("0");
  const [nickname, setNickname] = useState("");
  const [visitor, setVisitor] = useState(false);

  const [haveNFT, setHaveNFT] = useState(true);
  const [haveStakedNFT, setHaveStakedNFT] = useState(true);

  useEffect(() => {
    let flag = false;
    if (connectedAddress) {
      flag = true;
    }
    if (router.query.address) {
      if (!ethers.utils.isAddress(router.query.address.toString())) {
        flag = false;
        toast({
          description: "Please query a valid address",
          duration: 2000,
          isClosable: true,
          status: "error",
        });
        
        router.push('/');

      }
    }

    setRenderFlag(flag);
  }, [connectedAddress, router, router.query.address, toast]);

  useEffect(() => {
    if (router.query.address != connectedAddress) {
      setVisitor(true);
    }
  }, [connectedAddress, router.query.address]);

  const fetchHoldingsData = async () => {
    if (router.query.address) {
      const holdingContract = new ethers.Contract(
        HoldingsContract.address,
        HoldingsContract.abi,
        polygonProvider
      );
      try {
        const holding = (
          await holdingContract.balanceOf(router.query.address)
        ).toString();
        if (holdings == "0") {
          setHoldings("0.00");
          console.log("You dont have any claimable");
          return;
        }
        setHoldings((holding / 10 ** 18).toFixed(2));
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
  };

  useEffect(() => {
    setpolygonProvider(
      new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_POLYGON_API_KEY
      )
    );
  }, []);

  useEffect(() => {
    if (renderFlag)
      if (router.query && router.query.address) {
        axios
          .get(
            `https://app.metabillionaire.com/api/fetchNickname?address=${router.query.address}`
          )
          .then((res) => {
            if (res && res.data && res.data.data && res.data.data[0]) {
              if (res.data.data[0].mbucBalance) {
                setHoldings(
                  Number.parseFloat(res.data.data[0].mbucBalance).toFixed(2)
                );
              } else {
                fetchHoldingsData();
              }

              if (res.data.data[0].name) {
                setNickname(res.data.data[0].name);
              } else {
                setNickname("Guest");
              }
            } else {
              setNickname("Guest");
              setHoldings("0.00");
            }
          })
          .catch((e) => {
            setHoldings("0.00");
            setNickname("Guest");
            toast({
              description: "An error occured",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            console.log("error fetching user data");
          });
      }
  }, [router.query.address, renderFlag]);

  useEffect(() => {
    let web3;
    // if (chainId == 1) {
    //   web3 = walletProvider;
    //   if (!web3)
    //     if (window && window.ethereum) {
    //       const web3 = new ethers.providers.Web3Provider(window.ethereum);
    //       // @ts-ignore
    //       setProvider(web3);
    //     }
    // }

    if (!web3) {
      setProvider(
        // @ts-ignore
        new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_INFURA_MAIN_NET
        )
      );
    }
  }, [chainId, walletProvider]);

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

          if (balance == "0") {
            return setHaveNFT(false);
          }

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

    if (renderFlag) fetchUserData();
  }, [provider, renderFlag, router.query.address]);

  useEffect(() => {
    const fetchClaimingsData = async () => {
      if (router.query.address) {
        const claimingContract = new ethers.Contract(
          ClaimContract.address,
          ClaimContract.abi,
          polygonProvider
        );

        try {
          const claiming = (
            await claimingContract.claimableAmounts(router.query.address)
          ).toString();
          setClaims((claiming / 10 ** 18).toFixed(2).toString());
        } catch (e) {
          console.log(e);
        }
      }
    };

    if (renderFlag) fetchClaimingsData();
  }, [holdings, polygonProvider, renderFlag, router.query.address]);

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

        if (amount == "0") {
          setStakeAmount(0);
          return setHaveStakedNFT(false);
        }
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

    if (renderFlag) FetchStakingData();
  }, [renderFlag, provider, router.query.address]);

  if (!connectedAddress) {
    return (
      <Layout>
        <Flex align="center" justify="center">
          <Text fontSize={25} color="customBlue.500">
            Connect your wallet
            <br /> to access this page
          </Text>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <UserProfile
        userId={router.query.address?.toString()}
        username={nickname}
        // @ts-ignore
        products={userProducts}
        holding={holdings}
        balance={stakeAmount}
        stakedNfts={stakedNfts}
        claims={claims}
        haveNFT={haveNFT}
        haveStaked={haveStakedNFT}
        visitor={visitor}
      />
    </Layout>
  );
};

export default Post;
