import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from 'dat.gui'
import { MouseControl, MouseSelectedObj } from "./components/mouseControl";
import { FloorMeshLoader } from "./components/floorLoader";
import { GlobalLight } from "./components/globalLight";
import { WallMeshLoader } from "./components/wallLoader";
import { FbxLoader } from "./components/fbxLoader";

// Create scene and background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.1,0.1,0.1);

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
const roomFolder = gui.addFolder('Room')

let roomVar = {
  width: 30,
  length: 30,
}

const roomConstant = {
  width: 30,
  length: 30,
}

roomFolder.add(roomVar, 'width', 0, 100);
roomFolder.add(roomVar, 'length', 0, 100);


// Create control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.dampingFactor = 0.05;
controls.enableDamping = true;

var floor = FloorMeshLoader();
scene.add(floor);

var walls = WallMeshLoader();

(function () {
  
  walls.forEach((item) => {
    scene.add(item);
  })
  MouseControl(document, renderer, camera, scene);

  

  FbxLoader("table", "../assets/table/table.fbx", "../assets/table/texture.jpg", scene, 0, -15, -10, 0.01);
  FbxLoader("lamp", "../assets/lamp/lamp.fbx", "", scene, 0, -15, 10, 0.1);
  renderer.setAnimationLoop(() => {
    controls.update();

    updateRoom();

    if (MouseSelectedObj != null)
    {
      
    }

    renderer.render(scene, camera);
  });
})();

function updateRoom()
{
  floor.scale.x = roomVar.length / roomConstant.length;
  floor.scale.z = roomVar.width / roomConstant.width;

  
  walls[0].position.z = -15 - (roomVar.width - roomConstant.width) / 2;
  walls[0].scale.x = floor.scale.x;
  walls[1].position.z = 15 + (roomVar.width - roomConstant.width) / 2;
  walls[1].scale.x = floor.scale.x;
  walls[2].position.x = 15 + (roomVar.length - roomConstant.length) / 2;
  walls[2].scale.z = floor.scale.z;
}

// MOUSE CONTROL

var mouseControl = MouseControl(document, renderer, camera, scene);

