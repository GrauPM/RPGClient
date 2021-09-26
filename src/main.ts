import Phaser from 'phaser'

import PreGame from './scenes/PreGame'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'

const tileSize = 16
const width = 20
const height = 20
const zoom = 2

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: tileSize*width,
	height: tileSize*height,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scale: { zoom: zoom },
	scene: [PreGame,Game,GameUI]
}

export default new Phaser.Game(config)
