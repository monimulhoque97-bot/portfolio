/* =========================================================
   PORTFOLIO JAVASCRIPT
   ========================================================= */


/* ================= ELEMENTS ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");


/* ================= MOBILE MENU ================= */

function closeMobileMenu(){

  if(!mobileMenu || !menuBtn){
    return;
  }

  mobileMenu.classList.remove("active");

  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );

  menuBtn.setAttribute(
    "aria-label",
    "Open menu"
  );

  document.body.classList.remove(
    "menu-open"
  );

  const spans =
    menuBtn.querySelectorAll("span");

  spans.forEach(span => {

    span.style.transform = "";
    span.style.opacity = "";

  });

}


if(menuBtn && mobileMenu){

  menuBtn.addEventListener(
    "click",
    () => {

      const active =
        mobileMenu.classList.toggle(
          "active"
        );


      menuBtn.setAttribute(
        "aria-expanded",
        String(active)
      );


      menuBtn.setAttribute(
        "aria-label",
        active
          ? "Close menu"
          : "Open menu"
      );


      document.body.classList.toggle(
        "menu-open",
        active
      );


      const spans =
        menuBtn.querySelectorAll(
          "span"
        );


      if(active){

        spans[0].style.transform =
          "translateY(7px) rotate(45deg)";

        spans[1].style.opacity =
          "0";

        spans[2].style.transform =
          "translateY(-7px) rotate(-45deg)";

      }else{

        spans.forEach(span => {

          span.style.transform = "";
          span.style.opacity = "";

        });

      }

    }
  );


  /* Close after selecting menu item */

  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });


  /* Close when clicking outside */

  document.addEventListener(
    "click",
    event => {

      if(
        mobileMenu.classList.contains(
          "active"
        ) &&
        !mobileMenu.contains(
          event.target
        ) &&
        !menuBtn.contains(
          event.target
        )
      ){

        closeMobileMenu();

      }

    }
  );


  /* Close with Escape */

  document.addEventListener(
    "keydown",
    event => {

      if(
        event.key === "Escape" &&
        mobileMenu.classList.contains(
          "active"
        )
      ){

        closeMobileMenu();

        menuBtn.focus();

      }

    }
  );

}


/* ================= NAVBAR ================= */

function updateNavbar(){

  if(!navbar){
    return;
  }

  if(window.scrollY > 30){

    navbar.classList.add(
      "scrolled"
    );

  }else{

    navbar.classList.remove(
      "scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  updateNavbar,
  {
    passive:true
  }
);

updateNavbar();


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if(
  "IntersectionObserver"
  in window
){

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "revealed"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold:.12,

        rootMargin:
          "0px 0px -30px 0px"
      }
    );


  revealElements.forEach(
    element => {

      observer.observe(
        element
      );

    }
  );

}else{

  revealElements.forEach(
    element => {

      element.classList.add(
        "revealed"
      );

    }
  );

}


/* ================= PROJECT HOVER ================= */

/*
  Desktop only:
  Gives the project cards a subtle
  3D movement effect.
*/

const desktopPointer =
  window.matchMedia(
    "(pointer:fine) and (min-width:901px)"
  );


if(desktopPointer.matches){

  document
    .querySelectorAll(
      ".project-card"
    )
    .forEach(card => {


      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const rotateX =
            ((y / rect.height) - .5)
            * -2.5;


          const rotateY =
            ((x / rect.width) - .5)
            * 2.5;


          card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-6px)
          `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

}


/* ================= SMOOTH NAVIGATION ================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute(
            "href"
          );


        if(
          !id ||
          id === "#"
        ){

          return;

        }


        const target =
          document.querySelector(
            id
          );


        if(!target){

          return;

        }


        event.preventDefault();


        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

      }
    );

  });


/* ================= CURRENT YEAR ================= */

const year =
  document.getElementById(
    "year"
  );


if(year){

  year.textContent =
    new Date().getFullYear();

}