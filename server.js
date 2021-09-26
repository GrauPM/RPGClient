const app = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 3100;
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"]
    }
  });

let users = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(socket.id + ' connected.');

    socket.on('createCharacter',function(character){
      users.push( {id: socket.id, character: character} )
      updateCharacters(socket,users)
    });

    socket.on('printCharacters',function(){
      printCharacters(users)
    });

    socket.on('disconnect',function(){
      users.splice(users.findIndex(x => x.id === socket.id),1)
      console.log(socket.id+" left. Goodbye!")
      updateCharacters(socket,users)
      //io.emit('remove',socket.player.id);
    });
});

function updateCharacters(socket,users) {
  console.log("## Sending players the update.")
  socket.broadcast.emit('updateCharacters',users)
}
function printCharacters(users) {
  console.log("########")
  console.log("## List of connected users:")
  users.forEach(user => {
    console.log("########")
    console.log("# ID: " + user.id)
    console.log("# Class: " + user.character.className)
    console.log("# HP: " + user.character.hp)
    console.log("# Str: " + user.character.str)
    console.log("# Dex: " + user.character.dex)
    console.log("# Int: " + user.character.int)
  });
}
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
