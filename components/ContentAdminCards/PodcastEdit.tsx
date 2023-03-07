import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { uploadThumbNail } from "../../lib/firebase";

const PodcastEdit = ({ podcast, back }: any) => {
  const [mode, setMode] = useState<"edit" | "create">("create");

  const [mobileThumbnail, setMobileThumbnail] = useState<File | null>(null);
  const [desktopThumbnail, setDesktopThumbnail] = useState<File | null>(null);

  const [id, setId] = useState<string | null>(null);
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

  const [uploadState, setUploadState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [thumbnailURL, setThumbnailURL] = useState({
    mobile: "",
    desktop: "",
  });

  const [preview, setPreview] = useState({
    mobile: {
      src: "",
      text: "",
    },
    desktop: {
      src: "",
      text: "",
    },
  });

  useEffect(() => {
    if (podcast) {
      setMode("edit");

      setId(podcast.id);
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
    setIsLoading(true);

    if (!uploadState) {
      try {
        if (mobileThumbnail) {
          uploadThumbNail(
            mobileThumbnail,
            title.toLowerCase(),
            mobileThumbnail.type.replace(/(.*)\//g, ""),
            category,
            "mobile"
          )
            .then((url) => {
              console.log(url);
              setThumbnailURL((prev) => ({ ...prev, mobile: url }));
            })
            .catch((err) => console.warn(err));
        }
      } catch (e) {}
      try {
        if (desktopThumbnail) {
          uploadThumbNail(
            desktopThumbnail,
            title.toLowerCase(),
            desktopThumbnail.type.replace(/(.*)\//g, ""),
            category,
            "desktop"
          )
            .then((url) => {
              console.log(url);
              setThumbnailURL((prev) => ({ ...prev, desktop: url }));
            })
            .catch((err) => console.warn(err));
        }
      } catch (e) {}
    }

    setIsLoading(false);
  };

  const createPreview = (file: File, mode: "mobile" | "desktop") => {
    console.log("creating preview", file);
    const FR = new FileReader();

    FR.addEventListener("load", (evt) => {
      setPreview((prev) => ({
        ...prev,
        [mode]: {
          src: evt.target?.result,
          text: evt.target?.result,
        },
      }));
    });

    FR.readAsDataURL(file);
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
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            mt={4}
            w={"full"}
            wrap={["wrap", "wrap", "nowrap", "nowrap"]}
          >
            {preview.mobile.src.length > 0 && (
              <Flex direction={"column-reverse"} gap={1}>
                <Text whiteSpace={"nowrap"} fontSize={12}>
                  Mobile Preview
                </Text>
                <Image src={preview.mobile.src} alt={preview.mobile.text} />
              </Flex>
            )}
            {preview.desktop.src.length > 0 && (
              <Flex direction={"column-reverse"}>
                <Text whiteSpace={"nowrap"} fontSize={12}>
                  Desktop Preview
                </Text>
                <Image src={preview.desktop.src} alt={preview.desktop.text} />
              </Flex>
            )}
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"stretch"}
            justifyContent={"center"}
            gap={4}
            wrap={["wrap", "wrap", "nowrap", "nowrap"]}
          >
            <div className="flex w-full mt-4 items-center justify-center bg-grey-lighter">
              <label className="w-60 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Mobile
                  <br /> Thumbnail
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setMobileThumbnail(e.target.files?.[0] || null);
                    if (e.target.files?.[0]) {
                      createPreview(e.target.files?.[0], "mobile");
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex w-full mt-4 items-center justify-center bg-grey-lighter">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Desktop
                  <br /> Thumbnail
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setDesktopThumbnail(e.target.files?.[0] || null);
                    if (e.target.files?.[0]) {
                      createPreview(e.target.files?.[0], "desktop");
                    }
                  }}
                />
              </label>
            </div>
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
              {uploadState ? "Create" : "Upload"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default PodcastEdit;
