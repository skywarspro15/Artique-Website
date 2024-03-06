// UI module

const body = document.querySelector("html");
const githubIcon = document.querySelector(".github");

function iconSwitch(dark) {
  if (!githubIcon) {
    return;
  }
  if (dark) {
    githubIcon.src = "images/github-mark-dark.svg";
  } else {
    githubIcon.src = "images/github-mark-light.svg";
  }
}

function themeToggle() {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    iconSwitch(true);
  } else {
    localStorage.setItem("theme", "light");
    iconSwitch(false);
  }
}

function sidebarToggle() {
  const chatContainer = document.querySelector(".chatContainer.main");
  const sidebar = document.querySelector(".sidebar");
  chatContainer.classList.toggle("sidebarVisible");
  sidebar.classList.toggle("hidden");
}

function openCharacterList() {
  let modal = document.querySelector(".characterSelect");
  modal.style.display = "flex";
  modal.classList.remove("hidden");
}

function openSetScenario() {
  let modal = document.querySelector(".changeScenario");
  modal.style.display = "flex";
  modal.classList.remove("hidden");
}

function closeModal(elmClass) {
  let modal = document.querySelector(`.${elmClass}`);
  modal.classList.add("hidden");
  setTimeout(() => {
    modal.style.display = "none";
  }, 200);
}

if (localStorage.getItem("theme") == "dark") {
  if (!body.classList.contains("dark-mode")) {
    body.classList.toggle("dark-mode");
    iconSwitch(true);
  }
}

window.addEventListener("storage", () => {
  if (localStorage.getItem("theme") == "dark") {
    body.classList.add("dark-mode");
    iconSwitch(true);
  } else {
    body.classList.remove("dark-mode");
    iconSwitch(false);
  }
});

const scrollAnim = document.querySelectorAll(".scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animation");
      }
    });
  },
  { threshold: 0 }
);

for (let i = 0; i < scrollAnim.length; i++) {
  const elements = scrollAnim[i];
  observer.observe(elements);
}

let closeButtons = document.querySelectorAll(".close");
let closeButtonsArray = [...closeButtons];

closeButtonsArray.forEach((button) => {
  if (!button.hasAttribute("close_id")) {
    return;
  }
  console.log(button.getAttribute("close_id"));
  button.addEventListener("click", () => {
    closeModal(button.getAttribute("close_id"));
  });
});

let navbar = document.querySelector("nav");
let navContainer = document.querySelector(".nav-container");
let navbarText = navContainer.querySelector("p.name");

document.addEventListener("wheel", () => {
  let scrollVal = document.body.scrollTop;
  if (scrollVal > 1) {
    navContainer.style.boxShadow =
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)";
    navContainer.style.background = "var(--bg-color)";
    navbarText.style.color = "var(--fg-color)";
  } else {
    navContainer.style.boxShadow = "none";
    navContainer.style.background = "transparent";
    navbarText.style.color = "white";
  }
  setTimeout(() => {
    let scrollVal = document.body.scrollTop;
    if (scrollVal > 1) {
      navContainer.style.boxShadow =
        "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)";
      navContainer.style.background = "var(--bg-color)";
      navbarText.style.color = "var(--fg-color)";
    } else {
      navContainer.style.boxShadow = "none";
      navContainer.style.background = "transparent";
      navbarText.style.color = "white";
    }
  }, 500);
});

tippy("#viewGithub", {
  content: "View site's source code",
  animation: "shift-away",
});
