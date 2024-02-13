import Html from "../scripts/html.js";

class Player {
  constructor(playerData) {
    console.log(playerData);
    this.playerDiv = new Html("div")
      .styleJs({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "200px",
        height: "200px",
        top: "0",
        left: "0",
        position: "absolute",
      })
      .appendTo(Html.from(document.body));
    this.avatar = new Html("img")
      .attr({ src: `../images/${playerData.avatar}` })
      .styleJs({ width: "200px", height: "200px", objectFit: "contain" })
      .appendTo(this.playerDiv);
    this.playerName = new Html("p")
      .text(playerData.name)
      .styleJs({ width: "100%", textAlign: "center" })
      .appendTo(this.playerDiv);
  }
  changeName(newName) {
    this.playerName.text(newName);
  }
  destroyPlayer() {
    this.playerDiv.cleanup();
  }
  move(x, y) {
    this.playerDiv.elm.animate([{ left: `${x}px`, top: `${y}px` }], {
      fill: "forwards",
      duration: 100,
    });
  }
}

class soundManager {
  soundBufs;
  audioContext;
  gainNode;
  constructor() {
    this.soundBufs = {};
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }
  async loadSound(url, name) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.soundBufs[name] = audioBuffer;
  }
  playSound(name) {
    const soundBuffer = this.soundBufs[name];
    if (!soundBuffer) {
      console.error(`Sound "${name}" not found.`);
      return;
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = soundBuffer;
    source.connect(this.gainNode);
    source.start();
    return source;
  }
  setVolume(volume) {
    this.gainNode.gain.value = volume;
  }
}

let sounds = new soundManager();

sounds.loadSound("../audio/wonderhoy.mp3", "wonderhoy");

let socket = io("https://olive.nxw.pw:31338");
let curPeer;
let players = {};

let curX = 0;
let curY = 0;
let curP;
let pressed = false;
let pKey = "";

socket.on("playerData", (data) => {
  console.log(socket.id);
  curP = new Player(data);
  players[socket.id] = curP;
  curPeer = new Peer(data.peerID);
  curPeer.on("open", (id) => {
    console.log("Peer opened", id);
  });
  if (!localStorage.getItem("nickname")) {
    let nickname = prompt("What should others call you?");
    if (nickname === "") {
      console.log("User pressed OK");
      localStorage.setItem("nickname", data.name);
    } else if (nickname) {
      localStorage.setItem("nickname", nickname);
    } else {
      i;
      localStorage.setItem("nickname", data.name);
    }
  }
  socket.emit("nickname", { name: localStorage.getItem("nickname") });
  document.addEventListener("keydown", (e) => {
    pKey = e.key;
    pressed = true;
  });
  document.addEventListener("keyup", () => {
    pressed = false;
  });
});

socket.on("players", (playerList) => {
  Object.keys(playerList).forEach((key) => {
    console.log("h");
    let p = new Player(playerList[key]);
    players[key] = p;
    p.move(playerList[key].x, playerList[key].y);
  });
});

socket.on("join", (player) => {
  console.log("new player", player);
  let p = new Player(player.data);
  players[player.id] = p;
  sounds.playSound("wonderhoy");
});

socket.on("leave", (data) => {
  players[data.id].destroyPlayer();
  delete players[data.id];
});

socket.on("move", (data) => {
  players[data.id].move(data.x, data.y);
  let inProximity = false;
  console.log(data.x - curX < 500 && data.y - curY < 500);
});

socket.on("nickname", (data) => {
  console.log("new nickname:", data.name);
  players[data.id].changeName(data.name);
});

function update() {
  if (pressed) {
    if (pKey == "w") {
      curY = curY - 20;
    }
    if (pKey == "s") {
      curY = curY + 20;
    }
    if (pKey == "a") {
      curX = curX - 20;
    }
    if (pKey == "d") {
      curX = curX + 20;
    }
    curP.move(curX, curY);
    socket.emit("move", { x: curX, y: curY });
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
