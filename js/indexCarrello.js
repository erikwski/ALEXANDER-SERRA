$(function () {
  ("use strict");

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
      desc: "BASIC - 1 MESE",
      costo: 60,
    },
    {
      id: 101,
      desc: "BASIC - 3 MESI",
      costo: 157,
    },
    {
      id: 102,
      desc: "BASIC - 6 MESI",
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

  $(document).ready(function () {
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");

    $(".navigateBack").on("click", navigateBack);

    gestioneCallConoscitiva();
  });

  function navigateBack(e) {
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");
    setTimeout(() => {
      // window.history.back();
    }, 500);
  }
  
  function isValidEmailAddress(emailAddress) {
    var pattern =
      /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  }

  function SendMail() {
    $("#invia_mail").click(() => {
      var emailVal = $("#contact-email").val();
      if (
        isValidEmailAddress(emailVal) ||
        $("#contact-telephone").val().length > 0
      ) {
        var params = {
          action: "SendMessage",
          name: $("#name").val(),
          email: $("#contact-email").val() || "mailnoncompilata@fakemail.com",
          tel: $("#contact-telephone").val(),
          subject: $("#subject").val(),
          message: $("#message").val(),
        };
        $.post(
          "https://getform.io/f/5584c108-b4a4-41cf-8219-164eac51d191",
          params
        )
          .done(() => {
            Swal.fire({
              icon: "success",
              title:
                "Richiesta inviata correttamente, ti ricontatteremo il prima possibile",
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then(() => {
              $(
                ".contact-form input:not([type='submit']), .contact-form textarea"
              ).val("");
            });
          })
          .fail(() => {
            Swal.fire({
              icon: "error",
              title: "Errore nell'invio della richiesta, riprovare più tardi",
              showConfirmButton: true,
              confirmButtonText: "OK",
            });
          });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Compila correttamente la mail oppure il numero di telefono",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    });
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

  function gestioneModalePagamenti() {
    $(".buy_coaching").click(function () {
      //spunto checkbox privacy se già accettata
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
      let pacchetto = $(this).data("id");
      $("#modale_pagamento")
        .addClass("open_modale")
        .data("pacchetto", pacchetto);
      $("html").addClass("disabled_scroll");
      switch (pacchetto) {
        case 1:
          $("#nome_pacchetto").html("BASIC");
          $("#costo_mensile, #info_bonifico_mensile span").html("€60");
          $("#costo_trimestrale, #info_bonifico_trimestrale span").html("€157");
          $("#pacc_trimestrale").attr("risparmio", "RISPARMI €23");
          break;
        case 3:
          $("#nome_pacchetto").html("STANDARD");
          $("#costo_mensile, #info_bonifico_mensile span").html("€90");
          $("#costo_trimestrale, #info_bonifico_trimestrale span").html("€237");
          $("#pacc_trimestrale").attr("risparmio", "RISPARMI €33");
          break;
        case 5:
          $("#nome_pacchetto").html("PREMIUM");
          $("#costo_mensile, #info_bonifico_mensile span").html("€120");
          $("#costo_trimestrale, #info_bonifico_trimestrale span").html("€317");
          $("#pacc_trimestrale").attr("risparmio", "RISPARMI €43");
          break;
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
      $(".hide_on_bonifico").addClass("scale_out");
      $(".toggle_dati_bonifico").show().addClass("scale_in");
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