import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three'
import {group, manager} from '../../main.js'

var loader = new GLTFLoader(manager);

let puckle, sphere_puckle

loader.load('./objects/puckle/puckle.glb', function ( gltf ) {
    puckle = gltf.scene;  // puckle 3D object is loaded
    puckle.scale.set(0.05, 0.05, 0.05);
    let i=10
    let l=10
    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    puckle.position.setFromSphericalCoords( 10.3, phi, theta );
    const vector = new THREE.Vector3();
    vector.copy( puckle.position ).multiplyScalar( 2 );
    var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( puckle.quaternion );
    puckle.lookAt( direction );
    puckle.rotation.z = -0.26;
    puckle.rotation.y = 0.10;
    puckle.rotation.x = 0.12;
    group.add(puckle);
    // const light = new THREE.();
    // const light = new THREE.PointLight( 'red', 1, 100 );
    var light = new THREE.DirectionalLight( 0x00ffff, 1 );
    light.position.set( 0, 11, 0 );
    group.add( light );

    const geometry2 = new THREE.SphereGeometry( 2.5 );
    const materials = new THREE.MeshBasicMaterial({
      color: 'red',
      transparent: true,
      opacity: 0
      });
      sphere_puckle = new THREE.Mesh( geometry2, materials );
      sphere_puckle.name = "sphere_puckle";
      sphere_puckle.position.set(puckle.position.x +1.9, puckle.position.y-1.5, puckle.position.z+1.4);
    //   sphere_puckle.lookAt( direction );
    //   sphere_puckle.rotation.z = -0.26;
    //   sphere_puckle.rotation.y = 0.10;
    //   sphere_puckle.rotation.x = 0.12;

      group.add( sphere_puckle );

  }, undefined, function ( error ) {
    console.error( error );
  } );