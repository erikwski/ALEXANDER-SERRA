/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
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
    }
    let shift_to = $(this).data("id");
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(shift_to + " .div_pagamento_pp").offset().top,
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

  paypal.FUNDING.SOFORT = "disallowed";
  paypal.FUNDING.MYBANK = "disallowed";
  let paypal_inizialize = {
    style: {
      size: "responsive",
      size: "large",
      shape: "pill",
      color: "blue",
      label: "pay",
      tagline: false,
      fundingicons: true,
      layout: "horizontal",
    },
    // Set up the transaction
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "60",
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

  paypal.Buttons(paypal_inizialize).render("#gold_mensile");
  //GOLD QUADRIMESTRALE
  paypal_inizialize.createOrder = function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "197",
          },
        },
      ],
    });
  };
  paypal.Buttons(paypal_inizialize).render("#gold_quadrimestrale");
  // DIAMOND MENSILE
  paypal_inizialize.createOrder = function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "90",
          },
        },
      ],
    });
  };
  paypal.Buttons(paypal_inizialize).render("#diamond_mensile");
  // DIAMOND QUADRIMENSTRALE
  paypal_inizialize.createOrder = function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "297",
          },
        },
      ],
    });
  };
  paypal.Buttons(paypal_inizialize).render("#diamond_quadrimestrale");
  // SUPER DIAMOND MENSILE
  paypal_inizialize.createOrder = function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "120",
          },
        },
      ],
    });
  };
  paypal.Buttons(paypal_inizialize).render("#super_diamond_mensile");
  // SUPER DIAMOND QUADRIMESTRALE
  paypal_inizialize.createOrder = function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "397",
          },
        },
      ],
    });
  };
  paypal.Buttons(paypal_inizialize).render("#super_diamond_quadrimestrale");
})(jQuery);
let initial_animation = document.getElementsByClassName("initial_load");
for (let index = 0; index < initial_animation.length; index++) {
  index === 0
    ? initial_animation[index].classList.add(
        "animate__animated",
        "animate__jackInTheBox"
      )
    : initial_animation[index].classList.add(
        "animate__animated",
        "animate__zoomIn"
      );
  initial_animation[index].classList.remove("hide_load");
}
