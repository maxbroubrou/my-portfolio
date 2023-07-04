import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager } from '../../main.js';

const loader = new GLTFLoader(manager);

let pcb, ledLight, cubeMobileTinsel;

loader.load('./objects/mobile_tinsel/low_poly_circuit_board_pcb.glb', function (gltf) {
  pcb = gltf.scene; // pcb 3D object is loaded
  pcb.scale.set(1, 1, 1);
  const i = 3;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  pcb.position.setFromSphericalCoords(10.01, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(pcb.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(pcb.quaternion);
  pcb.lookAt(direction);
  pcb.rotation.y = -0.5;
  group.add(pcb);
  const light = new THREE.HemisphereLight();
  group.add(light);
}, undefined, function (error) {
  console.error(error);
});
loader.load('./objects/mobile_tinsel/led_light.glb', function (gltf) {
  ledLight = gltf.scene; // ledLight 3D object is loaded
  ledLight.scale.set(0.3, 0.3, 0.3);
  const i = 3.15;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  ledLight.position.setFromSphericalCoords(11.5, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(ledLight.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(ledLight.quaternion);
  ledLight.lookAt(direction);
  ledLight.rotation.y = -0.5;
  group.add(ledLight);
  const light = new THREE.HemisphereLight();
  group.add(light);

  const geometry1 = new THREE.BoxGeometry(5, 2.5, 5);
  const materials = new THREE.MeshBasicMaterial({
    color: 'red',
    transparent: true,
    opacity: 0
  });
  cubeMobileTinsel = new THREE.Mesh(geometry1, materials);
  cubeMobileTinsel.name = 'cube_mobile_tinsel';
  cubeMobileTinsel.position.set(pcb.position.x, pcb.position.y, pcb.position.z - 0.6);
  cubeMobileTinsel.lookAt(direction);
  cubeMobileTinsel.rotation.y = -0.5;
  group.add(cubeMobileTinsel);
}, undefined, function (error) {
  console.error(error);
});
