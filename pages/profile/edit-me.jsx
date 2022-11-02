import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  createIcon,
  Input,
  Flex,
} from "@chakra-ui/react";

import Layout from "../../components/Layout/Layout";
import { Router, useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");

  return (
    <Layout>
      <Container maxW={"3xl"}>
        
      </Container>
    </Layout>
  );
};

export default Profile;
