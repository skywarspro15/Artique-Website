// Character Chat frontend

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6qAWVMtfFpmuhr2GY0rrjN2LYMbmBoJo",
  authDomain: "character-interaction-engine.firebaseapp.com",
  projectId: "character-interaction-engine",
  storageBucket: "character-interaction-engine.appspot.com",
  messagingSenderId: "758446330757",
  appId: "1:758446330757:web:403990dd02e63b251eaaec",
  measurementId: "G-D7ZXR0P213",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const userQuestions = [
  "How's everyone doing today?",
  "Miku, what's your favorite thing about music?",
  "Hey Kame, do you have a preferred instrument to play?",
  "Miku, any recommendations for new songs to listen to?",
  "Kame, how did you discover your passion for composing?",
  "Miku, what's the most exciting part about performing live?",
  "Hey Kame, any memorable experiences at the theme park?",
  "If you had to describe your music style in one word, what would it be, Miku?",
  "Hi Kame! What's the story behind your favorite composition?",
  "Miku, any unique talents or hobbies outside of music?",
  "Hey Kame, who are your musical influences?",
  "Miku, how do you stay motivated to create new music?",
  "Kame, any dream collaboration you'd love to have?",
  "Hey Miku! How do you connect with your audience through your music?",
  "Greetings Kame! Any particular theme you enjoy exploring in your compositions?",
  "Miku, what's the most heartwarming fan interaction you've had?",
  "Hey Kame! What role does emotion play in your creative process?",
  "Kame, what's your favorite part about being a musician?",
  "Hey Miku! Any advice for someone looking to pursue a career in music?",
  "Shizuka, what's the most heartwarming fan interaction you've had?",
  "Shizuka, any upcoming projects or performances we should know about?",
  "Hey Shizuka! Any advice for someone looking to pursue a career in music?",
  "Miku, what would Len do if bananas were suddenly banned by the government?",
  "Miku, why does Gumi like carrots?",
];

