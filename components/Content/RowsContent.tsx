import { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

interface Props {
  title: string;
  popupText?: string;
  category: string;
  data: Data[];
  setPlayer: (name: string, src: string) => void;
}

interface Data {
  id: number;
  order: number;
  title: string;
  video: string;
  mobileThumnail: string;
  desktopThumbnail: string;
  active: boolean;
  speaker: string | null;
  category: string;
  description: string;
  duration: string;
}

const RowContent = ({
  title,
  data,
  setPlayer,
  popupText = "Duration",
}: Props) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <Box className="space-y-2 ml-0 mt-1 md:mt-2 translate-x-2 mb-6 md:translate-x-8">
      <Heading
        fontSize={[20, 20, 26, 36]}
        className="cursor-pointer w-min text-sm font-semibold text-black/50 transition-colors duration-200 hover:text-black md:text-2xl uppercase whitespace-nowrap"
      >
        {title}
      </Heading>
      <Box className="relative">
        <Box
          h="full"
          className="hidden md:flex group z-50 hover:bg-black/30 absolute top-0 bottom-0 left-2 center m-auto"
        >
          <BsChevronLeft
            className={`m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:text-white hover:scale-125 group-hover:opacity-100 ${
              !isMoved && "hidden"
            }`}
            onClick={() => handleClick("left")}
          />
        </Box>

        <Flex
          ref={rowRef}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
            },
          }}
          className="flex items-end justify-start scrollbar-hide space-x-1 overflow-x-scroll md:space-x-2.5 md:p-2 last:mr-8"
        >
          {data.map((outline) => (
            <Box
              key={outline.id}
              onClick={() => setPlayer(outline.title, outline.video)}
              className="group relative rounded-lg md:rounded min-w-[200px] max-w-[260px] md:max-w-[1000px] cursor-pointer overflow-hidden transition-transform duration-200 ease-out md:h-52 md:min-w-[365px] md:hover:scale-105"
            >
              <Image
                src={
                  isLargerThan800
                    ? outline.desktopThumbnail
                    : outline.mobileThumnail
                }
                h={[64, 64, "auto", "auto"]}
                className="rounded-sm object-cover w-full md:rounded object-center"
                alt={outline.title}
              />
              <Box className="absolute flex-col top-96 opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300 center h-full w-full bg-black/75 text-white">
                <Heading
                  fontSize={[16, 16, 20, 32]}
                  textAlign={"center"}
                  className="text-xl text-white/75"
                >
                  {outline.title}
                </Heading>
                <Text
                  as="p"
                  textAlign={"center"}
                  fontSize={[12, 12, 14, 14]}
                  className="text-white/75"
                >
                  {popupText}: {outline.duration}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>

        <Box
          h="full"
          className="hidden md:flex group z-50 hover:bg-black/30 absolute top-0 bottom-3 right-10 center m-auto cursor-pointer "
          onClick={() => handleClick("right")}
        >
          <BsChevronRight className=" h-9 w-9 opacity-0 transition group-hover:text-white hover:scale-125 group-hover:opacity-100" />
        </Box>
      </Box>
    </Box>
  );
};

export default RowContent;
