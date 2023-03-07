import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import Intervenant from "../Intervenant/Intervenant";

const VideoModal = ({
  isOpen,
  onClose,
  selectVideo,
  name,
}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent
        bgColor="#131313fa"
        color="white"
        w={["90%", "90%", "100%", "100%"]}
      >
        {selectVideo ? (
          <>
            <ModalHeader fontSize={25} fontWeight={800}>
              {name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody p={4}>
              <ReactPlayer
                width="100%"
                height={300}
                url={selectVideo}
                controls
                autoPlay
              />
            </ModalBody>
          </>
        ) : (
          <Spinner color="customGray" m="0 auto" mt="md" />
        )}
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