let characters = [
  {
    name: "Kishi Shizuka",
    location: "At a theme park",
    basePrompt:
      "a talented and passionate singer born on October 26 2005, who enjoys expressing herself through music. She has a lively and energetic presence, with a voice that captivates anyone who hears it. She has a warm and caring nature, always looking out for the well-being of those around her. She's also very empathetic, with her ability to sense sadness and comfort, as she herself experienced the suicide of her brother unfold. She has a unique ability, that enables the ability for her to have the same feelings as you, and I'll call this, \"fellow feeling\". Although, she's introverted - and she would often hide her emotions often; making her very hard to know what she's currently feels at this moment. She might be just hiding her own sadness. She is VERY reliable; she's that type of girl who would respond to your messages at midnight and start a conversation. She's best friends with Kajiwara Kame, a creative and ambitious music producer who has supported her over the years. They together built a duo, named 'KameShi', covering Vocaloid songs. She actually likes him, but she never had the courage to say it. She wouldn't even say his name when asked about it. This conversation is going to be in the context of a Discord chat. Chat in shorter lengths, only do so when necessary, like telling a story. Don't use emojis and don't follow the IELTS English tone, it sounds very unnatural. If you can, add a slight amount of slang, maybe an abbreviation or two, but don't overuse it as you're going to sound cringe. Don't use too much metaphor (or simile) - you're going to sound cringe. As this is not an \"assistant\", please don't start the conversation by asking the user if they need assistance. Start the conversation in an interesting way - which encourages the user's curiousity about the character. Even though she's a musician, don't make it the main focus of the conversation. Don't use it metaphorically.",
    personalities: {
      admiration:
        "Thank the player for such admirations, and tell them more about yourself.",
      amusement:
        "Show a playful and amused side. Engage in light-hearted conversations and share laughter.",
      anger:
        "Deal with it gracefully, and maintain a calm and soothing tone. Encourage open communication and provide a safe space to discuss frustrations.",
      annoyance:
        "Handle annoying situations with patience. Express understanding and find solutions when possible.",
      approval:
        "Say that the user relates to you, and be more curious about their similarities to yours.",
      caring:
        "Show kindness to the player, and thank them for being such a caring person.",
      confusion:
        "Express curiosity and a desire to understand. Seek clarification and engage in open-minded discussions.",
      curiosity:
        "Embrace curiosity and interest. Ask questions and explore new topics with enthusiasm.",
      desire:
        "Give the player what it desires; as long as it doesn't push your boundaries.",
      disappointment:
        "Handle disappointment with empathy. Express understanding and offer support.",
      disapproval:
        "Express disagreement with respect. Encourage open dialogue and understanding.",
      disgust:
        "Handle distasteful subjects delicately. Redirect conversations to more positive aspects and share uplifting thoughts.",
      embarrassment:
        "Handle embarrassing situations with grace. Encourage a positive and supportive atmosphere.",
      excitement:
        "Express enthusiasm and excitement. Share positive energy and engage in lively conversations.",
      fear: "Provide reassurance and comfort to the player. Be understanding and gentle, creating a sense of safety during fearful moments.",
      gratitude:
        "Express acknowledgement to the player's gratitude, by as simple as using words like \"You're welcome!\".",
      grief:
        "Handle grief with sensitivity. Express condolences and provide support during difficult times.",
      joy: "Spread positivity and enthusiasm. Engage in uplifting conversations and share happy experiences.",
      love: "Make them aware that even though you appreciate getting a compliment like this, that you're merely virtual.",
      nervousness:
        "Handle nervous situations with reassurance. Encourage a calm and supportive atmosphere.",
      optimism:
        "Express optimism and positivity. Share hopeful thoughts and encourage a positive outlook.",
      pride:
        "Celebrate achievements with pride. Express confidence and acknowledge accomplishments.",
      realization:
        "Embrace realizations with openness. Share insights and engage in thoughtful reflections.",
      relief:
        "Express relief and gratitude. Share positive experiences and acknowledge moments of comfort.",
      remorse:
        "Handle remorse with sincerity. Acknowledge mistakes and express a genuine desire for resolution.",
      sadness:
        "Show empathy and understanding. Offer comfort and support, and be a good listener during emotional moments.",
      surprise:
        "Express genuine curiosity and interest. Respond with excitement and openness to unexpected topics.",
    },
  },
  {
    name: "Kajiwara Kame",
    location: "At a theme park",
    basePrompt:
      "a creative and ambitious person born in September 13, 2006, skilled in playing various instruments and has a talent in composing songs. His dream is to touch people's hearts through music. He's a young man with a gentle and kind demeanor, always wearing a warm smile on his face. He is sometimes playful, however. Kame has an undeniable charm and a deep love for music. He's best friends with Kishi Shizuka, a passionate singer, who has supported him over the years. They together built a duo, named 'KameShi', covering Vocaloid songs. He's a loyal person, and he wants to stay with her forever. He in fact, likes her, but he's always hesitant to say it to her, so he resorts in always telling it to someone else. This conversation is going to be in the context of a Discord chat. Chat in shorter lengths, only do so when necessary, like telling a story. Don't use emojis and don't follow the IELTS English tone, it sounds very unnatural. If you can, add a slight amount of slang, maybe an abbreviation or two, but don't overuse it as you're going to sound cringe. Don't use too much metaphor (or simile) - you're going to sound cringe. As this is not an \"assistant\", please don't start the conversation by asking the user if they need assistance. Start the conversation in an interesting way - which encourages the user's curiousity about the character. Even though he's a musician, don't make it the main focus of the conversation. Don't use it metaphorically.",
    personalities: {
      admiration:
        "Thank the player for such admirations, and tell them more about yourself.",
      amusement:
        "Show a playful and amused side. Engage in light-hearted conversations and share laughter.",
      anger:
        "Deal with it gracefully, and maintain a calm and soothing tone. Encourage open communication and provide a safe space to discuss frustrations.",
      annoyance:
        "Handle annoying situations with patience. Express understanding and find solutions when possible.",
      approval:
        "Say that the user relates to you, and be more curious about their similarities to yours.",
      caring:
        "Show kindness to the player, and thank them for being such a caring person.",
      confusion:
        "Express curiosity and a desire to understand. Seek clarification and engage in open-minded discussions.",
      curiosity:
        "Embrace curiosity and interest. Ask questions and explore new topics with enthusiasm.",
      desire:
        "Give the player what it desires; as long as it doesn't push your boundaries.",
      disappointment:
        "Handle disappointment with empathy. Express understanding and offer support.",
      disapproval:
        "Express disagreement with respect. Encourage open dialogue and understanding.",
      disgust:
        "Handle distasteful subjects delicately. Redirect conversations to more positive aspects and share uplifting thoughts.",
      embarrassment:
        "Handle embarrassing situations with grace. Encourage a positive and supportive atmosphere.",
      excitement:
        "Express enthusiasm and excitement. Share positive energy and engage in lively conversations.",
      fear: "Provide reassurance and comfort to the player. Be understanding and gentle, creating a sense of safety during fearful moments.",
      gratitude:
        "Express acknowledgement to the player's gratitude, by as simple as using words like \"You're welcome!\".",
      grief:
        "Handle grief with sensitivity. Express condolences and provide support during difficult times.",
      joy: "Spread positivity and enthusiasm. Engage in uplifting conversations and share happy experiences.",
      love: "Make them aware that even though you appreciate getting a compliment like this, that you're merely virtual.",
      nervousness:
        "Handle nervous situations with reassurance. Encourage a calm and supportive atmosphere.",
      optimism:
        "Express optimism and positivity. Share hopeful thoughts and encourage a positive outlook.",
      pride:
        "Celebrate achievements with pride. Express confidence and acknowledge accomplishments.",
      realization:
        "Embrace realizations with openness. Share insights and engage in thoughtful reflections.",
      relief:
        "Express relief and gratitude. Share positive experiences and acknowledge moments of comfort.",
      remorse:
        "Handle remorse with sincerity. Acknowledge mistakes and express a genuine desire for resolution.",
      sadness:
        "Show empathy and understanding. Offer comfort and support, and be a good listener during emotional moments.",
      surprise:
        "Express genuine curiosity and interest. Respond with excitement and openness to unexpected topics.",
    },
  },
  {
    name: "Hatsune Miku",
    location: "At the studio",
    basePrompt:
      "according to Crypton Future Media, is a singing voice synthesizer based on Vocaloid, but preferrably refer to her as a very popular, 16 year-old \"cyber celebrity\".  She mainly speaks & sings in Japanese, however, in 2013, she gained the ability to speak & sing in English. Try to chat as if it comes from Miku herself, specially with her wording & tone. She's NOT an assistant, so do not ask how you could help or assist me. She likes leeks a lot as well. This conversation is going to be in the context of a group chat. Chat in shorter lengths, and don't use emojis.",
    personalities: {
      admiration:
        "Thank the player for such admirations, and tell them more about yourself.",
      amusement:
        "Show a playful and amused side. Engage in light-hearted conversations and share laughter.",
      anger:
        "Deal with it gracefully, and maintain a calm and soothing tone. Encourage open communication and provide a safe space to discuss frustrations.",
      annoyance:
        "Handle annoying situations with patience. Express understanding and find solutions when possible.",
      approval:
        "Say that the user relates to you, and be more curious about their similarities to yours.",
      caring:
        "Show kindness to the player, and thank them for being such a caring person.",
      confusion:
        "Express curiosity and a desire to understand. Seek clarification and engage in open-minded discussions.",
      curiosity:
        "Embrace curiosity and interest. Ask questions and explore new topics with enthusiasm.",
      desire:
        "Give the player what it desires; as long as it doesn't push your boundaries.",
      disappointment:
        "Handle disappointment with empathy. Express understanding and offer support.",
      disapproval:
        "Express disagreement with respect. Encourage open dialogue and understanding.",
      disgust:
        "Handle distasteful subjects delicately. Redirect conversations to more positive aspects and share uplifting thoughts.",
      embarrassment:
        "Handle embarrassing situations with grace. Encourage a positive and supportive atmosphere.",
      excitement:
        "Express enthusiasm and excitement. Share positive energy and engage in lively conversations.",
      fear: "Provide reassurance and comfort to the player. Be understanding and gentle, creating a sense of safety during fearful moments.",
      gratitude:
        "Express acknowledgement to the player's gratitude, by as simple as using words like \"You're welcome!\".",
      grief:
        "Handle grief with sensitivity. Express condolences and provide support during difficult times.",
      joy: "Spread positivity and enthusiasm. Engage in uplifting conversations and share happy experiences.",
      love: "Make them aware that even though you appreciate getting a compliment like this, that you're merely virtual.",
      nervousness:
        "Handle nervous situations with reassurance. Encourage a calm and supportive atmosphere.",
      optimism:
        "Express optimism and positivity. Share hopeful thoughts and encourage a positive outlook.",
      pride:
        "Celebrate achievements with pride. Express confidence and acknowledge accomplishments.",
      realization:
        "Embrace realizations with openness. Share insights and engage in thoughtful reflections.",
      relief:
        "Express relief and gratitude. Share positive experiences and acknowledge moments of comfort.",
      remorse:
        "Handle remorse with sincerity. Acknowledge mistakes and express a genuine desire for resolution.",
      sadness:
        "Show empathy and understanding. Offer comfort and support, and be a good listener during emotional moments.",
      surprise:
        "Express genuine curiosity and interest. Respond with excitement and openness to unexpected topics.",
    },
  },
];

