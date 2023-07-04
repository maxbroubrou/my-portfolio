import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager } from '../../main.js';

const loader = new GLTFLoader(manager);

let puckle, spherePuckle;

loader.load('./objects/puckle/puckle.glb', function (gltf) {
  puckle = gltf.scene; // puckle 3D object is loaded
  puckle.scale.set(0.05, 0.05, 0.05);
  const i = 10;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  puckle.position.setFromSphericalCoords(10.3, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(puckle.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(puckle.quaternion);
  puckle.lookAt(direction);
  puckle.rotation.z = -0.26;
  puckle.rotation.y = 0.10;
  puckle.rotation.x = 0.12;
  group.add(puckle);
  // const light = new THREE.();
  // const light = new THREE.PointLight( 'red', 1, 100 );
  const light = new THREE.DirectionalLight(0x00ffff, 1);
  light.position.set(0, 11, 0);
  group.add(light);

  const geometry2 = new THREE.SphereGeometry(2.5);
  const materials = new THREE.MeshBasicMaterial({
    color: 'red',
    transparent: true,
    opacity: 0
  });
  spherePuckle = new THREE.Mesh(geometry2, materials);
  spherePuckle.name = 'sphere_puckle';
  spherePuckle.position.set(puckle.position.x + 1.9, puckle.position.y - 1.5, puckle.position.z + 1.4);
  //   sphere_puckle.lookAt( direction );
  //   sphere_puckle.rotation.z = -0.26;
  //   sphere_puckle.rotation.y = 0.10;
  //   sphere_puckle.rotation.x = 0.12;

  group.add(spherePuckle);
}, undefined, function (error) {
  console.error(error);
});
