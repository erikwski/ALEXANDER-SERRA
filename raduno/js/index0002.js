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

  $(".visualizza_dati_bonifico").click(() => {
    $("#dati_bonifico").toggle(500);
    $("body,html").animate(
      {
        scrollTop: $("#dati_bonifico").offset().top - window.innerHeight / 2,
      },
      1000
    );
  });

  $(".activeRaduno .cameras_text").click(function (e) {
    e.stopPropagation();
    window.location.href = $(this).data("raduno") + ".html";
  });

  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000, // Aspetta 5 secondi prima di passare all'immagine successiva
    autoplaySpeed: 1000, // L'animazione dura 1 secondo
    smartSpeed: 1200, // Rende la transizione più fluida
    autoplayHoverPause: true,
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
    localStorage.setItem("skipAndScrollTo", "home");
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
      $(this).toggleClass("active");
    });
  });

  /// Managing dinamic years and date
  // The order of the date must be descendent so 2027, 2026, 2025, etc
  let raduni = [
    {
      radunoDate: new Date("08/17/2026"),
      showDate: new Date("01/10/2025"),
      removeComingSoon: new Date("01/01/2026"),
      intervalDate: "Dal 17/08/26 al 23/08/26",
      radunoPrice: "350€",
      hotelPrices: [
        { peopleRooms: "1", price: "531€", totalPrice: "881€" },
        { peopleRooms: "2", price: "447€", totalPrice: "797€" },
        { peopleRooms: "3+", price: "345€", totalPrice: "695€" },
      ],
    },
    {
      radunoDate: new Date("08/16/2025"),
      showDate: new Date("01/01/2025"),
      removeComingSoon: new Date("08/18/2024"),
      intervalDate: "Dal 16/08/25 al 22/08/25",
      radunoPrice: "350€",
      hotelPrices: [
        { peopleRooms: "1", price: "560€", totalPrice: "910€" },
        { peopleRooms: "2", price: "475€", totalPrice: "825€" },
        { peopleRooms: "3+", price: "370€", totalPrice: "720€" },
      ],
    },
  ];

  const prossimoRaduno =
    raduni.find((r) => r.showDate <= new Date()) ?? raduni[0];
  const annoProssimoRaduno = prossimoRaduno.radunoDate.getFullYear();
  $(".dinamic-year").text(annoProssimoRaduno);

  //coming soon manage
  if (prossimoRaduno.removeComingSoon >= new Date()) {
    $(".full_bf").html(`
      <div class="col-sm-12 text-center mb-4">
        <i class="offertaLancio comingSoon">AL LANCIO DEL RADUNO ${annoProssimoRaduno} MANCANO:</i>
        <div id="countdownLaunch" class="countdown">
            <div class="counter">
                <span></span>
                <b>Giorni</b>
            </div>
            <div class="counter">
                <span></span>
                <b>Ore</b>
            </div>
            <div class="counter">
                <span></span>
                <b>Min</b>
            </div>
            <div class="counter">
                <span></span>
                <b>Sec</b>
            </div>
        </div>
      </div>
    `);
    $("#contatti").addClass("col-sm-12");
    $("#legenda").remove();
    $(".footer").addClass("less-pad-top");
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let countDownLaunch = prossimoRaduno.removeComingSoon.getTime();
    let x1 = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDownLaunch - now;

      ($("#countdownLaunch span")[0].innerText = Math.floor(distance / day)),
        ($("#countdownLaunch span")[1].innerText = Math.floor(
          (distance % day) / hour
        )),
        ($("#countdownLaunch span")[2].innerText = Math.floor(
          (distance % hour) / minute
        )),
        ($("#countdownLaunch span")[3].innerText = Math.floor(
          (distance % minute) / second
        ));

      if (distance < 0) {
        //offerta scaduta
        $("#countdown1").html(
          "<h3 class='offerta_scaduta'>ISCRIZIONI CHIUSE</h3>"
        );
        clearInterval(x1);
      }
      //seconds
    }, 1000);
    return;
  }

  $("#interval-text").html(prossimoRaduno.intervalDate);
  const priceTable = $("#price-table");
  prossimoRaduno.hotelPrices.forEach((p) => {
    priceTable.append(`
      <tr>
        <th scope="row">${p.peopleRooms}</th>
        <td>${p.price}</td>
        <td>${p.totalPrice}</td>
    </tr>
      `);
  });
  // Countdown
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let countDown1 = prossimoRaduno.radunoDate.getTime();
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
      $("#countdown1").html(
        "<h3 class='offerta_scaduta'>ISCRIZIONI CHIUSE</h3>"
      );
      clearInterval(x1);
    }
    //seconds
  }, 1000);

  // fine countdown

  $(".visualizza_dati_bonifico").click(() => {
    $("#dati_bonifico").toggle(500);
    $("body,html").animate(
      {
        scrollTop: $("#dati_bonifico").offset().top - window.innerHeight / 2,
      },
      1000
    );
  });

  $(".activeRaduno .cameras_text").click(function (e) {
    e.stopPropagation();
    window.location.href = $(this).data("raduno") + ".html";
  });
});
