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

    // Add proximity circle
    this.proximityCircle = new Html("div")
      .styleJs({
        position: "absolute",
        width: "500px",
        height: "500px",
        border: "2px solid rgba(0, 255, 0, 0.2)",
        borderRadius: "50%",
        // Center the circle by offsetting by half its width minus half the player width
        transform: "translate(-100px, -120px)",
        left: "-50px", // (500px - 200px) / 2 = 150px
        top: "-50px",
        pointerEvents: "none",
        transition: "border-color 0.3s",
      })
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
    this.x = x; // Store position
    this.y = y;
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
let pressedKeys = {};

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
      localStorage.setItem("nickname", data.name);
    }
  }
  socket.emit("nickname", { name: localStorage.getItem("nickname") });
  document.addEventListener("keydown", (e) => {
    pressedKeys[e.key] = true;
    // Add nickname change on 'n' key press
    if (e.key.toLowerCase() === "n") {
      changeNickname();
    }
    console.log(pressedKeys);
  });
  document.addEventListener("keyup", (e) => {
    pressedKeys[e.key] = false;
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

function resetProximityStates() {
  // Reset all circles to default state
  Object.values(players).forEach((player) => {
    player.proximityCircle.styleJs({ borderColor: "rgba(0, 255, 0, 0.2)" });
  });
}

socket.on("leave", (data) => {
  players[data.id].destroyPlayer();
  delete players[data.id];
  // Reset proximity states when a player leaves
  resetProximityStates();
  // Recheck proximity for remaining players
  checkProximity();
});

function checkProximity() {
  const PROXIMITY_RADIUS = 250;

  // First reset all to default state
  resetProximityStates();

  // Then check for proximity
  Object.entries(players).forEach(([id, player]) => {
    if (id === socket.id || !player.x || !player.y) return; // Skip self or invalid positions

    const dx = player.x - curX;
    const dy = player.y - curY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < PROXIMITY_RADIUS * 2) {
      player.proximityCircle.styleJs({ borderColor: "rgba(255, 255, 0, 0.4)" });
      players[socket.id]?.proximityCircle.styleJs({
        borderColor: "rgba(255, 255, 0, 0.4)",
      });
    }
  });
}

socket.on("move", (data) => {
  players[data.id].move(data.x, data.y);
  checkProximity();
});

socket.on("nickname", (data) => {
  console.log("new nickname:", data.name);
  players[data.id].changeName(data.name);
});

function changeNickname() {
  const newNickname = prompt(
    "Enter your new nickname (or click Cancel to keep current name):"
  );
  if (newNickname === null) {
    // User clicked Cancel
    return;
  }
  if (newNickname.trim() !== "") {
    localStorage.setItem("nickname", newNickname);
    socket.emit("nickname", { name: newNickname });
    players[socket.id].changeName(newNickname);
  }
}

function update() {
  let moved = false;
  if (pressedKeys["w"] || pressedKeys["ArrowUp"]) {
    curY = curY - 20;
    moved = true;
  }
  if (pressedKeys["s"] || pressedKeys["ArrowDown"]) {
    curY = curY + 20;
    moved = true;
  }
  if (pressedKeys["a"] || pressedKeys["ArrowLeft"]) {
    curX = curX - 20;
    moved = true;
  }
  if (pressedKeys["d"] || pressedKeys["ArrowRight"]) {
    curX = curX + 20;
    moved = true;
  }

  if (moved) {
    curP.move(curX, curY);
    socket.emit("move", { x: curX, y: curY });
    checkProximity();
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
