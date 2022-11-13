import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import {group, satelliteGroup} from '../../main.js'

var loader = new GLTFLoader();

let satellite, antenna

loader.load('./objects/satellite/parabolic_antenna.glb', function ( gltf ) {
    antenna = gltf.scene;  // antenna 3D object is loaded
    antenna.scale.set(0.5,0.5,0.5);
    let i=6
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    antenna.position.setFromSphericalCoords( 10, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( antenna.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( antenna.quaternion );
    antenna.lookAt( direction );
    
    group.add(antenna);
    const light = new THREE.HemisphereLight();
    group.add( light );
  }, undefined, function ( error ) {
    console.error( error );
  } );

loader.load('./objects/satellite/satellite.glb', function ( gltf ) {
    satellite = gltf.scene;  // satellite 3D object is loaded
    satellite.scale.set(0.001, 0.001, 0.001);
    satelliteGroup.add(satellite);
}, undefined, function ( error ) {
    console.error( error );
} 
);