import * as THREE from 'three'
import MouseMeshInteraction from './modules/three_mmi.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './objects/pool_table/pool_table.js';
import './objects/mobile_tinsel/mobile_tinsel.js';
import './objects/smart_lock/smart_lock.js';
import './objects/rowing/rowing.js';
import './objects/satellite/satellite.js';
import './objects/puckle/puckle.js';
import {sphere, atmosphere, stars} from './planet.js'
import {closeModalButtons, overlay, openModal, closeModal} from './modal_controller.js';

// import {description_area_onWindowResize} from './description_area.js'
// import { CanvasUI } from '/jsm/CanvasUI.js';
// import ThreeMeshUI from 'three-mesh-ui'


// Initialize scene and camera
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#planet'),
  antialias: true,
});
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
// scene.background = new THREE.Color( 0x5555ff );
scene.background = new THREE.Color( 0x0C8DE8 );
var clock = new THREE.Clock();
var delta, elapsed

// Group and scene management
const group = new THREE.Group();
const satelliteGroup = new THREE.Group();
group.add(sphere);
group.add(atmosphere);
scene.add(group);
scene.add(satelliteGroup);
scene.add(stars);

// Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 25;
controls.maxDistance = 50;
controls.enablePan = false;
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.update();

// Event listener for window resizing
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // description_area_onWindowResize();
}

// Mouse interaction
const mmi = new MouseMeshInteraction(scene, camera);
//#region mmi

//Pool Table
mmi.addHandler("cube_pool_table", 'click', function(mesh) {
  document.getElementById("pool_sound").play();
  // window.alert("Interactive Pool Project");
  openModal(document.querySelector('#modal'), 'pool_table');
});
mmi.addHandler("cube_pool_table", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
});
mmi.addHandler("cube_pool_table", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
});


//Smart Lock
mmi.addHandler("cube_smart_lock", 'click', function(mesh) {
  document.getElementById("smart_lock_sound").play();
  // window.alert("Smart Lock Project");
  openModal(document.querySelector('#modal'), 'smart_lock');
});
mmi.addHandler("cube_smart_lock", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
});
mmi.addHandler("cube_smart_lock", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
});


//Mobile Tinsel
mmi.addHandler("cube_mobile_tinsel", 'click', function(mesh) {
  document.getElementById("mobile_tinsel_sound").play();
  // window.alert("Mobile Tinsels Project");
  openModal(document.querySelector('#modal'), 'mobile_tinsels');
});
mmi.addHandler("cube_mobile_tinsel", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
});
mmi.addHandler("cube_mobile_tinsel", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
});


//Antenna & Satellite
mmi.addHandler("cube_antenna", 'click', function(mesh) {
  let satellite_sound = document.getElementById("satellite_sound")
  satellite_sound.play();
  satellite_sound.volume = 0.4;
  // window.alert("Hack the satellite Project!");
  openModal(document.querySelector('#modal'), 'satellite');
});
mmi.addHandler("cube_antenna", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
  scene.children[1].children[1].material.opacity = 0.4;
});
mmi.addHandler("cube_antenna", 'mouseleave', function(mesh) {
  scene.children[1].children[1].material.opacity = 0;
  mesh.material.opacity = 0;
});
mmi.addHandler("sphere_satellite", 'click', function(mesh) {
  let satellite_sound = document.getElementById("satellite_sound")
  satellite_sound.play();
  satellite_sound.volume = 0.4;
  // window.alert("Hack the satellite Project!");
  openModal(document.querySelector('#modal'), 'satellite');
});
mmi.addHandler("sphere_satellite", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
  scene.children[0].children[14].material.opacity = 0.4;
});
mmi.addHandler("sphere_satellite", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
  scene.children[0].children[14].material.opacity = 0;
});


//Rowing
mmi.addHandler("sphere_rowing", 'click', function(mesh) {
  document.getElementById("rowing_sound").play();
  // window.alert("My passion : rowing!");
  openModal(document.querySelector('#modal'), 'rowing');
});
mmi.addHandler("sphere_rowing", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
});
mmi.addHandler("sphere_rowing", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
});

//Puckle
mmi.addHandler("sphere_puckle", 'click', function(mesh) {
  document.getElementById("puckle_sound").play();
  // window.alert("My passion : puckle!");
  openModal(document.querySelector('#modal'), 'puckle');
});
mmi.addHandler("sphere_puckle", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
});
mmi.addHandler("sphere_puckle", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
});

//#endregion


//When button triggered, open modal
about_button.addEventListener("click", function() {
  document.getElementById("smart_lock_sound").play();
  openModal(document.querySelector('#modal'), 'about');
});

//when download button triggered, play download sound
download_ENG.addEventListener("click", function() {
  document.getElementById("download_sound").play();
});
download_FR.addEventListener("click", function() {
  document.getElementById("download_sound").play();
});

// const ui = new CanvasUI(  );
// ui.mesh.position.set(0, -0.5, -1);
// ui.updateElement("body", "Hello World" );

// scene.add(ui.mesh);
// let ui = new CanvasUI();
// ui.mesh.position.set(0, -0.5, -1);
// ui.updateElement("body", "Hello World" );
// scene.add(ui.mesh);

// ui.updateElement("body", "Hello World");

// ui.mesh.position.set(0, 1.5, -1.2);
// scene.add(ui)



// const container = new ThreeMeshUI.Block({
//   width: 10.2,
//   height: 12.7,
//   padding: 0.2,
//   fontFamily: './assets/Roboto-msdf.json',
//   fontTexture: './assets/Roboto-msdf.png',
//  });
 
//  //
 
//  const text = new ThreeMeshUI.Text({
//   content: "Some text to be displayed"
//  });
 
//  container.add( text );
//  container.position.set( 10, 1, -1.8 );
 
//  // scene is a THREE.Scene (see three.js)
//  scene.add( container );


function animate() {
  requestAnimationFrame(animate);
  onWindowResize();
  // ThreeMeshUI.update();
  // ui.update();
  //Sattelite rotation
  delta = clock.getDelta();
  elapsed = clock.elapsedTime;
  satelliteGroup.position.x =  Math.sin(elapsed * 0.5) * 25;
  satelliteGroup.position.z = Math.cos(elapsed  * 0.5) * 25;
  satelliteGroup.rotation.x += 0.4 * delta;
  satelliteGroup.rotation.y += 0.2 * delta;

  //Planet rotation
  group.rotation.x += 0.001;
  group.rotation.y += 0.003;
  
  mmi.update();
  controls.update();
  renderer.render(scene, camera);
}

animate();

export {group, satelliteGroup};