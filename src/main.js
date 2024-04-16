import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from 'dat.gui'
import { MouseControl, MouseSelectedObj } from "./components/mouseControl";
import { ColorSetter } from "./components/colorSetter";
import { FloorMeshLoader } from "./components/floorLoader";
import { GlobalLight } from "./components/globalLight";

// Create scene and background
const scene = new THREE.Scene();
scene.background = new THREE.Color("#FFEECC");

// Create camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
// camera.position.set(20, 20, 20);
camera.position.set(-17, 31, 33);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
// Enable shadow for lighting
renderer.useLegacyLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const light = GlobalLight();
scene.add(light);

// Create Gui
const gui = new GUI();
const globallightFolder = gui.addFolder('GlobalLight')
globallightFolder.add(light, 'intensity', 0, 1);
// houseFolder.add(HouseControl, 'type', 0, 3);


// Create control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.dampingFactor = 0.05;
controls.enableDamping = true;


(function () {

  var floor = FloorMeshLoader();
  scene.add(floor)

  renderer.setAnimationLoop(() => {
    controls.update();

    if (MouseSelectedObj != null)
    {
      ColorSetter(MouseSelectedObj, HouseControl.color);
    }

    renderer.render(scene, camera);
  });
})();

// MOUSE CONTROL

var mouseControl = MouseControl(document, renderer, camera, scene);