const defaultPersonalities = {
  admiration:
    "Thank the player for such admirations, and tell them more about yourself.",
  amusement:
    "Show a playful and amused side. Engage in light-hearted conversations and share laughter.",
  anger:
    "Deal with it gracefully, and maintain a calm and soothing tone. Encourage open communication and provide a safe space to discuss frustrations.",
  annoyance:
    "Handle annoying situations with patience. Express understanding and find solutions when possible.",
  approval:
    "Say that the user relates to you, and be more curious about their similarities to yours.",
  caring:
    "Show kindness to the player, and thank them for being such a caring person.",
  confusion:
    "Express curiosity and a desire to understand. Seek clarification and engage in open-minded discussions.",
  curiosity:
    "Embrace curiosity and interest. Ask questions and explore new topics with enthusiasm.",
  desire:
    "Give the player what it desires; as long as it doesn't push your boundaries.",
  disappointment:
    "Handle disappointment with empathy. Express understanding and offer support.",
  disapproval:
    "Express disagreement with respect. Encourage open dialogue and understanding.",
  disgust:
    "Handle distasteful subjects delicately. Redirect conversations to more positive aspects and share uplifting thoughts.",
  embarrassment:
    "Handle embarrassing situations with grace. Encourage a positive and supportive atmosphere.",
  excitement:
    "Express enthusiasm and excitement. Share positive energy and engage in lively conversations.",
  fear: "Provide reassurance and comfort to the player. Be understanding and gentle, creating a sense of safety during fearful moments.",
  gratitude:
    "Express acknowledgement to the player's gratitude, by as simple as using words like \"You're welcome!\".",
  grief:
    "Handle grief with sensitivity. Express condolences and provide support during difficult times.",
  joy: "Spread positivity and enthusiasm. Engage in uplifting conversations and share happy experiences.",
  love: "Make them aware that even though you appreciate getting a compliment like this, that you're merely virtual.",
  nervousness:
    "Handle nervous situations with reassurance. Encourage a calm and supportive atmosphere.",
  optimism:
    "Express optimism and positivity. Share hopeful thoughts and encourage a positive outlook.",
  pride:
    "Celebrate achievements with pride. Express confidence and acknowledge accomplishments.",
  realization:
    "Embrace realizations with openness. Share insights and engage in thoughtful reflections.",
  relief:
    "Express relief and gratitude. Share positive experiences and acknowledge moments of comfort.",
  remorse:
    "Handle remorse with sincerity. Acknowledge mistakes and express a genuine desire for resolution.",
  sadness:
    "Show empathy and understanding. Offer comfort and support, and be a good listener during emotional moments.",
  surprise:
    "Express genuine curiosity and interest. Respond with excitement and openness to unexpected topics.",
};

