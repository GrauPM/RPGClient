const rollDice = (sides) => {
    const diceResult = Math.floor(Math.random() * sides) + 1
    //console.log("You rolled a 1d" + sides + ". Result: " + diceResult)
    return diceResult
}

const rollMultipleDice = (amount,sides) => {
    let diceResult = 0
    for (let x = 0; x < amount; x++) {
        diceResult += rollDice(sides)
    }
    console.log("You rolled a " + amount + "d" + sides + ". Result: " + diceResult)
}

export {
	rollDice,
    rollMultipleDice
}
