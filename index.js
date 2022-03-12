// DOM Element
function domEl() {
  const pages = [...document.getElementsByClassName("page")];
  const navIconItems = [...document.getElementsByClassName("icon")].map(v => v.parentNode);
  const navTitleItems = [...document.getElementsByClassName("item-title")];
  const navItems = navIconItems.map((v, i) => ({ icon: v, title: navTitleItems[i] }));
  const menu = document.getElementById("menu");
  const closeIcon = document.getElementById("close-icon")
  const openIcon = document.getElementById("open-icon")
  const drawer = document.getElementById("drawer");
  return { pages, navItems, menu, drawer, closeIcon, openIcon };
}
// page navigation event
function setEvent() {
  const { navItems, pages, menu, drawer, closeIcon, openIcon } = domEl();
  return {
    nav: () => ({
      hover: () => navItems.forEach(v => {
        for (let child in v) {
          v[child].addEventListener("mouseover", () => Object.values(v).forEach(el => el.classList.add("hover")));
        }
      }),
      blur: () => navItems.forEach(v => {
        for (let child in v) {
          v[child].addEventListener("mouseleave", () => Object.values(v).forEach(el => el.classList.remove("hover")));
        }
      }),
      click: () => navItems.forEach((v, i) => {
        for (let child in v) {
          v[child].addEventListener("click", () => {
            Object.values(v).forEach(el => el.classList.add("active"));
            navItems.forEach((v, j) => {
              if (i != j) {
                Object.values(v).forEach(el => el.classList.remove("active"));
                pages[j].classList.add("none");
              } else {
                pages[j].classList.remove("none");
                document.getElementsByTagName('title')[0].innerText = pages[j].innerHTML.split(' ')[0];
              };
            });
          });
        }
      }),
    }),
    menu: () => menu.addEventListener("click", () => {
      if (drawer.classList.contains("close-drawer")) {
        drawer.classList.remove("close-drawer");
        closeIcon.classList.remove('hide');
        openIcon.classList.add('hide');
      } else {
        drawer.classList.add("close-drawer");
        closeIcon.classList.add('hide');
        openIcon.classList.remove('hide');
      }
    })
  }
}

function init() {
  const { nav, menu } = setEvent();
  const n = nav();
  menu();
  for (let e in n) n[e]();
}

//initialize
init();