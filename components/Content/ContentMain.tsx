import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Flex,
  Slider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import axios from "axios";

import courses from "../../data/courses.json";

import RowsCourse from "./RowsCourse";
import RowContent from "./RowsContent";
import VideoModal from "../VideoModal/VideoModal";

const ContentMain = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [video, setVideo] = useState({
    src: "",
    name: "",
  });

  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    axios
      .get(`api/getAllContent`)
      .then((res) => {
        console.log(res);
        setPodcast(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const setPlayer = (name: string, src: string) => {
    console.log(name, src);
    setVideo({
      src: src,
      name: name,
    });
    onOpen();
  };

  return (
    <>
      <VideoModal
        isOpen={isOpen}
        onClose={onClose}
        selectVideo={video.src}
        name={video ? video.name : ""}
      />
      <Box w={"full"} className="pt-12">
        <RowsCourse
          data={courses.categories}
          popupText="Number of lessons"
          title={"Courses"}
        />
        <RowContent
          setPlayer={setPlayer}
          data={podcast}
          title={"podcast"}
          category={"podcast"}
        />
      </Box>
    </>
  );
};

export default ContentMain;
