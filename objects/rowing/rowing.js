import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import {group} from '../../main.js'

var loader = new GLTFLoader();

let rowing

loader.load('./objects/rowing/rowing.glb', function ( gltf ) {
    rowing = gltf.scene;  // rowing 3D object is loaded
    rowing.scale.set(0.02, 0.02, 0.02);
    let i=2
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    rowing.position.setFromSphericalCoords( 10.7, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( rowing.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( rowing.quaternion );
    rowing.lookAt( direction );
    rowing.rotation.z = -3;
    rowing.rotation.y = 7.5;
    rowing.rotation.x = -4.2;
    group.add(rowing);
    const light = new THREE.HemisphereLight();
    group.add( light );
  }, undefined, function ( error ) {
    console.error( error );
  } );