import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { SnapshotOptions } from "firebase/firestore";
import Select from "react-select";
import React, { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout";
import NetworkCard from "../components/Network/NetworkCards";
import { getAllTags, getByNetworkTag } from "../lib/firebase";
import { AddressString } from "@coinbase/wallet-sdk/dist/types";
import TempNetworkCard from "../components/Network/TempNetworkCard";

interface Tags {
  value: string | undefined;
  label: string | undefined;
}

const Network = () => {
  const [search, setSearch] = useState<Array<Tags | undefined>>([]);
  const [currentSearch, setCurrentSearch] = useState<string | null | undefined>(
    null
  );
  const [networkUsers, setNetworkUsers] = useState<
    Array<string | undefined>
  >([]);

  useEffect(() => {
    getAllTags()
      .then((res) => {
        const _tempSearchable: Array<Tags | undefined> = [];

        res.forEach((item) => {
          _tempSearchable.push({
            value: item,
            label: item,
          });
        });

        setTimeout(() => {
          setSearch(_tempSearchable);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (currentSearch) {
      console.log(currentSearch);
      getByNetworkTag(currentSearch)
        .then((res) => {
          console.log(res);
          if (res) setNetworkUsers(res!);
          else setNetworkUsers([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentSearch]);

  return (
    <Layout>
      <Flex
        w={"100vw"}
        minH={"80vh"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        flexDir={"column"}
      >
        {search && search.length > 0 && (
          <Box w={["90vw", null, "65vw"]}>
            <Select
              options={search}
              onChange={(val) => {
                setCurrentSearch(val?.label);
              }}
            />
          </Box>
        )}
        <Grid
          w={["90vw", null, "65vw"]}
          gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
          mt={5}
          gap={3}
          flexWrap={"wrap"}
        >
          {networkUsers &&
            networkUsers.map((user, index) => {
              return (
                <TempNetworkCard
                  key={(user && user.toString()) || index}
                  address={
                    (user && (user.toString() as AddressString)) ||
                    ("" as AddressString)
                  }
                />
              );
            })}
        </Grid>
      </Flex>
    </Layout>
  );
};

export default React.memo(Network);