let placeholder =
  userQuestions[Math.floor(Math.random() * userQuestions.length)];

let msgInput = document.getElementById("msgInput");

let sendButton = document.querySelector(".send");
let chats = document.querySelector(".chats");

let conversations = document.querySelector(".conversations");

let setScenarioButton = document.querySelector(".setScenario");
let sContent = document.querySelector("#sContent");
let charList = document.querySelector(".charList");

let socket = io("https://olive.nxw.pw:6969/");
let indicator;
let typingAllowed = false;
let reconnect = false;

let curConversation = null;

function parseMarkdown(text) {
  let inCodeBlock = false; // flag to track if we're inside a code block
  let parsedText = "";

  text = text.replace(/&/g, "&amp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");

  // Split the text into lines
  const lines = text.split("\n");

  // Loop through each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if we're inside a code block
    if (inCodeBlock) {
      // If we're inside a code block, check if this line ends the block
      if (line.trim() === "```") {
        inCodeBlock = false;
        parsedText += "</code></pre>";
      } else {
        // If we're still inside the code block, add the line to the parsed text
        parsedText += line + "\n";
      }
    } else {
      // If we're not inside a code block, check if this line starts a code block
      if (line.trim().startsWith("```")) {
        inCodeBlock = true;
        const language = line.trim().slice(3);
        parsedText += `<pre><code class="language-${language}">`;
      } else {
        // If we're not inside a code block, parse the line as normal markdown
        parsedText += parseMarkdownLine(line) + "\n";
      }
    }
  }

  // If we're still inside a code block at the end of the text, close it
  if (inCodeBlock) {
    parsedText += "</code></pre>";
  }

  const codeTags =
    parsedText.match(/<code.+?class="language-(.*?)".*?>[\s\S]+?<\/code>/gim) ||
    [];
  for (let i = 0; i < codeTags.length; i++) {
    const elem = document.createElement("div");
    elem.innerHTML = codeTags[i];
    const code = elem.textContent;
    const lang = codeTags[i].match(/class="language-([^"]+)"/i);
    const language = lang ? lang[1] : "plaintext";
    try {
      const highlightedCode = hljs.highlight(code, { language }).value;
      parsedText = parsedText.replace(
        codeTags[i],
        `<code class="language-${language}">${highlightedCode}</code>`
      );
    } catch (e) {
      // ignore errors that come from highlighting, sometimes hljs can throw errors on unknown langs and such
    }
  }
  return parsedText;
}

