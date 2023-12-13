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
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
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
  { threshold: 0.5 }
);

for (let i = 0; i < scrollAnim.length; i++) {
  const elements = scrollAnim[i];

  observer.observe(elements);
}
