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
import { fetchContent } from "../../lib/firebase";

const ReplayList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectVideo, setSelectVideo] = useState(null);
  const [videoListData, setVideoListData] = useState<Array<any> | null>(null);
  const [speakerList, setSpeakerList] = useState<Array<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState<any>();
  const toast = useToast();

  const showVideo = (video: any) => {
    setSelectVideo(video);
    onOpen();
  };

  const getAllSpeakers = async () => {
    // await API.get("/speakers")
    //   .then((response) => {
    //     setSpeakerList(response.data.msg);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     toast({
    //       description: err.response.data.msg || "Error fetching speaker details",
    //       status: "error",
    //       duration: 2000,
    //       isClosable: true,
    //     });
    //   });
  };

  const fetchAllItem = async () => {
    setIsLoading(true);
    fetchContent()
      .then((snapshot) => {
        const list = [];
        for (let docs of snapshot.docs) {
          if (docs.exists()) list.push(docs.data());
        }

        setVideoListData(list);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          description: err.response.data.msg || "Error fetching Video list",
          status: "error",
          duration: 2000,
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
        name={video ? video.name : ""}
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
              color="black"
            >
              REPLAY PODCASTS
            </Text>
            {isLoading ? (
              <Spinner color="customGray" m="0 auto" mt="md" />
            ) : videoListData ? (
              videoListData.length > 0 ? (
                videoListData.map((e, i) => {
                  const videoCount = videoListData.filter(
                    (video) => video.category === "podcast"
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
                  if (e.category !== "podcast") return;

                  return (
                    <Flex
                      align="center"
                      justify="flex-start"
                      key={i}
                      mb="xs"
                      boxShadow="md"
                      bgColor="#eee"
                      borderRadius={5}
                      cursor="pointer"
                      onClick={() => {
                        showVideo(e);
                        setVideo(e);
                      }}
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
          {/* <Flex
            w={["100%", "100%", "30%", "30%"]}
            flexDir="column"
            mt={["sm", "sm", 0, 0]}
          >
            <Text
              textTransform="uppercase"
              fontSize={22}
              fontWeight={500}
              color="black"
            >
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
          </Flex> */}
        </Flex>
        <Text
          my="sm"
          textTransform="uppercase"
          fontSize={22}
          fontWeight={500}
          color="black"
        >
          REPLAY AMA
        </Text>
        <Flex w={["100%", "100%", "60%", "60%"]} flexDir="column">
          {videoListData ? (
            videoListData.length > 0 ? (
              videoListData.map((e, i) => {
                const videoCount = videoListData.filter(
                  (video) => video.category === "ama"
                );
                if (videoCount.length === 0 && i === videoListData.length - 1)
                  return (
                    <Text
                      fontSize={[16, 16, 22, 22]}
                      textAlign="center"
                      fontWeight={400}
                      mt="md"
                      key={i}
                      color="black"
                    >
                      List is empty
                    </Text>
                  );
                if (e.category !== "ama") return;

                return (
                  <Flex
                    align="center"
                    justify="flex-start"
                    key={i}
                    mb="xs"
                    boxShadow="md"
                    bgColor="#eee"
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
        <Text
          my="sm"
          textTransform="uppercase"
          fontSize={22}
          fontWeight={500}
          color="black"
        >
          VALUE
        </Text>
        <Flex w={["100%", "100%", "60%", "60%"]} flexDir="column">
          {videoListData ? (
            videoListData.length > 0 ? (
              videoListData.map((e, i) => {
                const videoCount = videoListData.filter(
                  (video) => video.category === "value"
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
                if (e.type !== "value") return;

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
