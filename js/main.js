

	let container, stats, camera, scene, renderer, controls, front, back, left, right, top, bottom,videoMesh  ;



import * as THREE from 'three';
            
            //trial

            import { Gradient } from './Gradient.js'
			// Create your instance
            const gradient = new Gradient()

            // Call `initGradient` with the selector to your canvas
            gradient.initGradient('#gradient-canvas')

			let sceneContainer = document.querySelector("#scene-container")
            
            //end trial
            
			import Stats from 'three/addons/libs/stats.module.js';

			import { FlyControls } from 'three/addons/controls/FlyControls.js';
			import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

			// let container, stats;

			// let camera, scene, renderer;
			// let controls;

			const clock = new THREE.Clock();

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				// camera

				camera = new THREE.PerspectiveCamera( 40, sceneContainer.clientWidth / sceneContainer.clientHeight, 1, 15000 );
				// camera.position.z = 3;
				// camera.position.x = 3;

				// scene

				scene = new THREE.Scene();
				//  scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01, THREE.SRGBColorSpace );
				//  scene.fog = new THREE.Fog( scene.background, 3500, 15000 );

				// world

				const s = 250;

				const geometry = new THREE.BoxGeometry( s, s, s );
				const material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 5, } );

				for ( let i = 0; i < 300; i ++ ) {

					const mesh = new THREE.Mesh( geometry, material );

					mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
					mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
					mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

					mesh.rotation.x = Math.random() * Math.PI;
					mesh.rotation.y = Math.random() * Math.PI;
					mesh.rotation.z = Math.random() * Math.PI;

					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();

					scene.add( mesh );

				}


				// lights

				const dirLight = new THREE.DirectionalLight( 0xffffff, 0.15 );
				dirLight.position.set( 0, - 1, 0 ).normalize();
				dirLight.color.setHSL( 0.1, 0.7, 0.5 );
				scene.add( dirLight );

				// lensflares
				const textureLoader = new THREE.TextureLoader();

				const textureFlare0 = textureLoader.load( 'textures/lensflare0.png' );
				const textureFlare3 = textureLoader.load( 'textures/lensflare3.png' );

				addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

				function addLight( h, s, l, x, y, z ) {

					const light = new THREE.PointLight( 0xffffff, 1.5, 2000, 0 );
					light.color.setHSL( h, s, l );
					light.position.set( x, y, z );
					scene.add( light );

					const lensflare = new Lensflare();
					lensflare.addElement( new LensflareElement( textureFlare0, 700, 0) );
					lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6));
					lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7) );
					lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9) );
					lensflare.addElement( new LensflareElement( textureFlare3, 70, 1) );
					light.add( lensflare );

				}

				// renderer
                const renderContainer = document.createElement('div');
                sceneContainer.appendChild(renderContainer);
				renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( sceneContainer.clientWidth, sceneContainer.clientHeight );
				sceneContainer.appendChild( renderer.domElement );

				//Controls

				controls = new FlyControls( camera, renderer.domElement );

				controls.movementSpeed = 100;
				controls.domElement = sceneContainer;
				controls.rollSpeed = Math.PI / 9;
				controls.autoForward = false;
				controls.dragToLook = false;

				// stats

				stats = new Stats();
				container.appendChild( stats.dom );

				// events

				window.addEventListener( 'resize', onWindowResize );

             
				//trial cube
				front
const frontLoader = new THREE.TextureLoader();
front = frontLoader.load('./textures/front.png');
const frontMaterial = new THREE.MeshBasicMaterial({ map: front, transparent: true });
const frontGeometry = new THREE.BoxGeometry(200, 200, 0);
const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
frontMesh.position.set(0, 0, -100);

let video = document.getElementById('video'); //link video HTML to javascript

const videoElement = document.getElementById('video');
  const muteButton = document.getElementById('mute-button');

  videoElement.muted = false;

  muteButton.addEventListener('click', toggleMute);

  function toggleMute() {
	videoElement.muted = !videoElement.muted;
	if (videoElement.muted) {
	  muteButton.textContent = 'Unmute';
	} else {
	  muteButton.textContent = 'Mute';
	}
  }
  


let videoTexture = new THREE.VideoTexture(video); // create exture for 
const videoLoader = new THREE.TextureLoader();

