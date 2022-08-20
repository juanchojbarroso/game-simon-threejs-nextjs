import React from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useLoader } from "@react-three/fiber";

function Floor(props) {
  const texture = useLoader(TextureLoader, "cloth.jpeg");
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    texture.anisotropy = 16;
  }
  return (
    <mesh {...props} recieveShadow={true}>
      <boxBufferGeometry attach="geometry" args={[20, 1, 10]} />
      {texture && <meshPhongMaterial attach="material" map={texture} />}
    </mesh>
  );
}

export default Floor;
