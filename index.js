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
function initEvent() {
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
              } else pages[j].classList.remove("none");
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
const { nav, menu } = initEvent();
const { hover, blur, click } = nav();
hover();
blur();
click();
menu();

function onScreenClick() {
  document.onclick = (e) => {
    if (e.target.id != "menu" && e.target.className != "bar") {
      domEl().drawer.classList.add("at-left");
      setTimeout(() => {
        domEl().modal.style.display = "none";
      }, 100);
    }
  };
}

//initialize
// onMenuClick();
// onScreenClick();
// setNavigation();
