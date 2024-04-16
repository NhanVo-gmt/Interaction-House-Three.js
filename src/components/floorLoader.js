import * as THREE from "three"

export function FloorMeshLoader()
{
    //create the material of the floor (basic material)
    var material_floor = new THREE.MeshPhongMaterial();
    material_floor.shininess = 100;
    material_floor.color = new THREE.Color(0.8,0.9,0.3);

    var normal_map = new THREE.TextureLoader().load('../../assets/floor/floor_normal.jpg');
    normal_map.wrapS = normal_map.wrapT = THREE.RepeatWrapping;
    normal_map.repeat=new THREE.Vector2(4,4);

    material_floor.normalMap= normal_map;

    var geometry_floor = new THREE.BoxGeometry(30,0.5,30);
    var meshFloor= new THREE.Mesh( geometry_floor, material_floor );
    meshFloor.position.y -= 15;
    meshFloor.receiveShadow=true;

    return meshFloor;
}