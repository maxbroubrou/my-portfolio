import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager } from '../../main.js';

const loader = new GLTFLoader(manager);

let rowing, sphereRowing;

loader.load('./objects/rowing/rowing.glb', function (gltf) {
  rowing = gltf.scene; // rowing 3D object is loaded
  rowing.scale.set(0.02, 0.02, 0.02);
  const i = 2;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  rowing.position.setFromSphericalCoords(10.7, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(rowing.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(rowing.quaternion);
  rowing.lookAt(direction);
  rowing.rotation.z = -3;
  rowing.rotation.y = 7.5;
  rowing.rotation.x = -4.2;
  group.add(rowing);
  const light = new THREE.HemisphereLight();
  group.add(light);

  const geometry2 = new THREE.BoxGeometry(5, 2.8, 2.8);
  const materials = new THREE.MeshBasicMaterial({
    color: 'grey',
    transparent: true,
    opacity: 0
  });
  sphereRowing = new THREE.Mesh(geometry2, materials);
  sphereRowing.name = 'sphere_rowing';
  sphereRowing.position.set(rowing.position.x, rowing.position.y, rowing.position.z);
  sphereRowing.lookAt(direction);
  sphereRowing.rotation.z = -3;
  sphereRowing.rotation.y = 7.5;
  sphereRowing.rotation.x = -4.2;

  group.add(sphereRowing);
}, undefined, function (error) {
  console.error(error);
});
