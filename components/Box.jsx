import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

function Box({ itemId, _color = "white", _object3D, ...props }) {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);

  function handleClick() {
    console.log("Turn Big", itemId);
    setActive(!active);
    setTimeout(() => {
      console.log("Turn small", itemId);
      setActive(false);
    }, 600);
  }

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.rotation.y = a;
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => handleClick()}
      ref={myMesh}
      {...props}
    >
      < boxBufferGeometry/>
      <primitive object={_object3D} attach={"geometry"}/>
      <meshPhongMaterial color={_color} />
    </animated.mesh>
  );
}


export default Box;
