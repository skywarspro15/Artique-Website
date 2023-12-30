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

tippy("#viewGithub", {
  content: "View site's source code",
  animation: "shift-away",
});
