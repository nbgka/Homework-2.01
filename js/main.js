import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var width = window.innerWidth;
var height = window.innerHeight;

// Set up the scene
var scene = new THREE.Scene();

////////////CAMERA////////////////////////////////
// Add a camera
var camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
camera.position.z = 0;
camera.position.y = 30;
camera.rotation.x = -0.1;

// Create a renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

////////////OBJECTS//////////////////////////////
// Add objects to the scene
var geometry = new THREE.IcosahedronGeometry(1, 0);
var material = new THREE.MeshStandardMaterial({color: 0x0000ff, metalness: 0.9, roughness: 0});
var icosahedron = new THREE.Mesh(geometry,material);
scene.add(icosahedron);

const icosahedronX = 15;
const icosahedronY = 15;
const icosahedronZ = -12;
icosahedron.position.set(icosahedronX,icosahedronY,icosahedronZ);

icosahedron.scale.x = 10;
icosahedron.scale.y = 10;
icosahedron.scale.z = 10;

// Add Octahedron
var geometry = new THREE.OctahedronGeometry(1, 0);
var material = new THREE.MeshStandardMaterial({color: 0x470066, metalness: 0.9, roughness: 0});
var octahedron = new THREE.Mesh(geometry,material);
scene.add(octahedron);

const octahedronX = -15;
const octahedronY = 10;
const octahedronZ = 15;
octahedron.position.set(octahedronX,octahedronY,octahedronZ);

octahedron.scale.x = 10;
octahedron.scale.y = 10;
octahedron.scale.z = 10;

//Add Tetrahedron
var geometry = new THREE.TetrahedronGeometry(1, 0);
var material = new THREE.MeshStandardMaterial({color: 0xffbdf6, metalness: 0.9, roughness: 0});
var tetrahedron = new THREE.Mesh(geometry,material);
scene.add(tetrahedron);

const tetrahedronX = -3;
const tetrahedronY = 5;
const tetrahedronZ = 0;
tetrahedron.position.set(tetrahedronX,tetrahedronY,tetrahedronZ);

tetrahedron.scale.x = 5;
tetrahedron.scale.y = 5;
tetrahedron.scale.z = 5;

////////MODELS/////////////////////////////
// Add reflection model
var reflection;
var mixer; // Three.JS AnimationMixer
var reflect_anim_SPIN; // Animation SPIN
const gltfLoader2 = new GLTFLoader();
gltfLoader2.load('../media/models/reflectionModel.glb', function(gltf){
    reflection = gltf.scene;
    reflection.scale.set(1.5,1.5,1.5);
    reflection.rotation.x = Math.PI/3;
    reflection.rotation.y = Math.PI/2;
    reflection.rotation.z = Math.PI/1.95;
    reflection.position.set(0,20,0);
    
    // Add metal material
    var material = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0});
    reflection.traverse(function(child){
        if(child.isMesh){
            child.material = material;
        }
    });

    scene.add(reflection);

    //Animation Mixer
    mixer = new THREE.AnimationMixer(reflection);
    reflect_anim_SPIN = gltf.animations[0]; // First animation
    mixer.clipAction( reflect_anim_SPIN ).play();
});

// Add floor plane
const geometryPlane = new THREE.PlaneGeometry( 1, 1 );
const materialPlane = new THREE.MeshLambertMaterial( {color: "#000000", side: THREE.DoubleSide, metalness: 0.9, roughness: 0} );
const plane = new THREE.Mesh( geometryPlane, materialPlane);
scene.add( plane );

plane.rotation.x = THREE.MathUtils.degToRad(90);
plane.scale.x = 60;     
plane.scale.y = 60;

// Add walls
const wallGeometry = new THREE.PlaneGeometry(60, 30);
const wallMaterial = new THREE.MeshStandardMaterial({color: "#000000", side: THREE.DoubleSide, metalness: 0.9, roughness: 0});

// Back Wall (wall 1)
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 15, -30);
scene.add(wall1);

// Right Wall (wall 2)
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(30, 15, 0);
wall2.rotation.y = Math.PI / 2;
scene.add(wall2);

// Front Wall (wall 3)
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.position.set(0, 15, 30);
wall3.rotation.y = Math.PI;
scene.add(wall3);

// Left Wall (wall 4)
const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.position.set(-30, 15, 0);
wall4.rotation.y = -Math.PI / 2;
scene.add(wall4);

////////////LIGHTING////////////
// Add lighting to the scene
var lightSize = 100;
var pointLight = new THREE.PointLight(0xFFFFF,lightSize,200)
pointLight.position.set(-6,1,0); // Adjust position as needed
scene.add(pointLight);
// var pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

var lightSize = 100;
var pointLight = new THREE.PointLight(0xff6363,lightSize,200)
pointLight.position.set(15,0,0); // Adjust position as needed
scene.add(pointLight);
// var pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

var lightSize = 500;
var pointLight = new THREE.PointLight(0xffbdf6,lightSize,200)
pointLight.position.set(0,20,0); // Adjust position as needed
scene.add(pointLight);
// var pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

var lightSize = 100;
var pointLight = new THREE.PointLight(0xFFFFF,lightSize,200)
pointLight.position.set(-15,5,25); // Adjust position as needed
scene.add(pointLight);
// var pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

var lightSize = 100;
var pointLight = new THREE.PointLight(0xffbdf6,lightSize,200)
pointLight.position.set(0,0,0); // Adjust position as needed
scene.add(pointLight);
// var pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

var ambientLight = new THREE.AmbientLight(0x141414, 5);
scene.add(ambientLight);

///////////////CONTROLS////////////////////////
// Adding Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.autoRotateSpeed = 0.5;

// Responsive window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
const clock = new THREE.Clock();

function animate(){
    requestAnimationFrame(animate);

    controls.update();

    // Rotatation Icosahedron
    icosahedron.rotation.x += 0.001;
    icosahedron.rotation.y += 0.01;

    // Rotatation Octahedron
    octahedron.rotation.x += 0.001;
    octahedron.rotation.y += 0.00001;

    // Rotatation Tetrahedron
    tetrahedron.rotation.x += 0.01;
    tetrahedron.rotation.y += 0.01;

    if(mixer){
        mixer.update(clock.getDelta());
    }

    renderer.render(scene,camera);
}

animate();
