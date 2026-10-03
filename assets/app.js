const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  function prepareHeroVideo() {
    heroVideo.currentTime = 2;
    heroVideo.playbackRate = 0.65;
  }

  heroVideo.playbackRate = 0.65;
  heroVideo.addEventListener("loadedmetadata", prepareHeroVideo);
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

window.toggleMenu = toggleMenu;

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const accordionButtons = document.querySelectorAll(".accordion button");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = panel.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const slides = [...document.querySelectorAll(".gallery-frame img")];
const title = document.querySelector(".gallery-title");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });
  title.textContent = slides[currentSlide].dataset.title;
}

document.querySelector(".gallery-prev").addEventListener("click", () => showSlide(currentSlide - 1));
document.querySelector(".gallery-next").addEventListener("click", () => showSlide(currentSlide + 1));

const sections = [...document.querySelectorAll("main section")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => {
      item.classList.toggle("is-active", item.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -45% 0px" });

sections.forEach((section) => observer.observe(section));
