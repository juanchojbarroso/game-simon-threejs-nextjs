import React, { useState, useRef, Suspense, useEffect } from "react";
import css from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import RandomObject from "../components/RandomObject";
import OrbitControls from "../components/OrbitControls";
import Light from "../components/Light";
import Floor from "../components/Floor";
import {
  objects3DEasy,
  objects3DMedium,
  objects3DHard,
} from "../utils/objets3D";

const fov = 80;

const difficultylevels = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

const difficultylevelsPositions = {
  EASY: objects3DEasy,
  MEDIUM: objects3DMedium,
  HARD: objects3DHard,
};

export default function Home() {
  const [difficultyLevel, setDifficultyLevel] = useState(difficultylevels.EASY);
  const [sequence, setSequence] = useState([]);
  const [clickCounter, setClickCounter] = useState(0);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    createSequence();

    return () => {};
  }, [difficultyLevel]);

  function addToRefs(elementRef) {
    if (elementRef && !revealRefs.current.includes(elementRef)) {
      revealRefs.current.push(elementRef);
    }
  }

  function createSequence() {
    const sequenceLength = getCurrentDifficultyLevel().length;
    const sequence = Array(sequenceLength)
      .fill()
      .map(() => getRandomInt(sequenceLength));
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
    debugger;
    if (`${sequence[clickCounter]}` === getIdFromKey(objectId)) {
      console.log("YUJU you pick the correct");
      setClickCounter(clickCounter + 1);
      if (sequence.length === clickCounter + 1) {
        console.log("¡¡¡ ------ YOU WIN  ------ !!!");
      }
    } else {
      console.log("BUUU you lose");
      setClickCounter(0);
    }
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

  return (
    <>
      <div style={{}}>
        <>
          <button
            onClick={() => {
              performSequence();
            }}
          >
            Random
          </button>
          <button
            onClick={() => {
              updateDifficultyLevel(difficultylevels.EASY);
            }}
          >
            EASY
          </button>
          <button
            onClick={() => {
              updateDifficultyLevel(difficultylevels.MEDIUM);
            }}
          >
            MEDIUM
          </button>
          <button
            onClick={() => {
              updateDifficultyLevel(difficultylevels.HARD);
            }}
          >
            HARD
          </button>
        </>
      </div>
      <div className={css.scene}>
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
    </>
  );
}
