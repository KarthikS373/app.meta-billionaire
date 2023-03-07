import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { uploadCourseMaterial, uploadThumbNail } from "../../lib/firebase";
import courseCategories from "../../data/courses.json";

const CourseEdit = ({ course, back }: any) => {
  const toast = useToast();
  const [mode, setMode] = useState<"edit" | "create">("create");

  const [material, setMaterial] = useState<File | null>(null);

  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [active, setActive] = useState(true);
  const [category, setCategory] = useState("podcast");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const [uploadState, setUploadState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type == "video") {
      setUploadState(true);
    } else {
      setUploadState(false);
    }
  }, [type]);

  useEffect(() => {
    if (course) {
      setMode("edit");

      setId(course.id);
      setTitle(course.title);
      setLink(course.link);

      setActive(course.active);
      setCategory(course.category);
      setDescription(course.description);
      setDuration(course.duration);
    }
  }, [course]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let errors = null;

    if (!uploadState) {
      console.log("-- starting upload --");
      try {
        if (material) {
          const data = await uploadCourseMaterial(
            material,
            title.toLowerCase(),
            material.type.replace(/(.*)\//g, ""),
            category
          );
          console.log(data);
          setLink(data);

          toast({
            title: `Uploaded Document`,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        }
      } catch (e) {
        errors = e;
      }

      console.log("-- uploaded --");
      console.log(errors);

      if (!errors) setUploadState(true);
    }

    if (uploadState) {
      axios
        .post(`/api/addCourse`, {
          active: active,
          category: category,
          description: description,
          duration: duration,
          title: title,
          link: link,
          type: type,
        })
        .then((res) => {
          toast({
            title: `${title} created.`,
            description: `Successfully created a new course in ${category}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          back();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
        });
    }

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <Flex direction={"column"} w="full">
          {renderInput(title, setTitle, "Title")}
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
            {courseCategories.categories.map((c, i) => {
              return (
                <option value={c.name.toLowerCase()} key={c.id}>
                  {c.name}
                </option>
              );
            })}
          </Select>
          {renderInput(description, setDescription, "Description")}
          {renderInput(duration, setDuration, "Duration")}
          <Select
            fontSize={15}
            disabled={!active}
            letterSpacing={2}
            fontWeight={600}
            w="100%"
            mt="md"
            onChange={(e) => {
              setType(e.target.value);
            }}
            placeholder="-- Select Type of file --"
          >
            {courseCategories.types.map((c, i) => {
              return (
                <option value={c.type} key={c.id}>
                  {c.type}
                </option>
              );
            })}
          </Select>
          {type.length > 0 &&
            type === "video" &&
            renderInput(link, setLink, "Enter video link", "text")}
          {type.length > 0 && type !== "video" && (
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
                    Upload <br />
                    {type}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setMaterial(e.target.files?.[0] || null);
                    }}
                  />
                </label>
              </div>
            </Flex>
          )}
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

export default CourseEdit;
