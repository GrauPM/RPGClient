import { io } from "socket.io-client";

export class Client {

    socket
    users

    constructor() {
        this.socket = io('http://localhost:3100')
        this.users = []
        // Receive updated data of all the users
        this.socket.on('updateCharacters',  (data: any) => {
            this.updateCharacters(data)
        })
    }
    
    // Send the new character to the server
    createCharacter(character) {
        this.socket.emit('createCharacter', character)
    }
    // Update the users array with the newest data
    updateCharacters(data) {
        this.users = data
        console.log("## User array changed: ")
        console.log(this.users)
    }
    // Send a test message to the server console
    test() {
        console.log("Test sent to server")
        this.socket.emit('test')
    }
    // Debug the Users array on the server console
    printCharacters() {
        console.log("Order sent to the server")
        this.socket.emit('printCharacters')
    }
}