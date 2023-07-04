import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { group, manager } from '../../main.js';

const loader = new GLTFLoader(manager);

let poolTable, cubePoolTable;

loader.load('./objects/pool_table/pool_table_set.glb', function (gltf) {
// loader.load('./assets/pool_table_set.glb', function ( gltf ) {
  poolTable = gltf.scene; // pool_table 3D object is loaded
  poolTable.scale.set(0.0001, 0.0001, 0.0001);
  poolTable.name = 'pool_table';
  const i = 5;
  const l = 10;
  const phi = Math.acos(-1 + (2 * i) / l);
  const theta = Math.sqrt(l * Math.PI) * phi;
  poolTable.position.setFromSphericalCoords(10.2, phi, theta);
  const vector = new THREE.Vector3();
  vector.copy(poolTable.position).multiplyScalar(2);
  const direction = new THREE.Vector3(0, 90, 0).applyQuaternion(poolTable.quaternion);
  poolTable.lookAt(direction);
  poolTable.name = 'pool_table';

  const geometry1 = new THREE.BoxGeometry(8, 2.5, 5);
  const materials = new THREE.MeshBasicMaterial({
    color: 'green',
    transparent: true,
    opacity: 0
  });
  cubePoolTable = new THREE.Mesh(geometry1, materials);
  cubePoolTable.name = 'cube_pool_table';
  cubePoolTable.position.set(poolTable.position.x, poolTable.position.y, poolTable.position.z);
  cubePoolTable.lookAt(direction);
  group.add(poolTable);
  group.add(cubePoolTable);
}, undefined, function (error) {
  console.error(error);
});

// export pool_table
// export { pool_table, cube_pool_table };
