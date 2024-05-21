let scene, camera, renderer, ufo, mixer, front, back, left, right, top, bottom, poem, poemMesh,Cube, ambient, directionalLight, container;


// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';



// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
 
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

import { Gradient } from './Gradient.js'

// Create your instance
const gradient = new Gradient()

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas')

let sceneContainer = document.querySelector("#scene-container")


function init() {
    scene = new THREE.Scene();
    // scene.background = new THREE.TextureLoader()
      
    // trial
    // container = document.createElement( 'div' );
	// document.body.appendChild( container );

    ;// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

    
const light = new THREE.DirectionalLight(0xffffff,3);
light.position.set(3,4,5);
scene.add(light);

const lightLeft = new THREE.DirectionalLight(0xffffff,3);
light.position.set(-3,4,5);
scene.add(lightLeft);

camera = new THREE.PerspectiveCamera(
    70, //set field of view
    sceneContainer.clientWidth / sceneContainer.clientHeight, //set aspect ratio
    0.01,  //set camera for near plane
    3000 //set camera for far plane
);

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

let mixer;
    loader.load('assets/ufo.gltf',function (gltf){
        ufo =gltf.scene;
        scene.add(ufo);
        ufo.scale.set(2,2,2);
        ufo.position.set(0, -15, 0);
        ufo.rotation.y += 0.01;
        mixer = new THREE.AnimationMixer(ufo); 
        const clips = gltf.animations;

        clips.forEach(function (clip) {
           const action = mixer.clipAction(clip); 
             action.play(); 
        });
})
// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


front
const frontLoader = new THREE.TextureLoader();
front = frontLoader.load('./textures/front.png');
const frontMaterial = new THREE.MeshBasicMaterial({ map: front, transparent: true });
const frontGeometry = new THREE.BoxGeometry(20, 20, 0);
const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
frontMesh.position.set(0, 0, -10);
scene.add(frontMesh);


 //back
 const backLoader = new THREE.TextureLoader();
 back = backLoader.load('./textures/back.png');
 const backMaterial = new THREE.MeshBasicMaterial({ map: back, transparent: true });
 const backGeometry = new THREE.BoxGeometry(20, 20, 0); 
 const backMesh = new THREE.Mesh(backGeometry, backMaterial);
 backMesh.position.set(0, 0, 10);
 scene.add(backMesh);

//left
const leftLoader = new THREE.TextureLoader();
left = leftLoader.load('./textures/left.png');
const leftMaterial = new THREE.MeshBasicMaterial({ map: left, transparent: true });
const leftGeometry = new THREE.BoxGeometry(0, 20, 20);
const leftMesh = new THREE.Mesh(leftGeometry, leftMaterial);
leftMesh.position.set(-10, 0, 0);
scene.add(leftMesh);

//right
const rightLoader = new THREE.TextureLoader();
right = rightLoader.load('./textures/right.png');
const rightMaterial = new THREE.MeshBasicMaterial({ map: right, transparent: true });
const rightGeometry = new THREE.BoxGeometry(0, 20, 20);
const rightMesh = new THREE.Mesh(rightGeometry, rightMaterial);
rightMesh.position.set(10, 0, 0);
scene.add(rightMesh);

 //bottom 
 const bottomLoader = new THREE.TextureLoader();
 bottom = bottomLoader.load('./textures/bottom.png');
 const bottomMaterial = new THREE.MeshBasicMaterial({ map: bottom, transparent: true });
 const bottomGeometry = new THREE.BoxGeometry(20, 0, 20);
 const bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial);
 bottomMesh.position.set(0, -10, 0); 

 scene.add(bottomMesh);

  top
  const topLoader = new THREE.TextureLoader();
  top = topLoader.load('./textures/top.png');
  const topMaterial = new THREE.MeshBasicMaterial({ map: top, transparent: true });
  const topGeometry = new THREE.BoxGeometry(20, 0, 20);
  const topMesh = new THREE.Mesh(topGeometry, topMaterial);
  topMesh.position.set(0, 10, 0); // x, y, z
  scene.add(topMesh);

  //add poem
  const poemLoader = new THREE.TextureLoader();
  poem = poemLoader.load('./textures/poem.png');
  const poemMaterial = new THREE.MeshBasicMaterial({ map: poem, transparent: true });
  const poemGeometry = new THREE.BoxGeometry(0, 1, 1);
  poemMesh = new THREE.Mesh(poemGeometry, poemMaterial);
  poemMesh.position.set(5, 0, 0);
  scene.add(poemMesh);

camera.position.z = 3;
camera.position.x = 3;
// controls.update();
}

// end trial

function animate() {
//  if (mixer)
//     mixer.update(clock.getDelta());
   
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    poemMesh.rotation.y = 190;
    poemMesh.scale.set(5,5,5);

    if (ufo){
        ufo.rotation.y = Math.sin(Date.now() / 1000) * .5;
    }

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

     window = window.innerWidth ;
	 window = window.innerHeight;

}
//  window.addEventListener('resize',onWindowResize, false);

init();
animate();