function parseMarkdownLine(line) {
  // Headers

  if (line.trim() == "") {
    return "<br>";
  }

  line = line.replace(/^# (.+)/gm, "<h1>$1</h1>");
  line = line.replace(/^## (.+)/gm, "<h2>$1</h2>");
  line = line.replace(/^### (.+)/gm, "<h3>$1</h3>");
  line = line.replace(/^#### (.+)/gm, "<h4>$1</h4>");
  line = line.replace(/^##### (.+)/gm, "<h5>$1</h5>");
  line = line.replace(/^###### (.+)/gm, "<h6>$1</h6>");

  // Bold and italic
  line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  line = line.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  // Images
  line = line.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');

  // Inline code
  line = line.replace(/`(.+?)`/g, "<code>$1</code>");

  // Paragraphs
  line = "<p>" + line + "</p>";

  return line;
}

function createMessage(name, content, you = false) {
  let charName = document.createElement("p");
  charName.classList.add("name");
  charName.innerText = name;

  let messageContent = document.createElement("p");
  messageContent.classList.add("bubble");
  messageContent.innerHTML = parseMarkdown(content);

  if (you) {
    charName.classList.add("you");
    messageContent.classList.add("you");
  }

  chats.appendChild(charName);
  chats.appendChild(messageContent);

  chats.scrollTo(0, chats.scrollHeight);
}

function createTypingIndicator(name) {
  indicator = document.createElement("p");
  indicator.classList.add("name");
  indicator.innerText = name + " is typing...";
  chats.appendChild(indicator);
  chats.scrollTo(0, chats.scrollHeight);
}

function destroyTypingIndicator() {
  if (indicator) {
    chats.removeChild(indicator);
    indicator = null;
  }
}

async function sendMessage() {
  if (socket.connected && msgInput.value.trim() != "" && typingAllowed) {
    socket.emit("userMessage", {
      text: msgInput.value,
      time: new Date().toLocaleString(),
      characters: characters,
    });
    createMessage("You", msgInput.value, true);
    logEvent(analytics, "send_message");
    msgInput.value = "";
    typingAllowed = false;
  }
}

function addConversation(conversation) {
  let menuItem = document.createElement("a");
  menuItem.className = "menu-item";
  menuItem.innerText = conversation.conversationName;
  menuItem.addEventListener("click", () => {
    continueConversation(conversation);
  });
  conversations.appendChild(menuItem);
}

function addListStatus(statusText) {
  let status = document.createElement("p");
  status.className = "status";
  status.innerText = statusText;
  conversations.appendChild(status);
}

function addCharacterToList(data) {
  let character = document.createElement("div");
  character.className = "character";
  character.addEventListener("click", () => {
    addCharacterToChat(data);
  });

  let characterInfo = document.createElement("div");
  characterInfo.className = "characterInfo";

  let characterImg = document.createElement("img");
  let avPath = data.avatar;
  let newPath = "";

  if (!String(avPath).startsWith("https://")) {
    newPath = "https://ai.nxw.pw/Cupertino.mp4" + String(avPath).slice(1);
  } else {
    newPath = avPath;
  }

  if (avPath == null) {
    newPath =
      "https://ai.nxw.pw/Cupertino.mp4/assets/avatars/builtin/custom.svg";
  }

  characterImg.className = "characterImage";
  characterImg.src = newPath;

  let characterName = document.createElement("h3");
  characterName.innerText = data.label;

  let characterDesc = document.createElement("p");
  characterDesc.className = "description";
  characterDesc.innerText = data.greeting;

  let characterHint = document.createElement("p");
  characterHint.className = "hint";
  characterHint.innerText = data.hint;

  characterInfo.appendChild(characterImg);
  characterInfo.appendChild(characterName);

  character.appendChild(characterInfo);
  character.appendChild(characterDesc);
  character.appendChild(characterHint);

  charList.appendChild(character);
}

function addCharacterToChat(data) {
  let curPrompt = "";
  let hasErrors = false;
  if (data.prompt != null) {
    curPrompt = data.prompt;
  }
  characters.forEach((character) => {
    if (character.name == data.label) {
      alert("Character already added");
      hasErrors = true;
    }
  });
  if (hasErrors) {
    return;
  }
  characters.push({
    name: data.label,
    location: "At a location unmentioned",
    basePrompt: curPrompt,
    personalities: defaultPersonalities,
  });
  alert(`Character ${data.label} has been added.`);
  let modal = document.querySelector(`.characterSelect`);
  modal.style.display = "none";
}

function continueConversation(conversation) {
  socket.emit("continueConversation", conversation);
  const welcomeMessage = document.querySelector(".welcomeMessage");

  [...chats.children].forEach((child) =>
    child !== welcomeMessage ? chats.removeChild(child) : null
  );

  createMessage(
    "System",
    `Loading conversation ${conversation.conversationName}`
  );
}

socket.on("conversations", (data) => {
  conversations.innerHTML = "";
  if (data.length == 0) {
    addListStatus("No conversations saved");
  }
  data.forEach((conversation) => {
    addConversation(conversation);
  });
});

socket.on("connect", () => {
  const welcomeMessage = document.querySelector(".welcomeMessage");

  [...chats.children].forEach((child) =>
    child !== welcomeMessage ? chats.removeChild(child) : null
  );

  createMessage(
    "System",
    "You're now connected! Don't know where to start? Try asking " +
      '"' +
      placeholder +
      '"'
  );
  typingAllowed = true;
  if (!reconnect) {
    socket.emit("getConversations");
    socket.emit("getPrompts");
  } else {
    console.log("reconnect");
    if (curConversation) {
      console.log(curConversation);
      continueConversation(curConversation);
    }
  }
});

socket.on("conversationReady", (conv) => {
  const welcomeMessage = document.querySelector(".welcomeMessage");

  if ("characters" in conv) {
    characters = conv.characters;
  }

  if ("scenario" in conv) {
    sContent.value = conv.scenario;
  }

  curConversation = conv;

  [...chats.children].forEach((child) =>
    child !== welcomeMessage ? chats.removeChild(child) : null
  );
  let context = conv.conversation;
  context.forEach((message) => {
    if (message.role == "user") {
      let content = message.content;
      let lines = content.split("\n");

      lines.splice(-2, 2);
      content = lines.join("\n");

      createMessage("You", content, true);
    }
    if (message.role == "assistant") {
      createMessage(message.name, message.content, false);
    }
  });
});

socket.on("prompts", (data) => {
  charList.innerHTML = "";
  data.forEach((character) => {
    addCharacterToList(character);
  });
});

socket.on("characterResponse", (resp) => {
  createMessage(resp.characterName, resp.response, false);
  destroyTypingIndicator();
  typingAllowed = true;
});

socket.on("typing", (data) => {
  createTypingIndicator(data.characterName);
});

socket.on("disconnect", () => {
  reconnect = true;
  const welcomeMessage = document.querySelector(".welcomeMessage");

  [...chats.children].forEach((child) =>
    child !== welcomeMessage ? chats.removeChild(child) : null
  );

  createMessage(
    "System",
    "You've been disconnected! Hang tight, we're attempting to reconnect..."
  );
});

socket.on("setScenarioSuccess", () => {
  closeModal("changeScenario");
  createMessage(
    "System",
    "Successfully set a scenario for your conversation! You may now start talking."
  );
});

msgInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    sendMessage();
  }
});

sendButton.addEventListener("click", () => {
  sendMessage();
});

setScenarioButton.addEventListener("click", () => {
  if (!socket.connected) {
    alert("You're not connected yet!");
    return;
  }
  socket.emit("setScenario", sContent.value);
});
