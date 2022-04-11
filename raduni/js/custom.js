/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
  ("use strict");

  /* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  setTimeout(() => {
    $(".loader-overlay").addClass("loader_out");
    $(".load_ini").addClass("go_ini");
  }, 1500);

  /* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  /* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $(".main-menu ul li.megamenu").mouseover(function () {
      if (!$(this).parent().hasClass("#wrapper")) {
        $("#wrapper").addClass("overlay");
      }
    });
    $(".main-menu ul li.megamenu").mouseleave(function () {
      $("#wrapper").removeClass("overlay");
    });
  });

  /* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(window).on("scroll", function () {
    scroll = $(window).scrollTop();
    if (scroll >= 100) {
      $("#back-to-top").addClass("b-show_scrollBut");
    } else {
      $("#back-to-top").removeClass("b-show_scrollBut");
    }
  });
  $("#back-to-top").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  /* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  //predazzo
  let dt_predazzo = new Date("06/30/2022") - new Date();
  //livigno
  let dt_livigno = new Date() - new Date();
  //sestriere
  let dt_sestriere = new Date() - new Date();

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let countDown1 = new Date("06/30/2022").getTime();
  let x1 = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown1 - now;

    ($("#countdown1 span")[0].innerText = Math.floor(distance / day)),
      ($("#countdown1 span")[1].innerText = Math.floor(
        (distance % day) / hour
      )),
      ($("#countdown1 span")[2].innerText = Math.floor(
        (distance % hour) / minute
      )),
      ($("#countdown1 span")[3].innerText = Math.floor(
        (distance % minute) / second
      ));

    if (distance < 0) {
      //offerta scaduta
      $("#countdown1").html("<h3 class='offerta_scaduta'>OFFERTA SCADUTA</h3>");
      clearInterval(x1);
    }
    //seconds
  }, 1000);

  let countDown2 = new Date("07/19/2022").getTime();
  let x2 = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown2 - now;

    ($("#countdown2 span")[0].innerText = Math.floor(distance / day)),
      ($("#countdown2 span")[1].innerText = Math.floor(
        (distance % day) / hour
      )),
      ($("#countdown2 span")[2].innerText = Math.floor(
        (distance % hour) / minute
      )),
      ($("#countdown2 span")[3].innerText = Math.floor(
        (distance % minute) / second
      ));

    if (distance < 0) {
      //offerta scaduta
      $("#countdown2").html("<h3 class='offerta_scaduta'>OFFERTA SCADUTA</h3>");
      clearInterval(x2);
    }
    //seconds
  }, 1000);

  let countDown3 = new Date("08/02/2022").getTime();
  let x3 = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown3 - now;

    ($("#countdown3 span")[0].innerText = Math.floor(distance / day)),
      ($("#countdown3 span")[1].innerText = Math.floor(
        (distance % day) / hour
      )),
      ($("#countdown3 span")[2].innerText = Math.floor(
        (distance % hour) / minute
      )),
      ($("#countdown3 span")[3].innerText = Math.floor(
        (distance % minute) / second
      ));

    if (distance < 0) {
      //offerta scaduta
      $("#countdown3").html("<h3 class='offerta_scaduta'>OFFERTA SCADUTA</h3>");
      clearInterval(x3);
    }
    //seconds
  }, 1000);

  /* fine countdown */

  $(".visualizza_dati_bonifico").click(() => {
    $("#dati_bonifico").toggle(500);
    $("body,html").animate(
      {
        scrollTop: $("#dati_bonifico").offset().top - window.innerHeight / 2,
      },
      1000
    );
  });

  $(".cameras_text").click(function (e) {
    e.stopPropagation();
    $("body,html").animate(
      {
        scrollTop: $("#come_partecipare").offset().top,
      },
      1000
    );
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      if (this.getAttribute("href") === "#!") return;
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  /* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
      $(this).toggleClass("active");
    });
  });
});
