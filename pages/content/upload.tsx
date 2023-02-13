import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { User } from "firebase/auth";

import Layout from "../../components/Layout/Layout";
import AdminContent from "../../components/AdminContent/ContentUploadAdminContent";
import API from "../../lib/api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { checkAdmin, fetchContent } from "../../lib/firebase";

const ContentUploadPage = () => {
  const [videoListData, setVideoListData] = useState<any | null>(null);
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState<User | undefined>();
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
        setIsAdmin(true);
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
    fetchContent()
      .then((snapshot) => {
        console.clear();
        const list = [];
        for (let docs of snapshot.docs) {
          if (docs.exists()) list.push(docs.data());
        }

        setVideoListData(list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.clear();
        console.log(err);
      });
    // await API.get("/item")
    //   .then((response) => {
    //     setVideoListData(response.data.msg);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     toast({
    //       description:
    //         err.response.data.msg ||
    //         "An error occured, please try again later...",
    //       status: "error",
    //       duration: 4000,
    //       isClosable: true,
    //     });
    //   });
  };

  useEffect(() => {
    fetchAllItem();
  }, []);

  useEffect(() => {
    const uid = window.localStorage.getItem("uid");
    const exp = window.localStorage.getItem("uid-exp");

    if (uid) {
      if (Date.now() < Number(exp)) {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      loginSubmit();
    }
  }, [token]);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      checkAdmin(userMail, userPassword)
        .then((res) => {
          if (res.user) {
            window.localStorage.setItem("uid", res.user.uid);
            window.localStorage.setItem(
              "uid-exp",
              (Date.now() + 60 * 60 * 1000).toString()
            );
            setAdmin(res.user);
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.warn(error);
          toast({
            description: "Wrong Credentials",
            status: "error",
            duration: 1200,
            isClosable: true,
          });
        });
    },
    [userMail, userPassword]
  );

  return (
    <Layout showFooter isAdmin>
      <Flex
        align="center"
        justify="center"
        w="100%"
        h={"100%"}
        alignItems="center"
        flex={1}
        textAlign="center"
      >
        {isAdmin ? (
          <AdminContent user={admin} videoListData={videoListData} />
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

export default ContentUploadPage;
