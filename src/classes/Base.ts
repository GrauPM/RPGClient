import Phaser from 'phaser'
import { rollDice } from '~/controls/Dice'

export class Base {

    scene: Phaser.Scene

    x!: integer
    y!: integer
    
    baseHP!: integer
    currentHP!: integer

    baseAP!: integer
    currentAP!: integer

    baseMP!: integer
    currentMP!: integer

    iniciative!: integer
    iniciativeBonus!: integer
    
    name!: string
    text

    sprite
    spriteName!: string
    spriteRoute!: string
    
    playerControlled!: boolean

    constructor(scene,x,y) {
        this.scene = scene

        this.x = x
        this.y = y

        this.baseHP = 10
        this.currentHP = 10 

        this.baseAP = 4
        this.currentAP = 4

        this.baseMP = 3
        this.currentMP = 3

        this.iniciative = 0
        this.iniciativeBonus = 0

        this.name = "base"
        this.spriteName = 'hero'
        this.spriteRoute = 'images/lizard_hero.png'

        this.playerControlled = true
    }
    // TODO: Why arrow functions?
    preload = () => {
        this.scene.load.image(this.spriteName, this.spriteRoute)
    }
    init = () => {
        this.sprite = this.scene.add.image(this.x,this.y,this.spriteName)
        this.sprite.setOrigin(0.25,0.55)
        //this.text = this.scene.add.text(this.x,this.y,this.name).setOrigin(0.3,1.4)
    }
    move = (x,y) => {
        this.sprite.x = this.normalize(x)
        this.sprite.y = this.normalize(y)
        //this.text.x = this.normalize(x)
        //this.text.y = this.normalize(y)
    }
    normalize = (value) => {
        return (value*16)
    }
    rollIniciative = () => {
        this.iniciative = rollDice(10)+this.iniciativeBonus
    }
    
}