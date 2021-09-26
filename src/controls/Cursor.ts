import Phaser from 'phaser'

export class Cursor {

    scene!: Phaser.Scene
    map
    marker

    point
    pointerTileX
    pointerTileY

    constructor(scene,map) {
        this.scene = scene
        this.map = map
    }

    init = () => {
        // Create the square marker by drawing or by sprite
        this.marker = this.scene.add.graphics()
        //this.marker.lineStyle(2, 0xffffff, 1)
        //this.marker.strokeRect(0, 0, 16, 16)
        this.marker = this.scene.add.image(0,0,'marker').setOrigin(0,0)
    }
    update = () => {
        // Store on which tile we are hovering and move the marker there
        this.point =  this.scene.input.activePointer.positionToCamera(this.scene.cameras.main)
        
        this.pointerTileX = this.map.worldToTileX(this.point.x);
        this.pointerTileY = this.map.worldToTileY(this.point.y);

        this.marker.x = this.map.tileToWorldX(this.pointerTileX);
        this.marker.y = this.map.tileToWorldY(this.pointerTileY);

        // First implementation. Change cursor color on hover
        //if(this.marker.x+8 == this.player.sprite.x && this.marker.y-2 == this.player.sprite.y){
        //    this.marker.lineStyle(2, 0x00ff00, 1)
        //    this.marker.strokeRect(0, 0, 16, 16)
        //} else {
        //    this.marker.lineStyle(2, 0xffffff, 1)
        //    this.marker.strokeRect(0, 0, 16, 16)
        //}
    }
}