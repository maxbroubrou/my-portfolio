import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager } from '../../main.js';

const loader = new GLTFLoader(manager);

let dataCenterRack, cubeDataCenter;

loader.load('./objects/bytel/data_center_rack.glb', function (gltf) {
  dataCenterRack = gltf.scene;
  dataCenterRack.scale.set(1.5, 1.5, 1.5);
  dataCenterRack.name = 'datacenter';
  const i = 1;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  dataCenterRack.position.setFromSphericalCoords(10, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(dataCenterRack.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(dataCenterRack.quaternion);
  dataCenterRack.lookAt(direction);
  dataCenterRack.rotation.x = 2;
  dataCenterRack.rotation.y = 2.4;
  dataCenterRack.rotation.z = 1.2;
  group.add(dataCenterRack);
  const light = new THREE.HemisphereLight();
  group.add(light);

  const geometry1 = new THREE.BoxGeometry(3, 7, 2.4);
  const materials = new THREE.MeshBasicMaterial({
    color: 'blue',
    transparent: true,
    opacity: 0
  });
  cubeDataCenter = new THREE.Mesh(geometry1, materials);
  cubeDataCenter.name = 'cube_data_center';
  cubeDataCenter.position.set(dataCenterRack.position.x, dataCenterRack.position.y, dataCenterRack.position.z);
  cubeDataCenter.lookAt(direction);
  cubeDataCenter.rotation.x = 2;
  cubeDataCenter.rotation.y = 2.4;
  cubeDataCenter.rotation.z = 1.2;
  group.add(cubeDataCenter);
}, undefined, function (error) {
  console.error(error);
});
