import React from "react";
import { useFrame } from "@react-three/fiber";

function Box({color = 'white'}) {
  const myMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh ref={myMesh}>
      <boxBufferGeometry />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

export default Box;
