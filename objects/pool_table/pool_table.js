import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import {group} from '../../main.js'

var loader = new GLTFLoader();

let pool_table, cube_pool_table

loader.load('./objects/pool_table/pool_table_set.glb', function ( gltf ) {
// loader.load('./assets/pool_table_set.glb', function ( gltf ) {
    pool_table = gltf.scene;  // pool_table 3D object is loaded
    pool_table.scale.set(0.0001, 0.0001, 0.0001);
    pool_table.name = 'pool_table';
    let i=5
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    pool_table.position.setFromSphericalCoords( 10.2, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( pool_table.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( pool_table.quaternion );
    pool_table.lookAt( direction );
    pool_table.name = "pool_table";
  
    const geometry1 = new THREE.BoxGeometry( 8, 2.5, 5 );
    const materials = new THREE.MeshBasicMaterial({
    color: 'green',
    transparent: true,
    opacity: 0
    });
    cube_pool_table = new THREE.Mesh( geometry1, materials );
    cube_pool_table.name = "cube_pool_table";
    cube_pool_table.position.set(pool_table.position.x, pool_table.position.y, pool_table.position.z);
    cube_pool_table.lookAt( direction );
    group.add(pool_table);
    group.add( cube_pool_table );

  }, undefined, function ( error ) {
      console.error( error );
  } );

//export pool_table
// export { pool_table, cube_pool_table };