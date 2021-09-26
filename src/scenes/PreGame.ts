import Phaser from 'phaser'

export default class PreGame extends Phaser.Scene
{
	constructor() {
		super('pre-game')
	}

	preload = () => {
        
    }

    create = () => {
        this.scene.start('game')
    }
}
