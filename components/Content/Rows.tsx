import { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  data: Data[] | any[];
  title: string;
}

interface Data {
  id: number;
  title: string;
  banner: string;
}

const Row = ({ title, data }: Props) => {
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
    <Box className="h-40 space-y-0.5 md:space-y-2 ml-0 mt-2 md:mt-8 translate-x-4 md:translate-x-8">
      <Heading className="cursor-pointer w-min text-sm font-semibold text-[#294BF5]/50 transition-colors duration-200 hover:text-[#294BF5] md:text-2xl uppercase whitespace-nowrap">
        {title}
      </Heading>
      <Box className="relative">
        <Box
          h="full"
          className="group z-50 hover:bg-black/30 absolute top-0 bottom-0 left-2 center m-auto"
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
          className="flex items-end justify-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {data.map((outline) => (
            <Box
              key={outline.id}
              className="group relative rounded-sm md:rounded h-28 min-w-[180px] cursor-pointer overflow-hidden transition-transform duration-200 ease-out md:h-52 md:min-w-[320px] md:hover:scale-105"
            >
              <Image
                src={outline.banner}
                className="rounded-sm object-cover w-full md:rounded"
                alt={outline.title}
              />
              <Box className="absolute flex-col top-96 opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300 center h-full w-full bg-black/75 text-white">
                <Heading
                  fontSize={[16, 16, 20, 32]}
                  className="text-xl text-white/75"
                >
                  Courses
                </Heading>
                <Text
                  as="p"
                  fontSize={[12, 12, 14, 14]}
                  className="text-white/75"
                >
                  Duration: 54 hrs
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>

        <Box
          h="full"
          className="group z-50 hover:bg-black/30 absolute top-0 bottom-3 right-10 center m-auto cursor-pointer "
          onClick={() => handleClick("right")}
        >
          <BsChevronRight className=" h-9 w-9 opacity-0 transition group-hover:text-white hover:scale-125 group-hover:opacity-100" />
        </Box>
      </Box>
    </Box>
  );
};

export default Row;
