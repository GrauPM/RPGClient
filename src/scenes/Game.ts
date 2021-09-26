import Phaser from 'phaser'

import { Base } from '~/classes/base'
import { Client } from '~/controls/Client'
import { Cursor } from '~/controls/cursor'
import { BattleSystem } from '~/controls/BattleSystem'

import { rollDice,rollMultipleDice } from '~/controls/Dice'

export default class Game extends Phaser.Scene
{   
    // TODO: Scoping and typing variables
    player
    player2
    playerArray

    map
    tileset

    input
    cursor!: Cursor
    battleSystem

    client
	constructor() {
		super('game')
	}

	preload = () => {
        // TODO: Implement the socket.io client
        // Creating the s.io client control
        this.client = new Client()

        // Loading the images
        this.load.image('tiles', 'tiles/dungeon_tiles.png')
        this.load.tilemapTiledJSON('dungeon','tiles/dungeon-01.json')
        this.load.image('marker', 'crosshair16.png')

        // Create the player and preload its assets
        this.player = new Base(this,0,0)
        this.player.name = "Pant"
        this.player.preload()

        // Create the player array
        this.playerArray = []
    }

    create = () => {
        // Run the user interface scene
        this.scene.run('game-ui')

        // Creating the handler for the click
        this.input.on('pointerup',this.handleClick)
        
        // TODO: Can we move the map creation into a class?
        // Creating the tilemap
        this.map = this.make.tilemap({ key: 'dungeon' })
        this.tileset = this.map.addTilesetImage('dungeon','tiles')
        
        // Creating the layers
        const darknessLayer = this.map.createLayer('Darkness', this.tileset)
        const groundLayer = this.map.createLayer('Ground', this.tileset)
        const wallsLayer = this.map.createLayer('Walls', this.tileset)
        const objectsLayer = this.map.createLayer('Objects', this.tileset)

        // Creating the cursor control
        this.cursor = new Cursor(this,this.map)
        this.cursor.init()
        
        // Initiating the player
        this.player.init()
        //console.log(this.player)

        // Send the character to the server
        this.client.createCharacter(this.player.name)

        // Put the player into the array
        this.playerArray.push(this.player)

        //Start a test combat
        //this.battleSystem = new BattleSystem(this)
        //this.battleSystem.addBattler(this.player)
        //this.battleSystem.init()
        
    }

    update = () => {
        // Update the cursor
        this.cursor.update()

        // Update the battleSystem
        if(this.battleSystem != null) {
            this.battleSystem.update()
        }
    }

    handleClick = (pointer) => {
        // Get the coordinates of the tile we clicked
        // TODO: How does it work with a camera?
        let x = Math.floor(pointer.x/16)
        let y = Math.floor(pointer.y/16)
        
        // Move the player to that tile
        this.player.move(x,y)
        
        //console.log("Tile clicked: " + x + "x" + y)
    }
}
