// DOM Element
function domEl() {
  const pages = [...document.getElementsByClassName("page")];
  const navItems = [...document.getElementsByClassName("nav-item")];
  const menu = document.getElementById("menu");
  const drawer = document.getElementById("drawer");
  const modal = document.getElementById("modal");
  return { pages, navItems, menu, drawer, modal };
}

// page navigation event
function setNavigation() {
  domEl().navItems.forEach(
    (v, i) =>
      (v.onclick = () =>
        domEl().pages.forEach((e, j) => {
          if (i == j) e.classList.remove("none");
          else e.classList.add("none");
        }))
  );
}

//open and close drawer events
function onMenuClick() {
  domEl().menu.onclick = () => {
    domEl().modal.style.display = "flex";
    setTimeout(() => {
      domEl().drawer.classList.remove("at-left");
    }, 80);
  };
}
function onScreenClick() {
  document.onclick = (e) => {
    if (e.target.id != "menu" && e.target.className != "bar") {
      domEl().drawer.classList.add("at-left");
      setTimeout(() => {
        domEl().modal.style.display = "none";
      }, 80);
    }
  };
}

//initialize
onMenuClick();
onScreenClick();
setNavigation();
