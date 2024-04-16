import { FloorMeshLoader } from "./floorLoader";
import { WallMeshLoader } from "./wallLoader";



export class Room
{
    floor: any
    walls: any

    public roomVar = {
        width: 30,
        length: 30,
        height: 30,
    }
      
    roomConstant = {
        width: 30,
        length: 30,
    }

    constructor(scene)
    {
        this.floor = FloorMeshLoader(this.roomVar.width, this.roomVar.length);
        scene.add(this.floor);

        this.walls = WallMeshLoader(this.roomVar.height);
        this.walls.forEach((item) => {
            scene.add(item);
        })

        this.roomVar.width = 60;
        this.roomVar.length = 60;

        this.updateRoom();
    }

    public updateRoom() : void
    {
        this.floor.scale.x = this.roomVar.length / this.roomConstant.length;
        this.floor.scale.z = this.roomVar.width / this.roomConstant.width;

    
        this.walls[0].position.z = -15 - (this.roomVar.width - this.roomConstant.width) / 2;
        this.walls[0].scale.x = this.floor.scale.x;
        this.walls[1].position.z = 15 + (this.roomVar.width - this.roomConstant.width) / 2;
        this.walls[1].scale.x = this.floor.scale.x;
        this.walls[2].position.x = 15 + (this.roomVar.length - this.roomConstant.length) / 2;
        this.walls[2].scale.z = this.floor.scale.z;
    }
}