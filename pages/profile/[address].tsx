import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../components/Layout/Layout";
import UserProfile from "../../components/Profile/Profile";

const Post = () => {
  const router = useRouter();
  const { address } = router.query;

  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
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
              console.log(meta!.image);
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
  }, [address]);

  return (
    <Layout>
      <UserProfile userId={address?.toString()} products={userProducts} />
    </Layout>
  );
};

export default Post;
