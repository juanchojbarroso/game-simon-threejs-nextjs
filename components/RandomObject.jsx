import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  Suspense,
} from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

function RandomObject({
  itemId,
  itemRef,
  onObjectClick,
  _color = "white",
  _object3D,
  ...props
}) {
  const myMesh = useRef();
  const [active, setActive] = useState(false);

  useImperativeHandle(itemRef, () => ({
    performClickFromExternalSign() {
      console.log("Perform click from external signal");
      console.log("Turn big from external signal", itemId);
      setActive(!active);
      setTimeout(() => {
        setActive(false);
      }, 400);
    },
    childFunction2() {
      console.log("child function 2 called");
    },
  }));

  function handleClick() {
    console.log("Turn Big", itemId);
    onObjectClick(itemId);
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
      <boxBufferGeometry />
      <primitive object={_object3D} attach={"geometry"} />
      <meshPhongMaterial color={_color} />
    </animated.mesh>
  );
}

export default RandomObject;
