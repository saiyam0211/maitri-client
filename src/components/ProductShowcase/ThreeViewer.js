// src/components/ProductShowcase/ThreeViewer.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class ThreeViewer {
  constructor(container, modelPath, isCentered = true) {
    this.container = container;
    this.modelPath = modelPath;
    this.isCentered = isCentered;
    
    // Initialize core components
    this.scene = new THREE.Scene();
    this.loadingManager = new THREE.LoadingManager();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');
    
    this.init();
    this.setupLighting();
    this.loadModel();
    this.animate();
  }

  init() {
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);

    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = this.isCentered ? 2 : 4;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    this.scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 0, -5);
    this.scene.add(fillLight);

    // Environment map
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    
    new THREE.TextureLoader().load(
      '/textures/environment.jpg',
      (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        this.scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      }
    );
  }

  loadModel() {
    const loader = new GLTFLoader(this.loadingManager);
    loader.setDRACOLoader(this.dracoLoader);
    
    loader.load(
      this.modelPath,
      (gltf) => {
        if (this.model) {
          this.scene.remove(this.model);
        }

        this.model = gltf.scene;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        this.model.scale.multiplyScalar(scale);
        this.model.position.sub(center.multiplyScalar(scale));

        // Enhance materials
        this.model.traverse((child) => {
          if (child.isMesh) {
            child.material.envMapIntensity = 1.5;
            child.material.needsUpdate = true;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(this.model);
      },
      // Progress callback
      (xhr) => {
        console.log(`Loading model: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
      },
      // Error callback
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  onWindowResize() {
    if (this.container && this.camera && this.renderer) {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
  }

  animate() {
    if (!this.renderer) return;

    requestAnimationFrame(this.animate.bind(this));
    
    if (this.controls) {
      this.controls.update();
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.model) {
      this.scene.remove(this.model);
      this.model.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
    }
    
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    while(this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}