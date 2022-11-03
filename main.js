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
loader.load('./objects/pool_table/billiard_table.glb', function ( gltf ) {
  let pool = gltf.scene;  // pool 3D object is loaded
  pool.scale.set(3, 3, 3);
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

//On mouseover object



//Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 25;
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
  // const z = -Math.random() * 2000;
  starVertices.push(x, y, z);
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

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  group.rotation.y += 0.003;
  group.rotation.x += 0.001;
  controls.update();

}
animate();
