import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {GUI} from './modules/dat.gui.module';


const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#bg'),
  antialias: true,
});
const group = new THREE.Group();
const gui = new GUI();
 
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
scene.background = new THREE.Color( 0x5555ff );
var loader = new GLTFLoader();
camera.position.set(0, 0, 15);
var clock = new THREE.Clock();
var delta, elapsed, mouse, raycaster

//Shpere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 50, 50), 
                            new THREE.ShaderMaterial(
                              {
                                // color: 0xff0000
                                // map: new THREE.TextureLoader().load('img/myPlanet1.jpg')
                                vertexShader,
                                fragmentShader,
                                uniforms: {
                                  globeTexture : {
                                    value: new THREE.TextureLoader().load('img/myPlanet1.jpg')
                                  }
                                }
                              }));
//Set name
sphere.name = 'sphere';
// gui.add(sphere.position, 'x', -10, 10);


//Atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 50, 50), 
  new THREE.ShaderMaterial(
    {
      vertexShader : atmosphereVertexShader,
      fragmentShader : atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      transparent: true,
      opacity: 0.5,
    }
  )
);
atmosphere.scale.set(1.1, 1.1, 1.1);

//axis
const dirX = new THREE.Vector3(1, 0, 0);
const dirY = new THREE.Vector3(0, 1, 0);
const dirZ = new THREE.Vector3(0, 0, 1);
const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1;
const hex = 0xffff00;

const arrowHelperX = new THREE.ArrowHelper( dirX, origin, length, hex );
//color in red
arrowHelperX.setColor( 0xff0000 );
const arrowHelperY = new THREE.ArrowHelper( dirY, origin, length, hex );
//color in green
arrowHelperY.setColor( 0x00ff00 );
const arrowHelperZ = new THREE.ArrowHelper( dirZ, origin, length, hex );
//color in blue
arrowHelperZ.setColor( 0x0000ff );
scene.add( arrowHelperX );
scene.add( arrowHelperY );
scene.add( arrowHelperZ );



