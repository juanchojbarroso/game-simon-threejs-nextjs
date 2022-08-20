import css from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Box from "../components/Box";
import OrbitControls from "../components/OrbitControls";
import Light from "../components/Light";
import Floor from "../components/Floor";
import { Suspense } from "react";
import { randomColor } from "../utils/colors";
import { getRandomObject } from "../utils/objets3D";

const ItemsPositionEasy = [
  [-6, 2, 0],
  [-2, 3, 0],
  [2, 2, 0],
  [6, 3, 0],
];
const ItemsPositionMedium = [
  [-6, 3, 0],
  [-3, 2, 0],
  [0, 3, 0],
  [3, 2, 0],
  [6, 3, 0],
];
const ItemsPositionHard = [
  [-9, 3, 0],
  [-5.5, 3, 0],
  [-2, 3, 0],
  [1.5, 3, 0],
  [5.5, 3, 0],
  [9, 3, 0],
];

const fov = 80;
const aspect = 3;
const near = 4;
const lookAt = 100;

export default function Home() {
  return (
    <>
    <div style={{}}>Nivel: 1 </div>
      <div className={css.scene}>
        <Canvas
          shadows={true}
          className={css.canvas}
          camera={{ position: [0, 6, 8], fov: fov }}
        >
          <ambientLight color={"white"} intensity={0.2} />
          <Light position={[0, 10, 0]} />
          <Suspense fallback={null}>
            {ItemsPositionEasy.map((pos, index) => {
              return (
                <Box
                  key={`item-${index}`}
                  itemId={`item-${index}`}
                  _color={randomColor()}
                  _object3D={getRandomObject()}
                  position={pos}
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
