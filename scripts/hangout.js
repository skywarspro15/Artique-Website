import Html from "../scripts/html.js";

let layoutDefinition = supportLayout();
let lastTick = Date.now();
let lastPingTime = 0;
let currentPing = 0;

class Player {
  constructor(playerData) {
    console.log(playerData);
    this.id = playerData.id;
    this.peerID = playerData.peerID;
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

sounds.loadSound("../audio/keef.wav", "wonderhoy");

let socket = io("https://olive.nxw.pw:31338");
let curPeer;
let players = {};

// Add ping monitoring
function sendPing() {
  lastPingTime = Date.now();
  socket.emit("ping");
}

socket.on("pong", () => {
  currentPing = Date.now() - lastPingTime;
  console.log(`Current ping: ${currentPing}ms`);
});

// Start ping monitoring
setInterval(sendPing, 5000); // Check ping every 5 seconds

let curX = 0;
let curY = 0;
let curP;
let pressedKeys = {};

let activeCalls = new Map(); // Track active calls
let localStream = null; // Store local media stream
let playersInProximity = new Set(); // Track players already in proximity

async function setupMediaStream() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
  } catch (err) {
    console.error("Failed to get media stream:", err);
  }
}

function handleIncomingCall(call) {
  call.answer(localStream);
  setupCallListeners(call);
}

function setupCallListeners(call) {
  call.on("stream", (remoteStream) => {
    const audio = new Audio();
    audio.srcObject = remoteStream;
    audio.play();
    activeCalls.set(call.peer, { call, audio });
  });

  call.on("close", () => {
    const callData = activeCalls.get(call.peer);
    if (callData) {
      callData.audio.srcObject = null;
      activeCalls.delete(call.peer);
    }
  });
}

function initiateCall(peerId) {
  // Don't initiate if we already have a call or no stream
  if (activeCalls.has(peerId) || !localStream) return;

  // Only initiate if this is a new player in proximity
  if (!playersInProximity.has(peerId)) {
    console.log("Initiating new call with:", peerId);
    const call = curPeer.call(peerId, localStream);
    setupCallListeners(call);
    playersInProximity.add(peerId);
  }
}

function endCall(peerId) {
  const callData = activeCalls.get(peerId);
  if (callData) {
    callData.call.close();
    callData.audio.srcObject = null;
    activeCalls.delete(peerId);
  }
}

socket.on("playerData", (data) => {
  console.log(socket.id);
  curP = new Player(data);
  players[socket.id] = curP;

  curPeer = new Peer(data.peerID, {
    config: {
      iceServers: [
        {
          urls: "turn:freestun.net:3478",
          username: "free",
          credential: "free",
        },
      ],
    },
  });
  curPeer.on("open", (id) => {
    console.log("Peer opened", id);
    setupMediaStream();
    curPeer.on("call", handleIncomingCall);
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
  checkProximity();
  sounds.playSound("wonderhoy");
});

function resetProximityStates() {
  // Reset all circles to default state
  Object.values(players).forEach((player) => {
    player.proximityCircle.styleJs({ borderColor: "rgba(0, 255, 0, 0.2)" });
  });
}

function supportLayout() {
  let keyboardLayout = prompt("Enter your keyboard layout (blank for qwerty)");
  let output = {};
  switch (keyboardLayout) {
    case "":
      output.forward = "w";
      output.backward = "s";
      output.left = "a";
      output.right = "d";
      break;
    case "w": //workman
      output.forward = "d";
      output.backward = "s";
      output.left = "a";
      output.right = "h";
      break;
  }
  return output;
}

socket.on("leave", (data) => {
  // End call if the leaving player was in proximity
  const leavingPlayer = players[data.id];
  if (leavingPlayer && leavingPlayer.peerID) {
    endCall(leavingPlayer.peerID);
    playersInProximity.delete(leavingPlayer.peerID);
  }

  players[data.id].destroyPlayer();
  delete players[data.id];
  resetProximityStates();
  checkProximity();
});

socket.on("tick", () => {
  let now = Date.now();
  let delta = now - lastTick;
  let tickSpeed = 1 / (delta / 1000);
  lastTick = now;
  console.log("Tick speed", parseInt(tickSpeed));
});

function checkProximity() {
  const PROXIMITY_RADIUS = 250;
  const currentlyInRange = new Set();

  resetProximityStates();

  Object.entries(players).forEach(([id, player]) => {
    if (id === socket.id || !player.x || !player.y) return;

    const dx = player.x - curX;
    const dy = player.y - curY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < PROXIMITY_RADIUS * 2) {
      player.proximityCircle.styleJs({ borderColor: "rgba(255, 255, 0, 0.4)" });
      players[socket.id]?.proximityCircle.styleJs({
        borderColor: "rgba(255, 255, 0, 0.4)",
      });
      currentlyInRange.add(player.peerID);
      initiateCall(player.peerID);
    }
  });

  // More thorough cleanup of out-of-range players
  for (const [peerId] of activeCalls) {
    if (!currentlyInRange.has(peerId)) {
      console.log("Ending call with out-of-range player:", peerId);
      endCall(peerId);
      playersInProximity.delete(peerId);
    }
  }
}

socket.on("move", (data) => {
  if (!players[data.id]) return;
  if (data.id === socket.id) return;
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
  if (pressedKeys[layoutDefinition.forward] || pressedKeys["ArrowUp"]) {
    curY = curY - 20;
    moved = true;
  }
  if (pressedKeys[layoutDefinition.backward] || pressedKeys["ArrowDown"]) {
    curY = curY + 20;
    moved = true;
  }
  if (pressedKeys[layoutDefinition.left] || pressedKeys["ArrowLeft"]) {
    curX = curX - 20;
    moved = true;
  }
  if (pressedKeys[layoutDefinition.right] || pressedKeys["ArrowRight"]) {
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
