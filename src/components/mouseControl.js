import * as THREE from 'three'

export var MouseSelectedObj = null;

export function MouseControl(document, renderer, camera, scene) {
    var raycaster = new THREE.Raycaster();
    // var update = setInterval(UPDATE, 60);

    function onDocumentMouseDown(event)
    {
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0)
        {
            if (intersects[0].object.name !== "" && MouseSelectedObj == null)
            {
                MouseSelectedObj = intersects[0].object.parent;
            }
            else if (MouseSelectedObj != null)
            {
                console.log("Placed!");
                
                MouseSelectedObj = null;

            }
        }
        
    }

    function onDocumentMouseMove(event)
    {
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (MouseSelectedObj != null)
        {
            var pos = intersects[0].point;
            MouseSelectedObj.position.x = pos.x;
            MouseSelectedObj.position.z = pos.z;
        }
    }

    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mousedown", onDocumentMouseDown, false);
}