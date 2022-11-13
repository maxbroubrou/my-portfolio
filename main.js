import * as THREE from 'three'
import MouseMeshInteraction from './modules/three_mmi.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './objects/pool_table/pool_table.js';
import './objects/mobile_tinsel/mobile_tinsel.js';
import './objects/smart_lock/smart_lock.js';
import './objects/rowing/rowing.js';
import './objects/satellite/satellite.js';
import {sphere, atmosphere, stars} from './planet.js'
import {description_area_onWindowResize} from './description_area.js'

// Initialize scene and camera
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#planet'),
  antialias: true,
});
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
scene.background = new THREE.Color( 0x5555ff );
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
  description_area_onWindowResize();
}

// Mouse interaction
const mmi = new MouseMeshInteraction(scene, camera);
//#region mmi

//Pool Table
mmi.addHandler("cube_pool_table", 'click', function(mesh) {
  document.getElementById("pool_sound").play();
  window.alert("Interactive Pool Project");
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
  window.alert("Smart Lock Project");
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
  window.alert("Mobile Tinsels Project");
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
  window.alert("Hack the satellite Project!");
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
  window.alert("Hack the satellite Project!");
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
  window.alert("My passion : rowing!");
});
mmi.addHandler("sphere_rowing", 'mouseenter', function(mesh) {
  mesh.material.opacity = 0.4;
});
mmi.addHandler("sphere_rowing", 'mouseleave', function(mesh) {
  mesh.material.opacity = 0;
});

//#endregion

let audio = document.getElementById("bg_music");
audio.volume = 0.2; 


function animate() {
  requestAnimationFrame(animate);
  onWindowResize();

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