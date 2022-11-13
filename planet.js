import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

//Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 50, 50), 
                            new THREE.ShaderMaterial(
                              {
                                vertexShader,
                                fragmentShader,
                                uniforms: {
                                  globeTexture : {
                                    value: new THREE.TextureLoader().load('img/myPlanet1.jpg')
                                  }
                                }
                              }));
sphere.name = 'sphere';


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
      opacity: 0.6,
    }
  )
);
atmosphere.scale.set(1.1, 1.1, 1.1);

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

export {sphere, atmosphere, stars}