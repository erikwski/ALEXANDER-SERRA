/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    $nav = $("#nav"),
    $main = $("#main"),
    $navPanelToggle,
    $navPanel,
    $navPanelInner;

  // Breakpoints.
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax = function (intensity) {
    var $window = $(window),
      $this = $(this);

    if (this.length == 0 || intensity === 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) $(this[i])._parallax(intensity);

      return $this;
    }

    if (!intensity) intensity = 0.25;

    $this.each(function () {
      var $t = $(this),
        $bg = $('<div class="bg"></div>').appendTo($t),
        on,
        off;

      on = function () {
        $bg.removeClass("fixed").css("transform", "matrix(1,0,0,1,0,0)");

        $window.on("scroll._parallax", function () {
          var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

          $bg.css("transform", "matrix(1,0,0,1,0," + pos * intensity + ")");
        });
      };

      off = function () {
        $bg.addClass("fixed").css("transform", "none");

        $window.off("scroll._parallax");
      };

      // Disable parallax on ..
      if (
        browser.name == "ie" || // IE
        browser.name == "edge" || // Edge
        window.devicePixelRatio > 1 || // Retina/HiDPI (= poor performance)
        browser.mobile
      )
        // Mobile devices
        off();
      // Enable everywhere else.
      else {
        breakpoints.on(">large", on);
        breakpoints.on("<=large", off);
      }
    });

    $window
      .off("load._parallax resize._parallax")
      .on("load._parallax resize._parallax", function () {
        $window.trigger("scroll");
      });

    return $(this);
  };

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Scrolly.
  $(".scrolly").scrolly();

  // Background.
  $wrapper._parallax(0.925);

  // Hack: Disable transitions on WP.
  if (browser.os == "wp" && browser.osVersion < 10)
    $navPanel.css("transition", "none");

  // Intro.
  var $intro = $("#intro");

  if ($intro.length > 0) {
    // Hack: Fix flex min-height on IE.
    if (browser.name == "ie") {
      $window
        .on("resize.ie-intro-fix", function () {
          var h = $intro.height();

          if (h > $window.height()) $intro.css("height", "auto");
          else $intro.css("height", h);
        })
        .trigger("resize.ie-intro-fix");
    }

    // Hide intro on scroll (> small).
    breakpoints.on(">small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "bottom",
        top: "25vh",
        bottom: "-50vh",
        enter: function () {
          if ($("#nav li.active a").data("id") === "#main")
            $intro.addClass("hidden");
        },
        leave: function () {
          if ($("#nav li.active a").data("id") === "#main")
            $intro.removeClass("hidden");
        },
      });
    });

    // Hide intro on scroll (<= small).
    breakpoints.on("<=small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "middle",
        top: "15vh",
        bottom: "-15vh",
        enter: function () {
          if ($("#nav li.active a").data("id") === "#main")
            $intro.addClass("hidden");
        },
        leave: function () {
          if ($("#nav li.active a").data("id") === "#main")
            $intro.removeClass("hidden");
        },
      });
    });
  }

  // $("#send_mail").click(() => {
  //   $.post("https://formspree.io/f/mnqlkegw", {
  //     nome: $("#name").val(),
  //     contatto_utente: $("#email").val(),
  //     servizio_interessato:
  //       $("#service").val() === "" ? "Non specificato" : $("#service").val(),
  //     messaggio: $("#message").val(),
  //   })
  //     .done((j) => {
  //       Swal.fire({
  //         icon: "success",
  //         title:
  //           "Mail inviata correttamente, ti ricontatterò il prima possibile",
  //         showConfirmButton: true,
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         $("#name").val("");
  //         $("#email").val("");
  //         $("#service").val("");
  //         $("#message").val("");
  //       });
  //     })
  //     .fail((j) => {
  //       Swal.fire({
  //         icon: "success",
  //         title:
  //           "Mail inviata correttamente, ti ricontatterò il prima possibile",
  //         showConfirmButton: true,
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         $("#name").val("");
  //         $("#email").val("");
  //         $("#service").val("");
  //         $("#message").val("");
  //       });
  //     });
  // });

  $(".closebtn").click(() => $(".alert").removeClass("active"));

  $(".links li").click(function () {
    $(".links li").removeClass("active");
    $(this).addClass("active");
    $(".tab_menu").hide();
    $($(this).find("a").data("id")).show();
    if ($(this).find("a").data("id") === "#main") {
      $("#intro").removeClass("hidden_tab");
      $("html").scrollTop($("#nav").offset().top - 200);
      $(".timer_container").show();
    } else {
      $(".timer_container").hide();
      $("#intro").addClass("hidden");
      $("#intro").addClass("hidden_tab");
      $("html").scrollTop(0);
      adaptCardHeight();
    }
  });

  $(".btn_price_card").click(function () {
    $(".links li").removeClass("active");
    $(`.links li a[data-id="${$(this).data("id")}"]`)
      .parent()
      .addClass("active");
    $(".tab_menu").hide();
    $($(this).data("id")).show();
    if ($(this).data("id") === "#main") {
      $("#intro").removeClass("hidden_tab");
      $("html").scrollTop($("#nav").offset().top - 200);
      $(".timer_container").show();
    } else {
      $(".timer_container").hide();
      $("#intro").addClass("hidden");
      $("#intro").addClass("hidden_tab");
      $("html").scrollTop(0);
      adaptCardHeight();
    }
    let shift_to =
      $(this).data("id") === "#gold" ? "shit_to_gold" : "shit_to_diamond";
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + shift_to).offset().top,
      },
      1000
    );
  });
  $(".visualizza_dati_bonifico").click(function () {
    $(this).parents(".tab_menu").find(".dati_bonifico").toggle(1000);
  });
  $(".trigger_click_on_btn_price_card, .link_to_offer").click(function () {
    $(".links li").removeClass("active");
    $(`.links li a[data-id="${$(this).data("id")}"]`)
      .parent()
      .addClass("active");
    $(".tab_menu").hide();
    $($(this).data("id")).show();
    if ($(this).data("id") === "#main") {
      $("#intro").removeClass("hidden_tab");
      $("html").scrollTop($("#nav").offset().top - 200);
      $(".timer_container").show();
    } else {
      $(".timer_container").hide();
      $("#intro").addClass("hidden");
      $("#intro").addClass("hidden_tab");
      $("html").scrollTop(0);
      adaptCardHeight();
    }
  });

  $(".visualizza_offerta").click(() => {
    $(".links li").removeClass("active").first().addClass("active");
    $(".tab_menu").hide();
    $("#main").show();
    $("#intro").removeClass("hidden_tab");
    $(".timer_container").show();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#main").offset().top - 100,
      },
      1000
    );
  });

  function adaptCardHeight() {
    let min_height = 0;
    $(".card_bonus").each(function () {
      let height = Number($(this).css("height").replace("px", ""));
      if (height > min_height) min_height = height;
    });
    $(".card_bonus").css("min-height", min_height + "px");
    $();
  }

  paypal.FUNDING.SOFORT = "disallowed";
  paypal.FUNDING.MYBANK = "disallowed";
  let paypal_inizialize = {
    style: {
      size: "responsive",
      size: "large",
      shape: "pill",
      color: "blue",
      label: "pay",
      fundingicons: true,
      layout: "horizontal",
    },
    // Set up the transaction
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "45",
            },
          },
        ],
      });
    },

    // Finalize the transaction
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        Swal.fire({
          icon: "success",
          title:
            "Pagamento inviato correttamente, contattami per prenotare il primo appuntamento",
          showConfirmButton: true,
          confirmButtonText: "Visualizza i miei contatti",
        }).then(() => {
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $("#footer").offset().top,
            },
            1000
          );
        });
      });
    },
  };

  paypal.Buttons(paypal_inizialize).render("#gold_paypal_button");
  (paypal_inizialize.createOrder = function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "197",
          },
        },
      ],
    });
  }),
    paypal.Buttons(paypal_inizialize).render("#diamond_paypal_button");

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const countDown = new Date("11/26/2021").getTime(),
    countDown2 = new Date("11/27/2021").getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      (document.getElementById("days").innerText = Math.floor(distance / day)),
        (document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        )),
        (document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        )),
        (document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        ));
      //do something later when date is reached
      if (distance < 0) {
        //l'offerta è attualmente valida
        $(".show_if_not_valid").hide();
        $(".hide_if_not_valid").show();
        clearInterval(x);
        $("#headline").html("L'offerta scade fra:");
        y = setInterval(function () {
          const now2 = new Date().getTime(),
            distance2 = countDown2 - now2;

          (document.getElementById("days").innerText = Math.floor(
            distance2 / day
          )),
            (document.getElementById("hours").innerText = Math.floor(
              (distance2 % day) / hour
            )),
            (document.getElementById("minutes").innerText = Math.floor(
              (distance2 % hour) / minute
            )),
            (document.getElementById("seconds").innerText = Math.floor(
              (distance2 % minute) / second
            ));

          //do something later when date is reached
          console.log(distance2);
          if (distance2 < 0) {
            //OFFERTA SCADUTA
            clearInterval(y);
            $("#headline").html("L'offerta è scaduta");
            $("#countdown, .visualizza_offerta").remove();
            $(".hide_if_not_valid").hide();
            $(".hide_if_scaduta").show();
            $(".timer_container").css({
              padding: "0.5rem",
              position: "fixed",
            });
          }
          //seconds
        }, 0);
      }
      //seconds
    }, 0);
})(jQuery);
