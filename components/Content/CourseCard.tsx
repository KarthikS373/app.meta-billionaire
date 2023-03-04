import {
  Box,
  Center,
  Image,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";
// import Link from "next/link";

const CourseCard = ({ title, description, image }: any) => {
  return (
    <Wrap spacing="30px" marginTop="5" fontFamily={"sans"}>
      <WrapItem className="w-full group md:w-96">
        <Box w="100%" className={"shadow-md rounded-lg pb-2"}>
          <Box borderRadius="lg" overflow="hidden">
            <Box
              textDecoration="none"
              className="relative overflow-hidden"
              _hover={{ textDecoration: "none" }}
            >
              <Image
                transform="scale(1.0)"
                src={"/banner.jpeg"}
                alt="some text"
                objectFit="cover"
                className="h-64"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
              />
              <Box className="absolute flex-col top-96 opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300 center h-full w-full bg-black/75 text-white">
                <Heading className="text-2xl text-white/75">Courses</Heading>
                <Text as="p" className="text-white/75">
                  Duration: 54 hrs
                </Text>
              </Box>
            </Box>
          </Box>
          <Box className="px-4 font-thin">
            <Heading fontSize="xl" marginTop="2">
              <Box
                className="font-bold font-sans"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                Category title
              </Box>
            </Heading>
            <Text as="p" className="text-base" marginTop="2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </Box>
        </Box>
      </WrapItem>
    </Wrap>
  );
};
export default CourseCard;
