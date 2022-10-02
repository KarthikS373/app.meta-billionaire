import React, { useState, useEffect } from "react";
import { Flex, Input, Text, Button, Spinner, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import AdminContent from "../components/AdminContent/AdminContent";
import API from "../lib/api";

const Admin = () => {
  const [videoListData, setVideoListData] = useState(null);
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const toast = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const loginSubmit = async () => {
    await API.post("/login", {
      userMail,
      userPassword,
      token,
    })
      .then((response) => {
        setAdmin(true);
        fetchAllItem();
        setIsLoading(false);
        toast({
          description: response.data.msg || "Connection successfully completed",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          description: err.response.data.msg || "This account does not exist",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const fetchAllItem = async () => {
    setIsLoading(true);
    await API.get("/item")
      .then((response) => {
        setVideoListData(response.data.msg);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          description:
            err.response.data.msg ||
            "An error occured, please try again later...",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (token) {
      loginSubmit();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!executeRecaptcha) {
      return;
    }
    const result = await executeRecaptcha("login");
    if (result) {
      setToken(result);
    } else {
      setIsLoading(false);
      toast({
        description:
          "An error occured with the robots verification, please try again...",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout showFooter isAdmin>
      <Flex
        align="center"
        justify="center"
        w="100%"
        alignItems="stretch"
        flex={1}
        textAlign="center"
      >
        {isAdmin ? (
          <AdminContent
            userPassword={userPassword}
            videoListData={videoListData}
            fetchAllItem={fetchAllItem}
          />
        ) : isLoading ? (
          <Spinner color="customGray" m="0 auto" mt="md" />
        ) : (
          <form onSubmit={handleSubmit}>
            <Text
              fontSize={[25, 25, 30, 30]}
              letterSpacing={2}
              fontWeight={600}
              mt={["sm", "sm", 0, 0]}
            >
              LOGIN
            </Text>
            <Flex align="center" justify="center" flexDir="column">
              <Input
                value={userMail}
                type="email"
                onChange={(e) => setUserMail(e.target.value)}
                placeholder="Mail..."
                fontSize={15}
                letterSpacing={2}
                fontWeight={600}
                w="100%"
                mt="md"
                required
              />
              <Input
                value={userPassword}
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password..."
                fontSize={15}
                letterSpacing={2}
                fontWeight={600}
                w="100%"
                mt="md"
                required
              />
              <Button
                colorScheme="customGray"
                fontSize={15}
                fontWeight={300}
                mt="md"
                type="submit"
              >
                Login
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </Layout>
  );
};

export default Admin;
