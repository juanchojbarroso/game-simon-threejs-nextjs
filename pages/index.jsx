import React, { useState, useRef, Suspense, useEffect } from "react";
import css from "../styles/Home.module.css";
import {
  Button,
  Box,
  Text,
  Grid,
  GridItem,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import RandomObject from "../components/RandomObject";
import OrbitControls from "../components/OrbitControls";
import Light from "../components/Light";
import Floor from "../components/Floor";
import Timer from "../components/Timer";
import {
  difficultylevels,
  difficultylevelsPositions,
} from "../shared/difficultylevels";
import { getRandomInt, getIdFromKey } from "../shared/sharedUtils";

const fov = 100;

export default function Home() {
  const [difficultyLevel, setDifficultyLevel] = useState(difficultylevels.EASY);
  const [sequence, setSequence] = useState([]);
  const [round, setRound] = useState(1);
  const [clickCounter, setClickCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(0);

  const [isYouLoseOpen, setYouLoseToggle] = useState(false);
  const [isYouWinOpen, setYouWinOpenToggle] = useState(false);

  const timerRef = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    createSequence();
    setClickCounter(0);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyLevel, round]);

  function addToRefs(elementRef) {
    if (elementRef && !revealRefs.current.includes(elementRef)) {
      revealRefs.current.push(elementRef);
    }
  }

  function createSequence() {
    console.log(`Creating sequence for round: ${round}`);
    const sequenceLength = getCurrentDifficultyLevel().length + round - 1;
    const sequence = Array(sequenceLength)
      .fill()
      .map(() => getRandomInt(getCurrentDifficultyLevel().length));
    console.log(`sequence: ${sequence}`);
    setSequence(sequence);
  }

  function performSequence() {
    sequence.forEach((turn, i) => {
      setTimeout(() => {
        console.log(`performClick on: ${turn}`);
        revealRefs.current[turn]?.performClickFromExternalSign();
      }, (1 + i) * 1000);
    });
  }

  function validateSequence(objectId) {
    const id = getIdFromKey(objectId)
    console.log(clickCounter)
    console.log(`${sequence[clickCounter]}`, id)
    if (`${sequence[clickCounter]}` === id) {
      console.log("¡¡¡ --- YUJU --- !!! -You pick the correct");
      setClickCounter(clickCounter + 1);
      if (sequence.length === clickCounter + 1) {
        youWin();
      }
    } else {
      youLose();
    }
  }

  function handleObjectClick(objectId) {
    console.log(`handleObjectClick ${objectId}`);
    validateSequence(objectId);
  }

  function getCurrentDifficultyLevel() {
    return difficultylevelsPositions[difficultyLevel];
  }

  function updateDifficultyLevel(level) {
    setDifficultyLevel(level);
  }

  function getTimeInSecond() {
    if (difficultyLevel === difficultylevels.EASY) {
      return 3 * sequence.length;
    }
    if (difficultyLevel === difficultylevels.MEDIUM) {
      return 2 * sequence.length;
    }
    if (difficultyLevel === difficultylevels.HARD) {
      return 1.5 * sequence.length;
    }
  }

  async function play() {
    performSequence();
    setTimeout(() => {
      startTimer();
    }, sequence.length * 1010);
  }

  async function nextRound() {
    setYouWinOpenToggle(false);
    play();
  }

  function tryAgain() {
    setYouLoseToggle(false);
    play();
  }

  function startTimer() {
    const time = new Date();
    console.log("start game on: ", time);
    setIsDisabled(false);
    setTimer(getTimeInSecond());
    timerRef.current.restartTimer();
  }

  function youWin() {
    console.log("¡¡¡ ------ YOU WIN  ------ !!!");
    setYouWinOpenToggle(true);
    setRound(round + 1);
    timerRef.current.pauseTimer();
    endGame();
  }

  function youLose() {
    console.log("¡¡¡ --- F*$% --- !!! -You lose");
    setClickCounter(0);
    setYouLoseToggle(true);
    timerRef.current.pauseTimer();
    endGame();
  }

  function endGame() {
    setIsDisabled(true);
  }

  function reset() {
    setDifficultyLevel(difficultylevels.EASY);
    setSequence([]);
    setRound(1);
    setClickCounter(0);
    setIsDisabled(true);
    setTimer(0);
  }
  return (
    <div>
      <div style={{}}>
        <>
          <Button
            onClick={() => {
              play();
            }}
          >
            PLAY
          </Button>
          <Button
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              performSequence();
            }}
          >
            Perform sequence
          </Button>
          <Button
            onClick={() => {
              updateDifficultyLevel(difficultylevels.EASY);
            }}
          >
            EASY
          </Button>
          <Button
            onClick={() => {
              updateDifficultyLevel(difficultylevels.MEDIUM);
            }}
          >
            MEDIUM
          </Button>
          <Button
            onClick={() => {
              updateDifficultyLevel(difficultylevels.HARD);
            }}
          >
            HARD
          </Button>
          <Button
            onClick={() => {
              setIsDisabled(false);
            }}
          >
            ON
          </Button>
          <Button
            onClick={() => {
              setIsDisabled(true);
            }}
          >
            OFF
          </Button>
          <Button
            onClick={() => {
              nextRound();
            }}
          >
            Next RPUND
          </Button>
        </>
      </div>
      <Box
        p={4}
        w="100%"
        h="100%"
        bgGradient="linear(blue.400 10%, blue.100 35%, green.500 80%)"
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="150">
            <Center h="100px" color="white">
              <Text fontSize="4xl">{`${difficultyLevel}`}</Text>
            </Center>
          </GridItem>
          <GridItem w="100%" h="150">
            <Center h="100px" color="white">
              <Timer
                timerCountDown={timer}
                timerRef={timerRef}
                onTimeExpire={() => {
                  const time = new Date();
                  console.log("end game on: ", time);
                  console.log("TIMEEEEEE!");
                  youLose();
                }}
              />
            </Center>
          </GridItem>
          <GridItem w="100%" h="150">
            <Center h="100px" color="white">
              <Text fontSize="4xl">{`Round: #${round}`}</Text>
            </Center>
          </GridItem>
        </Grid>
        <div
          className={css.scene}
          style={{ pointerEvents: isDisabled ? "none" : null }}
        >
          <Canvas
            shadows={true}
            className={css.canvas}
            camera={{ position: [0, 6, 8], fov: fov }}
          >
            <ambientLight color={"white"} intensity={0.2} />
            <Light position={[0, 10, 0]} />
            <Suspense fallback={null}>
              {getCurrentDifficultyLevel().map((item, index) => {
                return (
                  <RandomObject
                    itemRef={addToRefs}
                    onObjectClick={handleObjectClick}
                    key={`item_${index}`}
                    itemId={`item_${index}`}
                    _color={item.color}
                    _object3D={item.object3D}
                    position={item.position}
                  />
                );
              })}
            </Suspense>
            <OrbitControls />
            <Floor position={[0, 0, 0]} />
          </Canvas>
        </div>
      </Box>
      {<YouLoseModal tryAgain={tryAgain} isOpen={isYouLoseOpen} />}
      {<YouWinModal nextRound={nextRound} isOpen={isYouWinOpen} />}
    </div>
  );
}

function YouLoseModal({ tryAgain, isOpen }) {
  return (
    <>
      <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Center h="100px">
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                YOU LOSE
              </Text>
            </Center>
            <Center h="100px">
              <Box
                as="button"
                p={4}
                color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-r, teal.500, green.500)"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
                onClick={tryAgain}
              >
                TRY AGAIN
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function YouWinModal({ nextRound, isOpen }) {
  return (
    <>
      <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Center h="100px">
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                YOU WIN
              </Text>
            </Center>
            <Center h="100px">
              <Box
                as="button"
                p={4}
                color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-r, teal.500, green.500)"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
                onClick={nextRound}
              >
                NEXT ROUND
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
