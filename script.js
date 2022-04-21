// Selecting btns
const mainNav = document.querySelector(".main-nav");
const headerEl = document.querySelector(".header");
const yearEl = document.querySelector(".year");
const btnNavEl = document.querySelector(".mobile-nav-btn");

const allLinks = document.querySelectorAll("a:link");


///////////////////////////////////////////////////////////
// Toggle the mobile nav
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Implement scrolling
allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = link.getAttribute("href");
    // console.log(href);
    // Implement scrolling
    // 1. Scroll back to the top (href=#)
    if (href == "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // 2. Scroll to the specific section
    if (href !== "#" && href.startsWith("#")) {
      let sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close the modal when the modal (mobile navigation) links get clicked
    // if (headerEl.classList.contains("nav-open"))
    //   headerEl.classList.remove("nav-open");
    if (link.classList.contains("nav-link"))
      headerEl.classList.remove("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Creat date object
const date = new Date();
// get the current year
let currenYear = date.getFullYear();
// Update the year in our html
yearEl.textContent = currenYear;

///////////////////////////////////////////////////////////
// Implement stick navigation

let options = {
  // We set null when the element moves out of the viewport
  root: null,
  // That's the height of the navigation bar itself, the sticky one
  rootMargin: "-80px",
  threshold: 0,
};

let observer = new IntersectionObserver(function(entries) {
  const ent = entries[0]
  if(!ent.isIntersecting) {
    document.body.classList.add('sticky')
  } else {
    document.body.classList.remove("sticky");
  }

}, options);


let sectionHeroEl = document.querySelector(".section-hero");
observer.observe(sectionHeroEl);


if (navigator.userAgent.includes("Firefox")) {
  mainNav.classList.add("firefox-fix");
}


///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();