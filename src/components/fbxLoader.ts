import * as THREE from 'three'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"

export function FbxLoader(name, path, texPath, scene, position, rotation, scale = 0.01)
{
    const loader = new FBXLoader();
    // loader.load(path, (object) => {
    //     object.scale.set(scale, scale, scale);
    //     object.position.set(positionx, positiony, positionz);
    //     scene.add(object);
    // });
    loader.load(path, function(object) {
        object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                child.name = name;
                if ((child as THREE.Mesh).material) {
                    
                    if (texPath !== "")
                    {
                        const texture = new THREE.TextureLoader().load(texPath);
                        child.material.map = texture;
                    }
                }
            }
        })
        object.position.set(position.x, position.y, position.z);
        object.rotation.set(rotation.x, rotation.y, rotation.z);
        object.scale.set(scale, scale, scale)
        scene.add(object);
    })
}