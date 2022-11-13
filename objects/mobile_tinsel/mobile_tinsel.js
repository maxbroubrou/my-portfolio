import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import {group} from '../../main.js'

var loader = new GLTFLoader();

let pcb, led_light

loader.load('./objects/mobile_tinsel/low_poly_circuit_board_pcb.glb', function ( gltf ) {
    pcb = gltf.scene;  // pcb 3D object is loaded
    pcb.scale.set(1,1,1);
    let i=3
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    pcb.position.setFromSphericalCoords( 10.01, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( pcb.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( pcb.quaternion );
    pcb.lookAt( direction );
    pcb.rotation.y = -0.5;
      group.add(pcb);
    const light = new THREE.HemisphereLight();
    group.add( light );
  }, undefined, function ( error ) {
      console.error( error );
  } );
  loader.load('./objects/mobile_tinsel/led_light.glb', function ( gltf ) {
    led_light = gltf.scene;  // led_light 3D object is loaded
    led_light.scale.set(0.3,0.3,0.3);
    let i=3.15
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    led_light.position.setFromSphericalCoords( 11.5, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( led_light.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( led_light.quaternion );
    led_light.lookAt( direction );
    led_light.rotation.y = -0.5;
    group.add(led_light);
    const light = new THREE.HemisphereLight();
    group.add( light );
  }, undefined, function ( error ) {
      console.error( error );
  } );