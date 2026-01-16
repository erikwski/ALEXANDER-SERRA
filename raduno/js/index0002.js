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
      intervalDate: "Dal 16/08/26 al 22/08/26",
      radunoPrice: "350€",
      hotelPrices: [
        { peopleRooms: "1", price: "560€", totalPrice: "910€" },
        { peopleRooms: "2", price: "475€", totalPrice: "825€" },
        { peopleRooms: "3+", price: "370€", totalPrice: "720€" },
      ],
    },
    {
      radunoDate: new Date("08/16/2025"),
      showDate: new Date("01/01/2025"),
      removeComingSoon: new Date("08/18/2024"),
      intervalDate: "Dal 17/08/25 al 23/08/25",
      radunoPrice: "350€",
      hotelPrices: [
        { peopleRooms: "1", price: "531€", totalPrice: "881€" },
        { peopleRooms: "2", price: "447€", totalPrice: "797€" },
        { peopleRooms: "3+", price: "345€", totalPrice: "695€" },
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

  // Reviews data array
  const reviews = [
    {
      name: "CARLO",
      stars: 5,
      text: `Al primo posto ho amato l'atmosfera del Raduno: un gruppo eterogeneo composto da persone educate ed equilibrate che hanno reso la settimana speciale.<br><br>
      Ovviamente l'indirizzo e lo stile dato al raduno da Alexander e Giulia ha contribuito in maniera determinante.<br>
      Allenamenti, camminate e ambiente sono stati molto piacevoli.<br>
      L'organizzazione perfetta. Il programma puntuale, gli orari rispettati ed una giusta flessibilità in base al meteo.<br>
      Le attività di mobilità, forza e rinforzo del core sono state molto utili in quanto meno svolte a casa nella quotidianità.<br>
      Personalmente mi è piaciuta molto la presentazione di Giulia sulla gestione "pedagogica" di allenamenti e gare e poi ho trovato molto divertenti i momenti in pista insieme.<br><br>
      <strong>Consiglio il raduno:</strong><br>
      - per preparare la stagione podistica autunnale e al tempo stesso fare una settimana di vacanza in gruppo<br>
      - Per apprendere un corretto metodo di allenamento<br>
      - Per condividere e scambiare esperienze con altri runner<br>
      - Perché il posto si presta bene sia alla vacanza che all'allenamento<br><br>
      P.s. il prossimo anno saremo ancora qui!`,
    },
    {
      name: "MARCO",
      stars: 5,
      text: `Grazie Alexander e Giulia perché per una settimana mi avete fatto respirare la vita di un vero runner professionista con sedute di esercizi "fisici" (in pista di atletica e non solo) e sedute di esercizi più di "aula" (respirazione, motivazione, core, forza, ecc) che normalmente a casa non farei ma che riconosco essere altrettanto importanti (questi momenti sono quelli che ho apprezzato di più).<br><br>
      L'alternanza di questi momenti ha fatto sì che non mi sentissi mai "veramente" stanco.<br><br>
      Il posto è magnifico così come la struttura che ci ha accolto e si sente tutta la passione che voi mettete nel vostro lavoro.`,
    },
    {
      name: "OTTAVIA",
      stars: 5,
      text: `Il raduno è stato davvero perfetto, l'organizzazione, gli orari, tutto...<br><br>
      Una delle attività che ho trovato più interessanti è la lezione che abbiamo fatto su respirazione e motivazione che sono due tematiche a volte trascurate in ambito sportivo ma che personalmente sono più importanti di tanti altri temi.<br><br>
      Veramente una settimana super produttiva e ricca di nuove esperienze!<br><br>
      Grazie di tutto e complimenti per aver organizzato questo magnifico raduno.`,
    },
    {
      name: "MABEL",
      stars: 5,
      text: `Del raduno ho apprezzato soprattutto gli allenamenti e le persone che ho conosciuto.<br><br>
      Perfetto il programma e la capacità di adattarlo al meteo, così come le comunicazioni sempre puntuali e complete.<br><br>
      Finalmente ho imparato a svolgere la mobilità articolare e ho capito la sua importanza.<br><br>
      Il raduno è motivante senza essere "pesante".<br><br>
      Lo consiglierei in particolare ad una persona che vuole apprendere tutto ciò che ruota attorno alla corsa, dalla preparazione alla prevenzione.`,
    },
    {
      name: "LORENZO",
      stars: 5,
      text: `Raduno 2025, un'esperienza fantastica con un'organizzazione top!<br>
      Mi é piaciuta la grande varietà negli allenamenti, così come l'inserimento di momenti didattici con Giulia Vettor e Sara Creola!<br><br>
      Dal punto di vista dei tempi si riesce sempre a riposare e recuperare, nonostante i tanti allenamenti!<br><br>
      Avrei una proposta...organizzare il raduno su 10 giorni, perché una settimana passa troppo in fretta!`,
    },
    {
      name: "CHIARA",
      stars: 5,
      text: `Mi è piaciuta molto l'atmosfera che si è creata durante il raduno, oltre agli allenamenti e alle varie attività proposte.<br><br>
      La corsa in gruppo mi ha dato sicuramente motivazione per allenarmi.<br><br>
      Ho amato la mobilità e lo stretching, perché tendo ad abbandonarli un po' durante l'anno o comunque a non essere molto costante negli esercizi.<br><br>
      Consiglierei ad ogni Runner di partecipare, perché è un ambiente sano dove ognuno può correre secondo i propri ritmi senza dover dimostrare niente a nessuno, ma rimanendo se stesso!`,
    },
    {
      name: "CINZIA",
      stars: 5,
      text: `IL raduno è stato impeccabile.<br>
      Mi sono trovata benissimo con il gruppo, così vario e ben assortito, mi sono piaciuti gli allenamenti, le lezioni "teoriche", i "dopo cena", l'albergo…<br><br>
      Sono tornata a casa con un regalo per il cuore e per il fisico, davvero!<br><br>
      Ora non resta che continuare a percorrere la mia strada sempre accanto a voi, e raggiungere ogni giorno un piccolo obiettivo in più!`,
    },
  ];

  // Function to generate star SVGs
  function generateStars(count) {
    const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>`;
    return starSvg.repeat(count);
  }

  // Render reviews
  function renderReviews() {
    const container = $("#reviewContainer");
    if (container.length === 0) return;

    container.empty();

    reviews.forEach((review, index) => {
      const reviewHtml = `
        <div class="review" id="review-${index}">
          <h4>${review.name}</h4>
          <div class="starContainer">
            ${generateStars(review.stars)}
          </div>
          <p>${review.text}</p>
        </div>
      `;
      container.append(reviewHtml);
    });
  }

  // Initialize reviews
  renderReviews();
});