//Pool table
loader.load('./objects/pool_table/pool_table_set.glb', function ( gltf ) {
  let pool = gltf.scene;  // pool 3D object is loaded
  pool.scale.set(0.0001, 0.0001, 0.0001);
  //set name
  pool.name = 'pool_table';
  let i=5
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  pool.position.setFromSphericalCoords( 10.2, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( pool.position ).multiplyScalar( 2 );
  // pool.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( pool.quaternion );
  pool.lookAt( direction );

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, pool.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(pool.position, 'x', -10, 10);
  // gui.add(pool.position, 'y', -10, 10);
  // gui.add(pool.position, 'z', -10, 10);
  // gui.add(pool.rotation, 'x', -10, 10);
  // gui.add(pool.rotation, 'y', -10, 10);
  // gui.add(pool.rotation, 'z', -10, 10);

	group.add(pool);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
	console.error( error );
} );

let smartphone
//Smart Lock
loader.load('./objects/smart_lock/Red_Smartphone.glb', function ( gltf ) {
  smartphone = gltf.scene;  // smartphone 3D object is loaded
  smartphone.scale.set(3,3,3);
  //set name
  smartphone.name = 'smartphone';
  // smartphone.scale.set(0.0001, 0.0001, 0.0001);
  let i=7.2
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  smartphone.position.setFromSphericalCoords( 11.8, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( smartphone.position ).multiplyScalar( 2 );
  // smartphone.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( smartphone.quaternion );
  smartphone.lookAt( direction );

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, smartphone.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(smartphone.position, 'x', -10, 10);
  // gui.add(smartphone.position, 'y', -10, 10);
  // gui.add(smartphone.position, 'z', -10, 10);
  // gui.add(smartphone.rotation, 'x', -10, 10);
  // gui.add(smartphone.rotation, 'y', -10, 10);
  // gui.add(smartphone.rotation, 'z', -10, 10);

	group.add(smartphone);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load('./objects/smart_lock/gold_lock_improved.glb', function ( gltf ) {
  let lock = gltf.scene;  // lock 3D object is loaded
  lock.scale.set(0.05,0.05,0.05);
  let i=7.15
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  lock.position.setFromSphericalCoords( 10, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( lock.position ).multiplyScalar( 2 );
  // lock.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( lock.quaternion );
  lock.lookAt( direction );
  lock.rotation.y = 2.8;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, lock.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(lock.position, 'x', -10, 10);
  // gui.add(lock.position, 'y', -10, 10);
  // gui.add(lock.position, 'z', -10, 10);
  // gui.add(lock.rotation, 'x', -10, 10);
  // gui.add(lock.rotation, 'y', -10, 10);
  // gui.add(lock.rotation, 'z', -10, 10);

	group.add(lock);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load('./objects/smart_lock/rfid_readwrite_module_rc522.glb', function ( gltf ) {
  let rfid = gltf.scene;  // rfid 3D object is loaded
  // rfid.scale.set(0.05,0.05,0.05);
  rfid.scale.set(25,25,25);
  // rfid.scale.set(0.0001, 0.0001, 0.0001);
  let i=7.25
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  rfid.position.setFromSphericalCoords( 10.5, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( rfid.position ).multiplyScalar( 2 );
  // rfid.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( rfid.quaternion );
  rfid.lookAt( direction );
  // rfid.rotation.y = 2.5;
  rfid.rotation.x = -0.3;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, rfid.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(rfid.position, 'x', -10, 10);
  // gui.add(rfid.position, 'y', -10, 10);
  // gui.add(rfid.position, 'z', -10, 10);
  // gui.add(rfid.rotation, 'x', -10, 10);
  // gui.add(rfid.rotation, 'y', -10, 10);
  // gui.add(rfid.rotation, 'z', -10, 10);

	group.add(rfid);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
	console.error( error );
} );

//Mobile Tinsel
loader.load('./objects/mobile_tinsel/low_poly_circuit_board_pcb.glb', function ( gltf ) {
  let pcb = gltf.scene;  // pcb 3D object is loaded
  // pcb.scale.set(0.1,0.1,0.1);
  // pcb.scale.set(25,25,25);
  pcb.scale.set(1,1,1);
  // pcb.scale.set(0.0001, 0.0001, 0.0001);
  let i=3
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  pcb.position.setFromSphericalCoords( 10.01, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( pcb.position ).multiplyScalar( 2 );
  // pcb.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( pcb.quaternion );
  pcb.lookAt( direction );
  pcb.rotation.y = -0.5;
  // pcb.rotation.x = -0.3;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, pcb.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(pcb.position, 'x', -10, 10);
  // gui.add(pcb.position, 'y', -10, 10);
  // gui.add(pcb.position, 'z', -10, 10);
  // gui.add(pcb.rotation, 'x', -10, 10);
  // gui.add(pcb.rotation, 'y', -10, 10);
  // gui.add(pcb.rotation, 'z', -10, 10);

	group.add(pcb);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load('./objects/mobile_tinsel/led_light.glb', function ( gltf ) {
  let led_light = gltf.scene;  // led_light 3D object is loaded
  // led_light.scale.set(0.1,0.1,0.1);
  // led_light.scale.set(25,25,25);
  led_light.scale.set(0.3,0.3,0.3);
  // led_light.scale.set(0.0001, 0.0001, 0.0001);
  let i=3.15
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  led_light.position.setFromSphericalCoords( 11.5, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( led_light.position ).multiplyScalar( 2 );
  // led_light.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( led_light.quaternion );
  led_light.lookAt( direction );
  led_light.rotation.y = -0.5;
  // led_light.rotation.x = -0.3;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, led_light.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(led_light.position, 'x', -10, 10);
  // gui.add(led_light.position, 'y', -10, 10);
  // gui.add(led_light.position, 'z', -10, 10);
  // gui.add(led_light.rotation, 'x', -10, 10);
  // gui.add(led_light.rotation, 'y', -10, 10);
  // gui.add(led_light.rotation, 'z', -10, 10);

	group.add(led_light);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
	console.error( error );
} );

//Rowing
loader.load('./objects/rowing/rowing.glb', function ( gltf ) {
  let rowing = gltf.scene;  // rowing 3D object is loaded
  // rowing.scale.set(0.1,0.1,0.1);
  // rowing.scale.set(25,25,25);
  // rowing.scale.set(1,1,1);
  rowing.scale.set(0.02, 0.02, 0.02);
  let i=2
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  rowing.position.setFromSphericalCoords( 10.7, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( rowing.position ).multiplyScalar( 2 );
  // rowing.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( rowing.quaternion );
  rowing.lookAt( direction );
  rowing.rotation.z = -3;
  rowing.rotation.y = 7.5;
  rowing.rotation.x = -4.2;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, rowing.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(rowing.position, 'x', -10, 10);
  // gui.add(rowing.position, 'y', -10, 10);
  // gui.add(rowing.position, 'z', -10, 10);
  // gui.add(rowing.rotation, 'x', -10, 10);
  // gui.add(rowing.rotation, 'y', -10, 10);
  // gui.add(rowing.rotation, 'z', -10, 10);

  group.add(rowing);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
  console.error( error );
} );

//Antenna
loader.load('./objects/satellite/parabolic_antenna.glb', function ( gltf ) {
  let antenna = gltf.scene;  // antenna 3D object is loaded
  antenna.scale.set(0.5,0.5,0.5);
  let i=6
  let l=10
  const phi = Math.acos( - 1 + ( 2 * i ) / l );
  const theta = Math.sqrt( l * Math.PI ) * phi;
  antenna.position.setFromSphericalCoords( 10, phi, theta );
  const vector = new THREE.Vector3();
  vector.copy( antenna.position ).multiplyScalar( 2 );
  // antenna.lookAt( vector );
  var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( antenna.quaternion );
  antenna.lookAt( direction );
  // antenna.rotation.z = -3;
  // antenna.rotation.y = 7.5;
  // antenna.rotation.x = -4.2;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, antenna.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(antenna.position, 'x', -10, 10);
  // gui.add(antenna.position, 'y', -10, 10);
  // gui.add(antenna.position, 'z', -10, 10);
  // gui.add(antenna.rotation, 'x', -10, 10);
  // gui.add(antenna.rotation, 'y', -10, 10);
  // gui.add(antenna.rotation, 'z', -10, 10);

  group.add(antenna);
  const light = new THREE.HemisphereLight();
  group.add( light );
}, undefined, function ( error ) {
  console.error( error );
} );

//Satellite
const satelliteGroup = new THREE.Group();
scene.add(satelliteGroup);
let satellite;
loader.load('./objects/satellite/satellite.glb', function ( gltf ) {
  satellite = gltf.scene;  // satellite 3D object is loaded
  // satellite.scale.set(0.5,0.5,0.5);
  // satellite.scale.set(25,25,25);
  // satellite.scale.set(1,1,1);
  satellite.scale.set(0.001, 0.001, 0.001);
  // satellite.position.set(10,0,0);
  // let i=6
  // let l=10
  // const phi = Math.acos( - 1 + ( 2 * i ) / l );
  // const theta = Math.sqrt( l * Math.PI ) * phi;
  // satellite.position.setFromSphericalCoords( 10, phi, theta );
  // const vector = new THREE.Vector3();
  // vector.copy( satellite.position ).multiplyScalar( 2 );
  // // satellite.lookAt( vector );
  // var direction = new THREE.Vector3( 0, 90, 0 ).applyQuaternion( satellite.quaternion );
  // satellite.lookAt( direction );
  
  // satellite.rotation.z = -3;
  // satellite.rotation.y = 7.5;
  // satellite.rotation.x = -4.2;

  //Arrow Helpers
  // const origin = new THREE.Vector3( 0, 0, 0 );
  // const length = 5;
  // const hex = 0xffff00;
  // const arrowHelper = new THREE.ArrowHelper( vector, origin, length, hex );
  // scene.add( arrowHelper );
  // const arrowHelperTemp = new THREE.ArrowHelper( direction, satellite.position, length, hex );
  // scene.add( arrowHelperTemp );

  // gui.add(satellite.position, 'x', -10, 10);
  // gui.add(satellite.position, 'y', -10, 10);
  // gui.add(satellite.position, 'z', -10, 10);
  // gui.add(satellite.rotation, 'x', -10, 10);
  // gui.add(satellite.rotation, 'y', -10, 10);
  // gui.add(satellite.rotation, 'z', -10, 10);

  
  
  satelliteGroup.add(satellite);
  // const light = new THREE.HemisphereLight();
  // satelliteGroup.add( light );
}, undefined, function ( error ) {
  console.error( error );
} 
);

//On mouse hovering object
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();

function onMouseMove(event) {
 
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener('mousemove', onMouseMove, false);

function pickPiece() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    // You can do anything you want here, this is just an example to make the hovered object transparent
    const newMaterial = intersects[i].object.material.clone();
    newMaterial.transparent = true;
    newMaterial.opacity = 0.5;
    intersects[i].object.material = newMaterial;
    // intersects[i].object.material.color.set(0xff0000);
    // console.log(intersects[i].object.name);
    // intersects[i].transparent = true;
    // intersects[i].opacity = 0.5;
    // intersects[i].transparent = true;
  }
}

function resetMaterials() {
  console.log(scene.children);
  for (let i = 0; i< scene.children.length ; i++) {
    console.log(scene.children[i].name);
    if(scene.children[i].material) {
      scene.children[i].material.opacity = 1;
    }
  }
}


//Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 20;
controls.maxDistance = 50;
controls.enablePan = false;
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.update();

group.add(atmosphere);
group.add(sphere);
scene.add(group);

//Stars
const starGeometry = new THREE.BufferGeometry();
const sprite = new THREE.TextureLoader().load( 'img/disc.png' );
const starMaterial = new THREE.PointsMaterial(
   {size: 3, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
				starMaterial.color.setHSL( 1.0, 0.9, 0.9 );

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 1000;
  if(x*x + y*y + z*z > 10000) {
    starVertices.push(x, y, z);
  }
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Event listener for resizing the window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  onWindowResize();

  //Sattelite rotation
  delta = clock.getDelta();
  elapsed = clock.elapsedTime;
  satelliteGroup.position.x =  Math.sin(elapsed * 0.5) * 25;
  satelliteGroup.position.z = Math.cos(elapsed  * 0.5) * 25;
  satelliteGroup.rotation.x += 0.4 * delta;
  satelliteGroup.rotation.y += 0.2 * delta;
  pickPiece()
  // resetMaterials()

  requestAnimationFrame(animate);
  group.rotation.x += 0.001;
  group.rotation.y += 0.003;
  renderer.render(scene, camera);
  controls.update();

}
animate();

