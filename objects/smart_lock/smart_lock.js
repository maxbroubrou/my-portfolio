import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import {group, manager} from '../../main.js'

var loader = new GLTFLoader(manager);

let smartphone, lock, rfid, cube_smart_lock

loader.load('./objects/smart_lock/Red_Smartphone.glb', function ( gltf ) {
    smartphone = gltf.scene;  // smartphone 3D object is loaded
    smartphone.scale.set(3,3,3);
    smartphone.name = 'smartphone';
    let i=7.2
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    smartphone.position.setFromSphericalCoords( 11.8, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( smartphone.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( smartphone.quaternion );
    smartphone.lookAt( direction );
    group.add(smartphone);
    const light = new THREE.HemisphereLight();
    group.add( light );

    const geometry1 = new THREE.BoxGeometry( 2.4, 5, 2.4 );
    const materials = new THREE.MeshBasicMaterial({
    color: 'orange',
    transparent: true,
    opacity: 0
    });
    cube_smart_lock = new THREE.Mesh( geometry1, materials );
    cube_smart_lock.name = "cube_smart_lock";
    cube_smart_lock.position.set(smartphone.position.x, smartphone.position.y-0.5, smartphone.position.z-1);
    cube_smart_lock.lookAt( direction );
    group.add( cube_smart_lock );
  }, undefined, function ( error ) {
      console.error( error );
  } );
  loader.load('./objects/smart_lock/gold_lock_improved.glb', function ( gltf ) {
    lock = gltf.scene;  // lock 3D object is loaded
    lock.scale.set(0.05,0.05,0.05);
    let i=7.15
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    lock.position.setFromSphericalCoords( 10, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( lock.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( lock.quaternion );
    lock.lookAt( direction );
    lock.rotation.y = 2.8;
    group.add(lock);
    const light = new THREE.HemisphereLight();
    group.add( light );
  }, undefined, function ( error ) {
      console.error( error );
  } );
  loader.load('./objects/smart_lock/rfid_readwrite_module_rc522.glb', function ( gltf ) {
    rfid = gltf.scene;  // rfid 3D object is loaded
    rfid.scale.set(25,25,25);
    let i=7.25
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    rfid.position.setFromSphericalCoords( 10.5, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( rfid.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( rfid.quaternion );
    rfid.lookAt( direction );
    rfid.rotation.x = -0.3;
    group.add(rfid);
    const light = new THREE.HemisphereLight();
    group.add( light );

  }, undefined, function ( error ) {
      console.error( error );
  } );

 