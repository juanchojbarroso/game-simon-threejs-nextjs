import * as THREE from "three";

function randomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomObject() {
  return objects[Math.floor(Math.random() * objects.length)];
}

const objects = [
  new THREE.BoxBufferGeometry(),
  new THREE.SphereBufferGeometry(),
  new THREE.ExtrudeBufferGeometry(),
  new THREE.ConeBufferGeometry(),
  new THREE.IcosahedronBufferGeometry(),
  new THREE.LatheBufferGeometry(),
  new THREE.TorusKnotBufferGeometry(),
];

const objects3DEasy = [
  { position: [-6, 2, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [-2, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [2, 2, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [6, 3, 0], object3D: getRandomObject(), color: randomColor() },
];
const objects3DMedium = [
  { position: [-6, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [-3, 2, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [0, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [3, 2, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [6, 3, 0], object3D: getRandomObject(), color: randomColor() },
];
const objects3DHard = [
  { position: [-9, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [-5.5, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [-2, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [1.5, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [5.5, 3, 0], object3D: getRandomObject(), color: randomColor() },
  { position: [9, 3, 0], object3D: getRandomObject(), color: randomColor() },
];

export {
  randomColor,
  getRandomObject,
  objects3DEasy,
  objects3DMedium,
  objects3DHard,
};
