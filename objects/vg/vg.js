import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager } from '../../main.js';

const loader = new GLTFLoader(manager);

let dumbell, cubeDumbell;

loader.load('./objects/vg/dumbell.glb', function (gltf) {
  dumbell = gltf.scene;
  dumbell.scale.set(1, 1, 1);
  dumbell.name = 'dumbell';
  const i = 0.01;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  dumbell.position.setFromSphericalCoords(10.4, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(dumbell.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(dumbell.quaternion);
  dumbell.lookAt(direction);
  group.add(dumbell);

  const geometry1 = new THREE.BoxGeometry(5, 2, 2);
  const materials = new THREE.MeshBasicMaterial({
    color: 'orange',
    transparent: true,
    opacity: 0
  });
  cubeDumbell = new THREE.Mesh(geometry1, materials);
  cubeDumbell.name = 'vg';
  cubeDumbell.position.set(dumbell.position.x - 0.8, dumbell.position.y, dumbell.position.z);
  cubeDumbell.lookAt(direction);
  group.add(cubeDumbell);
}, undefined, function (error) {
  console.error(error);
});
