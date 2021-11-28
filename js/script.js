const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
 * Toggle .header-scrolled class to #header when page is scrolled
 */
let selectHeader = select("#header");
if (selectHeader) {
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      selectHeader.classList.add("header-scrolled");
    } else {
      selectHeader.classList.remove("header-scrolled");
    }
  };
  window.addEventListener("load", headerScrolled);
  onscroll(document, headerScrolled);
}

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const burgerIcon = document.querySelector(".fa-bars");
  const timesIcon = document.querySelector(".fa-times");
  const nav = document.querySelector(".main-nav-list");
  const backdrop = document.querySelector(".backdrop");
  const navLinks = document.querySelectorAll("main-nav-link");
  //Toggle Navb
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burgerIcon.classList.toggle("hidden");
    timesIcon.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");
  });

  //Animate links
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1}s`;
  });
};

//Div Highlight//////////////////////

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".main-nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("btn-cta");
    if (li.classList.contains(current)) {
      li.classList.add("btn-cta");
    }
  });
});

navSlide();

console.log(scrollY);

//Mobile viewport search tab fix//////////////////////////
// save old window size to adjust only if width changed
let oldWidth = window.innerWidth,
  oldHeight = window.innerHeight;
// element to adjust
const target = document.querySelector(".vh100");
// adjust the size if window was resized
window.addEventListener("resize", handleResize);

function handleResize(initial = false) {
  // the parameter is used for calling the function on page load
  /*
   * if the width changed then resize
   * without this Chrome mobile resizes every time navbar is hidden
   */
  if (window.innerWidth !== oldWidth || initial) {
    // stretch the target
    target.classList.add("setting-100vh");
    // save height and apply as min height
    const h = target.clientHeight;
    target.classList.remove("setting-100vh");
    target.style.minHeight = h + "px";
  }
}
// call when page is loaded
handleResize(true);
