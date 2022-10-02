import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Spacer,
  useDisclosure,
  Box,
  useToast,
  Spinner,
  Image,
} from "@chakra-ui/react";
import Intervenant from "../Intervenant/Intervenant";
import VideoModal from "../VideoModal/VideoModal";
import API from "../../lib/api";

const ReplayList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectVideo, setSelectVideo] = useState(null);
  const [videoListData, setVideoListData] = useState(null);
  const [speakerList, setSpeakerList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const showVideo = (video) => {
    setSelectVideo(video);
    onOpen();
  };

  const getAllSpeakers = async () => {
    await API.get("/speakers")
      .then((response) => {
        setSpeakerList(response.data.msg);
        setIsLoading(false);
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
    fetchAllItem();
    getAllSpeakers();
  }, []);

  return (
    <>
      <VideoModal
        isOpen={isOpen}
        onClose={onClose}
        selectVideo={selectVideo}
        speakerList={speakerList}
      />
      <Flex
        align="flex-start"
        justify="center"
        my="sm"
        w="100%"
        flexDir="column"
        px={["sm", "sm", "lg", "lg"]}
        py="sm"
      >
        <Flex w="100%" flexDir={["column", "column", "row", "row"]}>
          <Flex w={["100%", "100%", "60%", "60%"]} flexDir="column">
            <Text
              textTransform="uppercase"
              mb="sm"
              fontSize={22}
              fontWeight={500}
            >
              REPLAY PODCASTS
            </Text>
            {isLoading ? (
              <Spinner color="customGray" m="0 auto" mt="md" />
            ) : videoListData ? (
              videoListData.length > 0 ? (
                videoListData.map((e, i) => {
                  const videoCount = videoListData.filter(
                    (video) => video.type === "Podcast"
                  );
                  if (videoCount.length === 0 && i === videoListData.length - 1)
                    return (
                      <Text
                        fontSize={[16, 16, 22, 22]}
                        textAlign="center"
                        fontWeight={400}
                        mt="md"
                        key={i}
                      >
                        List is empty
                      </Text>
                    );
                  if (e.type !== "Podcast") return;

                  return (
                    <Flex
                      align="center"
                      justify="flex-start"
                      key={i}
                      mb="xs"
                      boxShadow="md"
                      bgColor="#1d1d1d"
                      borderRadius={5}
                      cursor="pointer"
                      onClick={() => showVideo(e)}
                      _hover={{
                        transform: "scale(1.02)",
                      }}
                      transition="transform ease 0.5s"
                    >
                      <Box w={[150, 150, 200, 200]}>
                        <Image
                          src={e.image}
                          alt={e.name}
                          width={200}
                          height={100}
                          className="rounded-img"
                        />
                      </Box>

                      <Text
                        ml={["xs", "xs", "sm", "sm"]}
                        fontSize={[16, 16, 22, 22]}
                        fontWeight={400}
                      >
                        {e.name}
                      </Text>
                    </Flex>
                  );
                })
              ) : (
                <Text
                  fontSize={[16, 16, 22, 22]}
                  textAlign="center"
                  fontWeight={400}
                  mt="md"
                >
                  List is empty
                </Text>
              )
            ) : (
              <Spinner color="customGray" m="0 auto" mt="md" />
            )}
          </Flex>
          <Spacer />
          <Flex
            w={["100%", "100%", "30%", "30%"]}
            flexDir="column"
            mt={["sm", "sm", 0, 0]}
          >
            <Text textTransform="uppercase" fontSize={22} fontWeight={500}>
              Speakers
            </Text>

            {speakerList ? (
              speakerList.length > 0 ? (
                speakerList.map((e, i) => {
                  return (
                    <Intervenant
                      key={i}
                      name={e.name}
                      image={e.image}
                      job={e.job}
                      isModal={false}
                    />
                  );
                })
              ) : (
                <Text fontSize={22} fontWeight={500}>
                  List is empty
                </Text>
              )
            ) : (
              <Spinner color="customGray" m="0 auto" mt="md" />
            )}
          </Flex>
        </Flex>
        <Text my="sm" textTransform="uppercase" fontSize={22} fontWeight={500}>
          REPLAY AMA
        </Text>
        <Flex w={["100%", "100%", "60%", "60%"]} flexDir="column">
          {videoListData ? (
            videoListData.length > 0 ? (
              videoListData.map((e, i) => {
                const videoCount = videoListData.filter(
                  (video) => video.type === "AMA"
                );
                if (videoCount.length === 0 && i === videoListData.length - 1)
                  return (
                    <Text
                      fontSize={[16, 16, 22, 22]}
                      textAlign="center"
                      fontWeight={400}
                      mt="md"
                      key={i}
                    >
                      List is empty
                    </Text>
                  );
                if (e.type !== "AMA") return;

                return (
                  <Flex
                    align="center"
                    justify="flex-start"
                    key={i}
                    mb="xs"
                    boxShadow="md"
                    bgColor="#1d1d1d"
                    borderRadius={5}
                    cursor="pointer"
                    onClick={() => showVideo(e)}
                    _hover={{
                      transform: "scale(1.02)",
                    }}
                    transition="transform ease 0.5s"
                  >
                    <Box w={[150, 150, 200, 200]}>
                      <Image
                        src={e.image}
                        alt={e.name}
                        width={200}
                        height={100}
                        className="rounded-img"
                      />
                    </Box>

                    <Text
                      ml={["xs", "xs", "sm", "sm"]}
                      fontSize={[16, 16, 22, 22]}
                      fontWeight={400}
                    >
                      {e.name}
                    </Text>
                  </Flex>
                );
              })
            ) : (
              <Text
                fontSize={[16, 16, 22, 22]}
                textAlign="center"
                fontWeight={400}
                mt="md"
              >
                List is empty
              </Text>
            )
          ) : (
            <Spinner color="customGray" m="0 auto" mt="md" />
          )}
        </Flex>
        <Text my="sm" textTransform="uppercase" fontSize={22} fontWeight={500}>
          VALUE
        </Text>
        <Flex w={["100%", "100%", "60%", "60%"]} flexDir="column">
          {videoListData ? (
            videoListData.length > 0 ? (
              videoListData.map((e, i) => {
                const videoCount = videoListData.filter(
                  (video) => video.type === "Value"
                );
                if (videoCount.length === 0 && i === videoListData.length - 1)
                  return (
                    <Text
                      fontSize={[16, 16, 22, 22]}
                      textAlign="center"
                      fontWeight={400}
                      mt="md"
                      key={i}
                    >
                      List is empty
                    </Text>
                  );
                if (e.type !== "Value") return;

                return (
                  <Flex
                    align="center"
                    justify="flex-start"
                    key={i}
                    mb="xs"
                    boxShadow="md"
                    bgColor="#1d1d1d"
                    borderRadius={5}
                    cursor="pointer"
                    onClick={() => showVideo(e)}
                    _hover={{
                      transform: "scale(1.02)",
                    }}
                    transition="transform ease 0.5s"
                  >
                    <Box w={[150, 150, 200, 200]}>
                      <Image
                        src={e.image}
                        alt={e.name}
                        width={200}
                        height={100}
                        className="rounded-img"
                      />
                    </Box>

                    <Text
                      ml={["xs", "xs", "sm", "sm"]}
                      fontSize={[16, 16, 22, 22]}
                      fontWeight={400}
                    >
                      {e.name}
                    </Text>
                  </Flex>
                );
              })
            ) : (
              <Text
                fontSize={[16, 16, 22, 22]}
                textAlign="center"
                fontWeight={400}
                mt="md"
              >
                List is empty
              </Text>
            )
          ) : (
            <Spinner color="customGray" m="0 auto" mt="md" />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ReplayList;
