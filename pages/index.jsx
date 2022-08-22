import React, { useState, useRef, Suspense, useEffect } from "react";
import css from "../styles/Home.module.css";
import { Button, Box, Text, Grid, GridItem, Center } from "@chakra-ui/react";
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

const fov = 100;

export default function Home() {
  const [difficultyLevel, setDifficultyLevel] = useState(difficultylevels.EASY);
  const [sequence, setSequence] = useState([]);
  const [round, setRound] = useState(1);
  const [clickCounter, setClickCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(0);

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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function getIdFromKey(key) {
    return key.split("_").pop();
  }

  function performSequence() {
    console.log("performClick");
    sequence.forEach((turn, i) => {
      setTimeout(() => {
        revealRefs.current[turn]?.performClickFromExternalSign();
      }, i * 1000);
    });
  }

  function validateSequence(objectId) {
    if (`${sequence[clickCounter]}` === getIdFromKey(objectId)) {
      console.log("¡¡¡ --- YUJU --- !!! -You pick the correct");
      setClickCounter(clickCounter + 1);
      if (sequence.length === clickCounter + 1) {
        youWin();
      }
    } else {
      youLose();
    }
  }



  function reset() {
    setDifficultyLevel(difficultylevels.EASY);
    setSequence([]);
    setRound(1);
    setClickCounter(0);
    setIsDisabled(true);
    setTimer(0)
  }

  function handleObjectClick(objectId) {
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

  function play() {
    startTimer();
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
    setRound(round + 1);
    endGame()
  }

  function youLose() {
    console.log("¡¡¡ --- F*$% --- !!! -You lose");
    timerRef.current.pauseTimer()
    endGame()
  }

  function endGame() {
    setIsDisabled(true);
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
          <Button onClick={() => timerRef.current.startTimer()}>Start</Button>
          <Button onClick={() => timerRef.current.pauseTimer()}>Pause</Button>
          <Button onClick={() => timerRef.current.resumeTimer()}>Resume</Button>
          <Button
            onClick={() => {
              timerRef.current.restartTimer();
            }}
          >
            Restart
          </Button>
        </>
      </div>
      <Box
        w="100%"
        h="100vh"
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
                  endGame()
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
    </div>
  );
}
