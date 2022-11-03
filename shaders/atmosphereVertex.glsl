varying vec3 vertexNormal;

void main () {
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}

// matrix = [
//     -1, 0, 0
//      0, 1, 0
//      1, 0, 0
// ]