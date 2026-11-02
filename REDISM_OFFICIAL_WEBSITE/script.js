/* REDISM website interactions */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");
  const menuIcon = menuButton ? menuButton.querySelector(".menu-icon") : null;
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (!menuButton || !navigation) {
    console.warn("REDISM navigation could not initialise: required elements were not found.");
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 1050px)");

  function setMenuOpen(open) {
    navigation.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    if (menuIcon) menuIcon.textContent = open ? "✕" : "☰";
    document.body.classList.toggle("menu-open", open && mobileQuery.matches);
  }

  menuButton.addEventListener("click", function () {
    setMenuOpen(!navigation.classList.contains("open"));
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenuOpen(false); });
  });

  document.addEventListener("click", function (event) {
    if (navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)) setMenuOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  function handleViewportChange() {
    if (!mobileQuery.matches) setMenuOpen(false);
    else if (!navigation.classList.contains("open")) document.body.classList.remove("menu-open");
  }

  if (typeof mobileQuery.addEventListener === "function") mobileQuery.addEventListener("change", handleViewportChange);
  else if (typeof mobileQuery.addListener === "function") mobileQuery.addListener(handleViewportChange);

  setMenuOpen(false);
  console.log("Welcome to REDISM — Realms ov Eternal Darkness.");
  console.log("Founded by M-KOT.");
  console.log("Magick through Darkness.");
});
