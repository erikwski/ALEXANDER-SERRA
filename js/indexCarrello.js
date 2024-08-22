$(function () {
  ("use strict");
  localStorage.setItem("skipAndScrollTo", "pricing");

  let invioMailutente = false;
  const COSTO_PACCHETTI = [
    {
      id: 1,
      desc: "BASIC MENSILE",
      costo: 60,
    },
    {
      id: 2,
      desc: "BASIC TRIMESTRALE",
      costo: 157,
    },
    {
      id: 3,
      desc: "STANDARD MENSILE",
      costo: 90,
    },
    {
      id: 4,
      desc: "STANDARD TRIMESTRALE",
      costo: 237,
    },
    {
      id: 5,
      desc: "PREMIUM MENSILE",
      costo: 120,
    },
    {
      id: 6,
      desc: "PREMIUM TRIMESTRALE",
      costo: 317,
    },
    {
      id: 7,
      desc: "OFFERTA 10 GIUGNO",
      costo: 317,
    },
    {
      id: 8,
      desc: "BLACK FRIDAY 2022 + ANALISI CORSA",
      costo: 197,
    },
    {
      id: 9,
      desc: "BLACK FRIDAY 2022",
      costo: 197,
    },
    {
      id: 10,
      desc: "10KM & LODE",
      costo: 77,
    },
    {
      id: 11,
      desc: "OFFERTA 15 DICEMBRE",
      costo: 45,
    },
    {
      id: 12,
      desc: "OFFERTA 22 DICEMBRE",
      costo: 157,
    },
    {
      id: 100,
      desc: "START - 1 MESE",
      costo: 60,
    },
    {
      id: 101,
      desc: "START - 3 MESI",
      costo: 157,
    },
    {
      id: 102,
      desc: "START - 6 MESI",
      costo: 297,
    },
    {
      id: 110,
      desc: "PRO - 3 MESI",
      costo: 197,
    },
    {
      id: 111,
      desc: "PRO - 6 MESI",
      costo: 377,
    },
    {
      id: 120,
      desc: "TOP - 1 MESI",
      costo: 110,
    },
    {
      id: 121,
      desc: "TOP - 3 MESE",
      costo: 297,
    },
    {
      id: 122,
      desc: "TOP - 6 MESI",
      costo: 567,
    },
    {
      id: 123,
      desc: "TOP - 12 MESI",
      costo: 997,
    },
  ];
  let coachingGlobal = "";
  let coachingMesi = 0;

  $(document).ready(function () {
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");

    $(".navigateBack").on("click", navigateBack);

    gestioneCallConoscitiva();
    gestionePagamenti();
  });

  function navigateBack(e) {
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");
    setTimeout(() => {
      // window.history.back();
    }, 500);
  }

  function checkAcquistabile() {
    let valid_input = true;
    $("#dati_acquirente input:not([type='checkbox'])").each(function () {
      if ($(this).val() === "") {
        valid_input = false;
        $(this).addClass("invalid_input");
      } else {
        $(this).removeClass("invalid_input");
      }
    });

    let valid_checkbox = true;
    $("#dati_acquirente input[type='checkbox']").each(function () {
      if (!$(this).prop("checked")) valid_checkbox = false;
    });
    return valid_input && valid_checkbox;
  }

  function changedCoaching(pacchettoRichiesto) {
    coachingGlobal = pacchettoRichiesto;
    $(".coaching_card").removeClass("selected").find(".addToCart").html(`
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
      </svg>
    `);
    $("#riepilogo tbody").html("");
    $("#cart")
      .removeClass("start pro top forza tecnica")
      .addClass(pacchettoRichiesto);
    $(".coaching_card").hide();
    $("#tecnica, #forza").show();
    // CHANGE LABEL
    if (pacchettoRichiesto == "forza" || pacchettoRichiesto == "tecnica") {
      //only services
    } else {
      //coaching
      $("#coaching_name").html(pacchettoRichiesto.toUpperCase());
      $(".coachingBenefit").hide();
      $(`.switchCoaching`).removeClass("active");
      $(".colorChanging").removeClass("c_primary c_secondary c_start");
      $(`.switchCoaching[data-coaching='${pacchettoRichiesto}']`).addClass(
        "active"
      );
      $(`#${pacchettoRichiesto}-coaching`).show();
      switch (pacchettoRichiesto) {
        case "start":
          $(".colorChanging").addClass("c_start");
          $("#mensile, #trimestrale, #semestrale").show();
          $("#mensile .price-tag").html("60€");
          $("#trimestrale .price-tag").html("157€");
          $("#semestrale .price-tag").html("297€");
          break;
        case "pro":
          $(".colorChanging").addClass("c_secondary");
          $("#trimestrale, #semestrale").show();
          $("#trimestrale .price-tag").html("197€");
          $("#semestrale .price-tag").html("377€");
          break;
        case "top":
          $(".colorChanging").addClass("c_primary");
          $("#mensile, #trimestrale, #semestrale, #annuale").show();
          $("#mensile .price-tag").html("110€");
          $("#trimestrale .price-tag").html("297€");
          $("#semestrale .price-tag").html("567€");
          $("#annuale .price-tag").html("997€");
          break;
        default:
      }
    }
  }

  function gestionePagamenti() {
    if (localStorage.getItem("accepted")) {
      $("#privacy_policy").prop("checked", true);
    }
    try {
      let users = JSON.parse(localStorage.getItem("user"));
      $("#name_buyer").val(users.persona);
      $("#email_buyer").val(users.mail);
      $("#telephone_buyer").val(users.telefono);
      $("#cod_fisc_buyer").val(users.cod_fisc);
      $("#address_buyer").val(users.address);
      $("#city_buyer").val(users.city);
      $("#cap_buyer").val(users.cap);
      $("#prov_buyer").val(users.prov);
      $("#modale_pagamento input[type='checkbox']").prop("checked", true);
      $("#label_last_buy").show();
    } catch (error) {
      console.log("L'utente non ha mai acquistato un pacchetto");
    }

    // $("#dati_acquirente, #dati_bonifico").addClass("show_acquirente");
    changedCoaching(
      new URLSearchParams(window.location.search).get("coaching")
    );

    $(".switchCoaching").click(function () {
      if (!$(this).hasClass("active"))
        changedCoaching($(this).data("coaching"));
    });

    $(".coaching_card").click(function (e) {
      e.preventDefault();
      $("#riepilogo tbody").html("");
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected").find(".addToCart").html(`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          `);
      } else {
        if ($(this).parents(".coaching_avaiable").length) {
          coachingMesi = $(this).attr("id");
          $(".coaching_avaiable .coaching_card")
            .removeClass("selected")
            .find(".addToCart").html(`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          `);
        }
        $(this).addClass("selected").find(".addToCart").html(`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
          </svg>
        `);
      }
      if ($(".selected").length) {
        let total = 0;
        $(".selected").each(function () {
          let name = $(this).parents(".coaching_avaiable").length
            ? `ALERUNNER ${coachingGlobal} - ${coachingMesi}`
            : $(this).attr("id") == "forza"
            ? "SCHEDA DI FORZA"
            : "ANALISI TECNICA DI CORSA";

          let price = $(this).find(".price-tag").html();
          total += parseInt(price);
          $("#riepilogo tbody").append(`
        <tr>
          <td>${name}</td>
          <td>${price}</td>
        </tr>
      `);
        });
        $("#riepilogo tbody").append(`
        <tr>
          <td><strong>TOTALE:</strong></td>
          <td>${total}€</td>
        </tr>
      `);
        $("#riepilogo-cont").show();
      } else {
        $("#riepilogo-cont").hide();
      }
    });

    $("#dati_acquirente input").on("change keyup", () => {
      if (checkAcquistabile()) {
        //PRONTO AD ACQUISTARE
        if (!$("#paypal_container").hasClass("rendered_paypal"))
          inizializzaPaypal();
      } else {
        //NON VALIDO
        $(".show_when_valid").removeClass("show_valid");
        $("#oppure_pay_label").removeClass("acquisto_valido");
        if ($("#paypal_container").hasClass("rendered_paypal")) {
          $("#paypal_container").removeClass("rendered_paypal").html("");
          $("#fake_paypal_btn, #fake_bonifico").fadeIn(500);
        }
      }
    });

    $(".card_pacchetti").click(function () {
      if ($(this).hasClass("pacchetto_selezionato")) return;
      $("#card_container").addClass("pacc_sel");
      $(".pacchetto_selezionato").removeClass("pacchetto_selezionato");
      $(this).addClass("pacchetto_selezionato");
      $("#dati_acquirente").addClass("show_acquirente");
      if (checkAcquistabile()) {
        //PRONTO AD ACQUISTARE
        inizializzaPaypal();
      }
      $("#modale_pagamento").animate(
        {
          scrollTop: $("#dati_acquirente").position().top,
        },
        1000
      );
    });

    $("#show_dati_bonifico").click(() => {
      $("#modale_pagamento").addClass("disabled_scroll").scrollTop(0);
      $("#toggle_dati_bonifico").toggle();
      if (!invioMailutente) invioMailDatiUtente();
    });

    $("#back_to_normal_buy").click(() => {
      $("#modale_pagamento").removeClass("disabled_scroll").scrollTop(0);
      $(".scale_out").removeClass("scale_out");
      $(".scale_in").hide().removeClass("scale_in");
    });

    $("#close_modale").click(() => {
      $("#modale_pagamento")
        .removeClass("open_modale")
        .removeClass("disabled_scroll")
        .scrollTop(0);
      $("html").removeClass("disabled_scroll");
      $(".pacchetto_selezionato").removeClass("pacchetto_selezionato");
      $("#dati_acquirente").removeClass("show_acquirente");
      $("#card_container").removeClass("pacc_sel");
      $("#fake_paypal_btn, #fake_bonifico").fadeIn(500);
      $("#dati_acquirente input").val("");
      $(".scale_out").removeClass("scale_out");
      $(".scale_in").hide().removeClass("scale_in");
      $(".show_when_valid").removeClass("show_valid");
      $("#oppure_pay_label").removeClass("acquisto_valido");
      $("#paypal_container").removeClass("rendered_paypal").html("");
    });
    // $($(".buy_coaching")[0]).click();
  }

  function inizializzaPaypal() {
    let id_pacchetto = $("#modale_pagamento").data("pacchetto");
    if ($("#pacc_trimestrale").hasClass("pacchetto_selezionato"))
      id_pacchetto++;
    $("#paypal_container").addClass("rendered_paypal").html("");
    $(".show_when_valid").addClass("show_valid");
    $("#oppure_pay_label").addClass("acquisto_valido");
    $("#fake_paypal_btn, #fake_bonifico").fadeOut(500);
    paypal.FUNDING.SOFORT = "disallowed";
    // paypal.FUNDING.MYBANK = "disallowed";
    try {
      let pacchetto_venduto =
        COSTO_PACCHETTI[
          COSTO_PACCHETTI.findIndex((cc) => cc.id == id_pacchetto)
        ];
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
                  value: pacchetto_venduto.costo,
                },
              },
            ],
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            let payer = orderData.payer;
            confermaPagamento({
              paypal_name: payer.name.surname + " " + payer.name.given_name,
              paypal_address: `${payer.address.address_line_1}, ${payer.address.admin_area_1} - ${payer.address.postal_code}`,
              paypal_mail: payer.email_address,
              order_id: data.orderID,
              payer_id: data.payerID,
              data_pagamento: new Date().toLocaleString(),
              persona: $("#name_buyer").val(),
              mail: $("#email_buyer").val(),
              telefono: $("#telephone_buyer").val(),
              cod_fisc: $("#cod_fisc_buyer").val(),
              address: $("#address_buyer").val(),
              city: $("#city_buyer").val(),
              cap: $("#cap_buyer").val(),
              prov: $("#prov_buyer").val(),
              pacchetto: id_pacchetto,
              costo: pacchetto_venduto.costo,
              pacchetto_desc: pacchetto_venduto.desc,
            });
            $("#close_modale").click();
            Swal.fire({
              icon: "success",
              title:
                "Pagamento inviato correttamente, ti contatterò per fissare il nostro appuntamento",
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then(() => {
              //aggiungi data
              $("#close_modale").click();
            });
          });
        },
      };
      paypal.Buttons(paypal_inizialize).render("#paypal_container");
    } catch (error) {
      alert(
        "ERRORE CRITICO: contatta l'amministrazione per effettuare correttamente il pagamento"
      );
    }
  }

  function confermaPagamento(dati) {
    try {
      localStorage.setItem("user", JSON.stringify(dati));
      $.post("api/conferma_acquisto.php", dati)
        .done((j) => {
          if (j.length) {
            Swal.fire({
              icon: "error",
              title:
                "ERRORE CRITICO: contatta l'amministrazione per confermare il pagamento",
              showConfirmButton: true,
              confirmButtonText: "OK",
            });
          }
        })
        .error(() => {
          Swal.fire({
            icon: "error",
            title:
              "ERRORE CRITICO: contatta l'amministrazione per confermare il pagamento",
            showConfirmButton: true,
            confirmButtonText: "OK",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          "ERRORE CRITICO: contatta l'amministrazione per confermare il pagamento",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    }
  }

  function invioMailDatiUtente() {
    invioMailutente = true;
    let dati = {
      persona: $("#name_buyer").val(),
      mail: $("#email_buyer").val(),
      telefono: $("#telephone_buyer").val(),
      cod_fisc: $("#cod_fisc_buyer").val(),
      address: $("#address_buyer").val(),
      city: $("#city_buyer").val(),
      cap: $("#cap_buyer").val(),
      prov: $("#prov_buyer").val(),
      pacchetto_desc: "10Km & Lode",
    };
    try {
      localStorage.setItem("user", JSON.stringify(dati));
      $.post("api/invio_mail_bonifico.php", dati).done((j) => {
        if (j.length) {
          alert("ERRORE: non é stato possibile salvare i dati dell'utente");
        }
      });
    } catch (error) {
      alert("ERRORE: non é stato possibile salvare i dati dell'utente");
    }
  }

  function gestioneCallConoscitiva() {
    $("#call-conoscitiva").click(() => {
      if (!$(".alex-dialog").hasClass("open")) {
        $("html").addClass("disabled_scroll");
        $(".alex-dialog, .alex-dialog-overlay").addClass("open");
        $(".alex-dialog .alex-dialog-container").append(`
          <div class="alex-dialog-iframe-container">
            <iframe src="https://calendly.com/runningcoach/15min" width="100%" height="100%" frameborder="0"></iframe>
          </div>
        `);
      }
    });

    $(".alex-dialog-overlay, .alex-dialog-close").click(() => {
      $("html").removeClass("disabled_scroll");
      $(".alex-dialog, .alex-dialog-overlay").removeClass("open");
      $(".alex-dialog .alex-dialog-container").html("");
    });
  }
});
