import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager, satelliteGroup } from '../../main.js';

const loader = new GLTFLoader(manager);

let satellite, antenna, cubeAntenna, sphereSatellite;

loader.load('./objects/satellite/parabolic_antenna.glb', function (gltf) {
  antenna = gltf.scene; // antenna 3D object is loaded
  antenna.scale.set(0.5, 0.5, 0.5);
  const i = 6;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  antenna.position.setFromSphericalCoords(10, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(antenna.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(antenna.quaternion);
  antenna.lookAt(direction);

  group.add(antenna);
  const light = new THREE.HemisphereLight();
  group.add(light);

  const geometry1 = new THREE.BoxGeometry(2.8, 5.5, 2.8);
  const materials = new THREE.MeshBasicMaterial({
    color: 'grey',
    transparent: true,
    opacity: 0
  });
  cubeAntenna = new THREE.Mesh(geometry1, materials);
  cubeAntenna.name = 'cube_antenna';
  cubeAntenna.position.set(antenna.position.x, antenna.position.y, antenna.position.z + 0.7);
  cubeAntenna.lookAt(direction);
  group.add(cubeAntenna);
}, undefined, function (error) {
  console.error(error);
});

loader.load('./objects/satellite/satellite.glb', function (gltf) {
  satellite = gltf.scene; // satellite 3D object is loaded
  satellite.scale.set(0.001, 0.001, 0.001);
  satelliteGroup.add(satellite);

  const geometry2 = new THREE.SphereGeometry(3);
  const materials = new THREE.MeshBasicMaterial({
    color: 'grey',
    transparent: true,
    opacity: 0
  });
  sphereSatellite = new THREE.Mesh(geometry2, materials);
  sphereSatellite.name = 'sphere_satellite';
  satelliteGroup.add(sphereSatellite);
}, undefined, function (error) {
  console.error(error);
}
);
