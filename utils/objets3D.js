import * as THREE from "three";

const objects = [
  new THREE.BoxBufferGeometry(),
  new THREE.SphereBufferGeometry(),
  new THREE.ExtrudeBufferGeometry(),
  new THREE.ConeBufferGeometry(),
  new THREE.IcosahedronBufferGeometry(),
  new THREE.LatheBufferGeometry(),
  new THREE.TorusKnotBufferGeometry(),
];

export function getRandomObject() {
  return objects[Math.floor(Math.random() * objects.length)];
}
