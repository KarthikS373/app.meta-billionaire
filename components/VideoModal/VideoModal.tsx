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
  speakerList,
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
                url={selectVideo.video}
                controls
                autoPlay
              />
              {!selectVideo.isRobotom && !selectVideo.isMoneyMaker ? (
                <></>
              ) : (
                <>
                  <Text
                    textTransform="uppercase"
                    mt="sm"
                    fontSize={22}
                    fontWeight={600}
                  >
                    Speakers
                  </Text>

                  <SimpleGrid
                    columns={
                      selectVideo.isRobotom && selectVideo.isMoneyMaker ? 2 : 1
                    }
                    w="100%"
                  >
                    {selectVideo.isRobotom && (
                      <Intervenant
                        name={speakerList[1].name}
                        image={speakerList[1].image}
                        job={speakerList[1].job}
                        speakersCount={
                          selectVideo.isRobotom && selectVideo.isMoneyMaker
                            ? 2
                            : 1
                        }
                        isModal
                      />
                    )}

                    {selectVideo.isMoneyMaker && (
                      <Intervenant
                        name={speakerList[0].name}
                        image={speakerList[0].image}
                        job={speakerList[0].job}
                        speakersCount={speakerList}
                        isModal
                      />
                    )}
                  </SimpleGrid>
                </>
              )}
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
