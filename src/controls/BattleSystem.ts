import Phaser from "phaser";
import { rollDice } from "./Dice";

export class BattleSystem {

    scene!: Phaser.Scene

    battlers

    constructor(scene) {
        this.scene = scene

        this.battlers = []
    }

    init = () => {
        console.log("Combat started!")
        this.rollIniciative()
    }

    addBattler = (battler) => {
        this.battlers.push(battler)
    }

    rollIniciative = () => {
        this.battlers.forEach(battler => {
            battler.rollIniciative()
            // TODO: Sort the battlers by his initiative
        });

        console.log(this.battlers)
    }
    startCombat = () => {
        // After the rolls we start the combat
        // Check who is active and disable everyone else
        // If he uses all his APs, go to the next battler
        // If no more battlers, restart the logic
    }
    update = () => {
        console.log("Combat ticking...")
    }
}