import { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";

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
    <Box className="h-40 space-y-0.5 md:space-y-2">
      <Heading className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
        {title}
      </Heading>
      <Box className="group relative md:-ml-2">
        <BsChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:text-white hover:bg-black/30 hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />

        <Flex
          ref={rowRef}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
            },
          }}
          className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {data.map((outline) => (
            <Box
              key={outline.id}
              className="relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-56 md:min-w-[320px] md:hover:scale-105"
            >
              <Image
                src={outline.banner}
                className="rounded-sm object-cover w-full md:rounded"
                alt={outline.title}
              />
            </Box>
          ))}
        </Flex>

        <BsChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:text-white hover:bg-black/30 hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </Box>
    </Box>
  );
};

export default Row;