video = videoLoader.load('./media/outside.mp4');
const videoMaterial = new THREE.MeshBasicMaterial({map:videoTexture});
const videoGeometry = new THREE.BoxGeometry(0,200,200);
videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
videoMesh.position.set(101,0,0);
scene.add(videoMesh);

scene.add(frontMesh);


 //back
 const backLoader = new THREE.TextureLoader();
 back = backLoader.load('./textures/back.png');
 const backMaterial = new THREE.MeshBasicMaterial({ map: back, transparent: true });
 const backGeometry = new THREE.BoxGeometry(200, 200, 0); 
 const backMesh = new THREE.Mesh(backGeometry, backMaterial);
 backMesh.position.set(0, 0, 100);

 video = videoLoader.load('./media/outside.mp4');
 videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
 videoMesh.position.set(-99,0,0);
 scene.add(videoMesh);

 scene.add(backMesh);

//left
const leftLoader = new THREE.TextureLoader();
left = leftLoader.load('./textures/left.png');
const leftMaterial = new THREE.MeshBasicMaterial({ map: left, transparent: true });
const leftGeometry = new THREE.BoxGeometry(0, 200, 200);
const leftMesh = new THREE.Mesh(leftGeometry, leftMaterial);
leftMesh.position.set(-100, 0, 0);


// let video = document.getElementById('video'); //link video HTML to javascript
// let videoTexture = new THREE.VideoTexture(video); // create exture for 
// const videoLoader = new THREE.TextureLoader();
video = videoLoader.load('./media/outside.mp4');
// const videoMaterial = new THREE.MeshBasicMaterial({map:videoTexture});
// const videoGeometry = new THREE.BoxGeometry (200,200,0);
videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
videoMesh.position.set(0,0,101);
videoMesh.rotation.y = Math.PI / 2;

scene.add(videoMesh);

scene.add(leftMesh);

//right
const rightLoader = new THREE.TextureLoader();
right = rightLoader.load('./textures/right.png');
const rightMaterial = new THREE.MeshBasicMaterial({ map: right, transparent: true });
const rightGeometry = new THREE.BoxGeometry(0, 200, 200);
const rightMesh = new THREE.Mesh(rightGeometry, rightMaterial);
rightMesh.position.set(100, 0, 0);


// let video = document.getElementById('video'); //link video HTML to javascript
// let videoTexture = new THREE.VideoTexture(video); // create exture for 
// const videoLoader = new THREE.TextureLoader();
video = videoLoader.load('./media/outside.mp4');
// const videoMaterial = new THREE.MeshBasicMaterial({map:videoTexture});
// const videoGeometry = new THREE.BoxGeometry (200,200,0);
videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
videoMesh.position.set(0,0,-99);
videoMesh.rotation.y = Math.PI / 2;
scene.add(videoMesh);

scene.add(rightMesh);

 //bottom 
 const bottomLoader = new THREE.TextureLoader();
 bottom = bottomLoader.load('./textures/bottom.png');
 const bottomMaterial = new THREE.MeshBasicMaterial({ map: bottom, transparent: true });
 const bottomGeometry = new THREE.BoxGeometry(200, 0, 200);
 const bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial);
 bottomMesh.position.set(0, -100, 0); 

 scene.add(bottomMesh);

  top
  const topLoader = new THREE.TextureLoader();
  top = topLoader.load('./textures/top.png');
  const topMaterial = new THREE.MeshBasicMaterial({ map: top, transparent: true });
  const topGeometry = new THREE.BoxGeometry(200, 0, 200);
  const topMesh = new THREE.Mesh(topGeometry, topMaterial);
  topMesh.position.set(0, 100, 0); // x, y, z

  scene.add(topMesh);



 

  camera.position.z = 3;
  camera.position.x = 3;
			}



			//

			function onWindowResize() {

				renderer.setSize( sceneContainer.clientWidth, sceneContainer.clientHeight );

				camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
				camera.updateProjectionMatrix();

				// trial
				// window = window.innerWidth ;
				// window = window.innerHeight;
				//end trial

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				// renderer.render( scene, camera );
				render();
				stats.update();

			}

			function render() {

				const delta = clock.getDelta();

				controls.update( delta );
				renderer.render( scene, camera );

			}
