import {
  Container,
  Box,
  Grid,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import Card from "./CourseCard";
import Category from "./Category";
import VideoModal from "../VideoModal/VideoModal";

import courses from "../../data/courses.data";

interface Category {
  title: string;
  desc: string;
  banner: string;
  btnText: string;
  onClick: (...args: any) => void | null;
}

const CourseHome = ({ category, data }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryBanner, setCategoryBanner] = useState<Category>({
    title: "",
    desc: "",
    banner: "",
    btnText: "",
    onClick: () => {},
  });

  const [video, setVideo] = useState({
    src: "",
    name: "",
  });

  useEffect(() => {
    const d = courses.categories.filter((item) => item.slug === category);
    if (d[0])
      setCategoryBanner({
        banner: d[0].banner,
        desc: d[0].description,
        title: d[0].name,
        btnText: d[0].btnText,
        onClick: d[0].onClick,
      });
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
      <Container maxW="7xl" px={{ base: 5, md: 8 }} py={16} mx="auto">
        <SimpleGrid columns={[1, 1, 4, 3]} spacing={6}>
          <Box>
            <Category
              title={categoryBanner.title}
              description={categoryBanner.desc}
              banner={categoryBanner.banner}
              btnText={categoryBanner.btnText}
              btnClick={categoryBanner.onClick || null}
            />
          </Box>
          <Box
            borderRadius="md"
            className="rounded shadow-sm space-y-8 px-2 col-span-2"
          >
            {data.map((course: any, index: number) => (
              <Card
                key={course.id}
                type={course.type}
                title={course.title}
                handleClick={setPlayer}
                link={course.link}
                duration={course.duration}
              />
            ))}
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default CourseHome;

//       "id": 3,
//       "order": 4,
//       "title": "test",
//       "link": "https://firebasestorage.googleapis.com/v0/b/metabillionaire-test.appspot.com/o/course%2Fforex%2Ftest.markdown?alt=media&token=1765353d-9e76-42fc-a2c5-1631798abe17",
//       "active": true,
//       "type": "pdf",
//       "category": "forex",
//       "description": "test",
//       "duration": "test"
