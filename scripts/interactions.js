// UI module

const body = document.querySelector("html");

function themeToggle() {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

if (localStorage.getItem("theme") == "dark") {
  if (!body.classList.contains("dark-mode")) {
    body.classList.toggle("dark-mode");
  }
}

window.addEventListener("storage", () => {
  if (localStorage.getItem("theme") == "dark") {
    if (!body.classList.contains("dark-mode")) {
      body.classList.toggle("dark-mode");
    }
  }
});
