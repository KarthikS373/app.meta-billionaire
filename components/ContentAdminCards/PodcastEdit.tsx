import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const PodcastEdit = ({ podcast, back }: any) => {
  const [mode, setMode] = useState<"edit" | "create">("create");

  const [mobileThumbnail, setMobileThumbnail] = useState<File | null>(null);
  const [desktopThumbnail, setDesktopThumbnail] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [thumbNail, setThumbNail] = useState({
    mobileThumbnail: "",
    desktopThumbnail: "",
  });
  const [active, setActive] = useState(true);
  const [speaker, setSpeaker] = useState<string[]>([]);
  const [category, setCategory] = useState("podcast");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (podcast) {
      setMode("edit");

      setTitle(podcast.title);
      setVideo(podcast.video);
      setThumbNail({
        desktopThumbnail: podcast.desktopThumbnail,
        mobileThumbnail: podcast.mobileThumbnail,
      });
      setActive(podcast.active);
      setSpeaker(podcast.speaker);
      setCategory(podcast.category);
      setDescription(podcast.description);
      setDuration(podcast.duration);
    }
  }, [podcast]);

  const renderInput = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeholder = "...",
    type = "text"
  ) => (
    <Input
      value={value}
      disabled={!active}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      fontSize={15}
      letterSpacing={2}
      fontWeight={600}
      w="100%"
      mt="md"
      required
    />
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <Flex direction={"column"} w="full">
          {renderInput(title, setTitle, "Title")}
          {renderInput(video, setVideo, "Video")}
          {/* {renderInput(active, setactive, "active...")}
          {renderInput(speaker, setspeaker, "speaker...")} */}
          <Select
            fontSize={15}
            disabled={!active}
            letterSpacing={2}
            fontWeight={600}
            w="100%"
            mt="md"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="-- Select Category --"
          >
            <option value="podcast">Podcast</option>
          </Select>
          {renderInput(description, setDescription, "Description")}
          {renderInput(duration, setDuration, "Duration")}
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Text whiteSpace={"nowrap"} fontSize={12}>
              Mobile Thumbnail
            </Text>
            <Input
              disabled={!active}
              onChange={(e) => setMobileThumbnail(e.target?.files?.[0] || null)}
              type={"file"}
              placeholder={"Upload mobile thumbnail"}
              fontSize={15}
              letterSpacing={2}
              fontWeight={600}
              w="100%"
              mt="sm"
              required
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Text whiteSpace={"nowrap"} fontSize={12}>
              Desktop Thumbnail
            </Text>
            <Input
              disabled={!active}
              onChange={(e) => setDesktopThumbnail(e.target?.files?.[0] || null)}
              type={"file"}
              placeholder={"Upload Desktop thumbnail"}
              fontSize={15}
              letterSpacing={2}
              fontWeight={600}
              w="100%"
              mt="sm"
              required
            />
          </Flex>
          <Button
            colorScheme={active ? "red" : "green"}
            mt={"md"}
            variant={"solid"}
            fontSize={15}
            fontWeight={100}
            letterSpacing={1.2}
            type="button"
            minW={36}
            onClick={() => {
              setActive((prev) => !prev);
            }}
          >
            {active ? "Deactivate" : "Activate"}
          </Button>
          <Flex
            wrap={"wrap"}
            direction={["column", "row"]}
            justifyContent={"end"}
            gap={2}
            mt="md"
          >
            <Button
              colorScheme="customGray"
              variant={"outline"}
              fontSize={15}
              fontWeight={100}
              letterSpacing={1.2}
              type="reset"
              minW={36}
              onClick={back}
            >
              Back
            </Button>
            <Button
              colorScheme="customGray"
              fontSize={15}
              fontWeight={100}
              letterSpacing={1.2}
              type="submit"
              minW={36}
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default PodcastEdit;
