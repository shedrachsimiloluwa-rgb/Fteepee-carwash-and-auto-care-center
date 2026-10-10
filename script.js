document.addEventListener("DOMContentLoaded", () => {
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

// Automatic copyright year
const year = document.getElementById("year");

if (year) {
year.textContent = new Date().getFullYear();
}

// Mobile navigation
function closeMenu() {
navLinks.classList.remove("open");
menuToggle.classList.remove("active");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation menu");
document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
const isOpen = navLinks.classList.toggle("open");

menuToggle.classList.toggle("active", isOpen);
menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.setAttribute(
  "aria-label",
  isOpen ? "Close navigation menu" : "Open navigation menu"
);

document.body.classList.toggle("menu-open", isOpen);

});

// Close menu after selecting a navigation link
navItems.forEach((link) => {
link.addEventListener("click", closeMenu);
});

// Close menu when clicking outside the navigation
document.addEventListener("click", (event) => {
if (
navLinks.classList.contains("open") &&
!navLinks.contains(event.target) &&
!menuToggle.contains(event.target)
) {
closeMenu();
}
});

// Close menu with Escape
document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
closeMenu();
}
});

// Keep navigation visible and readable when scrolling
window.addEventListener(
"scroll",
() => {
if (window.scrollY > 40) {
header.classList.add("scrolled");
} else {
header.classList.remove("scrolled");
}
},
{ passive: true }
);

// Reveal elements smoothly as they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
const revealObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
observer.unobserve(entry.target);
}
});
},
{
threshold: 0.12,
rootMargin: "0px 0px -35px 0px"
}
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

} else {
revealElements.forEach((element) => {
element.classList.add("visible");
});
}

// Highlight the navigation link for the visible section
const sections = document.querySelectorAll(
"main section[id]"
);

if ("IntersectionObserver" in window) {
const sectionObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
const sectionId = entry.target.id;

        navItems.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${sectionId}`;

          link.classList.toggle("active", isActive);
        });
      }
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

}

// Ensure external images that fail to load do not leave broken icons.
document.querySelectorAll("img").forEach((img) => {
img.addEventListener("error", () => {
img.classList.add("image-unavailable");
});
});
});