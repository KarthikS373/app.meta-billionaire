import { Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CourseEdit from "./CourseEdit";
import PodcastEdit from "./PodcastEdit";

const EditContent = ({ handleSubmit: submit, back, mode }: any) => {
  const [field, setField] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e);
  };

  return (
    <Container>
      <Flex>
        {mode === "content" && <PodcastEdit back={back} />}
        {mode === "courses" && <CourseEdit back={back} />}
      </Flex>
    </Container>
  );
};

export default EditContent;
