(function ($) {
  console.log("ciao 1");
  
  window.$ = $;
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
  ];
  let oggi = new Date();

  gestionePrivacyPolicy();
  updateHtmlForYear();
  fixForFooterNoContent();
  fixForBlogThumbnailSize();
  fixTeamLayout();
  imageSliderSettings();
  textSliderSettings();
  newsBackgroundImages();
  slowScroll();
  logoClickFix();
  placeholderShowHide();
  fitVideo();
  firstSectionActiveFix();
  setMenu();
  SendMail();
  gestioneModalePagamenti();

  //Show-Hide header sidebar
  $("#toggle").on("click", multiClickFunctionStop);

  $("#percorsoDett").on("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    $(".site-wrapper").addClass("navigationOut");
    setTimeout(() => {
      history.pushState({skipAnimation: true}, "mainPage", "index.html");
      window.location.href = "/percorso.html";
    }, 500);
  });

  $(window).on("load", function () {
    console.log("ciao load");
    let data_show_website = new Date("06/11/2022");
    let today = new Date();
    if (data_show_website > today) {
      $(".site-wrapper").addClass("not_ready_website").html(`
        <img src="/images/logo/Logo_vettoriale.png" style="position: absolute;top: 1rem;left: calc(50% - 150px);width: 300px;">
        <div class="fake_card">
          <h3>Il sito sarà disponibile dall' 11 Giugno</h3>
          <div class="timer_container">
            <i style="color: #828282;">Sarà disponibile fra:</i>
            <div id="countdown1" class="countdown">
              <div class="counter"><span></span><b>Giorni</b></div>
              <div class="counter"><span></span><b>Ore</b></div>
              <div class="counter"><span></span><b>Min</b></div>
              <div class="counter"><span></span><b>Sec</b></div>
            </div>
          </div>
          <h3 style="font-size: 1.5rem;">Intanto approfitta dell'offerta sul mio nuovo Coaching !!!</h3>
          <a href="offerta.html" class="button">VISUALIZZA OFFERTA</a>
        </div>
      `);
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let countDown1 = new Date("06/11/2022").getTime();
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
            "<h3 class='offerta_scaduta'>OFFERTA SCADUTA</h3>"
          );
          clearInterval(x1);
        }
        //seconds
      }, 1000);
      setTimeout(() => {
        $(".loader").remove();
        $("#loader img").remove();
        $("html").addClass("loaded enable_scroll");
        setTimeout(() => {
          $("#loader, #cover_loader").remove();
        }, 1000);
      }, 1000);
    } else {
      $(".loader").remove();
      scrollToTopOfPage();
      isotopeSetUp();
      setUpParallax();
      hashFix();
      // skipAnimazioneIniziale();
      if (history.state?.skipAnimation){
        skipAnimazioneIniziale();
      }else{
        // window.history.replaceState({ skipAnimation: false }, null, "");
        animazioneIniziale();
      }
    }
  });

  window.onpopstate = function (event) {
    debugger;
    console.log(event.state?.skipAnimation);
    if (event.state && event.state.skipAnimation) {
      // Force reload to ensure proper rendering
      console.log("reloaded");
      window.location.reload();
    }
  };

  window.onbeforeunload = function () {
    scrollToTopOfPage();
  };

  $(window).on("resize", function () {
    fixForBlogThumbnailSize();
    setActiveMenuItem();
    fixTeamLayout();
  });

  $(window).on("scroll", function () {
    setActiveMenuItem();
  });
  //------------------------------------------------------------------------
  //Helper Methods -->
  //------------------------------------------------------------------------

  function gestionePrivacyPolicy() {
    if (localStorage.getItem("accepted")) acceptCookie();
    $("#confirm_cookie,#confirm_cookie_btn").click(() => {
      localStorage.setItem("accepted", "yes");
      acceptCookie();
    });
  }
  
  function acceptCookie(){
    $("#cookie_policy").addClass("already_accepted");
    
    gtag('consent', 'update', {
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
  }

  function scrollToTopOfPage() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  function updateHtmlForYear() {
    let yy = new Date().getFullYear();
    $("#year").html(yy);
    $("#anni_di_esperienza").html(yy - 2011);
  }

  function skipAnimazioneIniziale(){
    $("#loader, #cover_loader").remove();
    $("html").addClass("loaded enable_scroll");
    $(".site-wrapper").addClass("navigationOut skipAnimation");
    setTimeout(() => {
      $(".site-wrapper").removeClass("skipAnimation");
      setTimeout(() => {
        $(document).scrollTop($("#about").offset().top - 77);
        $(".site-wrapper").removeClass("navigationOut");
        $('a[href="#about"]').click();
        window.history.pushState({ skipAnimation: false }, null, "");
        // setTimeout(()=> $(document).scrollTop($("#about").offset().top - 77), 1)
      }, 1);
    }, 1);
    
  }

  function animazioneIniziale() {
    $("#loader").addClass("runner_animation");
    setTimeout(() => {
      //BACKGROUND ESCE DALLO SCHERMO
      $("html").addClass("loaded");
      //PIANO PIANO RENDERIZZO ELEMENTI
      setTimeout(() => {
        $("#loader, #cover_loader").remove();
        $("html").addClass("loaded enable_scroll");
      }, 1200);
    }, 3000);
  }

  function multiClickFunctionStop() {
    $("#toggle").off("click");
    $("#toggle").toggleClass("on");
    if ($("#toggle").hasClass("on")) {
      $(".menu-holder").addClass("show");
      $("#toggle").on("click", multiClickFunctionStop);
    } else {
      $(".menu-holder").removeClass("show");
      $("#toggle").on("click", multiClickFunctionStop);
    }
  }

  function fixForFooterNoContent() {
    if (
      $(".footer-content").html().replace(/\s/g, "") == "" ||
      $(".footer-content").html().replace(/\s/g, "") ==
        '<divclass="footer-logo-divider"></div><divclass="footer-social-divider"></div>'
    ) {
      $(".footer").addClass("hidden");
    }
  }

  function fixForBlogThumbnailSize() {
    $(".blog-holder .blog-item-holder.has-post-thumbnail").each(function () {
      if (
        $(this).find(".post-thumbnail").height() >
        $(this).find(".entry-holder").innerHeight() + 80
      ) {
        $(this).addClass("is-smaller");
        $(this)
          .find(".post-thumbnail img")
          .height($(this).find(".entry-holder").innerHeight() + 80);
      }
    });
  }

  function setActiveMenuItem() {
    var currentSection = null;
    $(".section").each(function () {
      var element = $(this).attr("id");
      if ($("#" + element).is("*")) {
        if ($(window).scrollTop() >= $("#" + element).offset().top - 115) {
          currentSection = element;
        }
      }
    });
    $("#header-main-menu ul li")
      .removeClass("active")
      .find('a[href*="#' + currentSection + '"]')
      .parent()
      .addClass("active");
  }

  function isotopeSetUp() {
    $(".grid").isotope({
      itemSelector: ".grid-item",
      masonry: {
        columnWidth: ".grid-sizer",
      },
    });
  }

  function imageSliderSettings() {
    $(".image-slider").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var hover_pause = window[id + "_hover"];
      var speed_value = window[id + "_speed"];
      auto_value = auto_value === "true" ? true : false;
      hover_pause = hover_pause === "true" ? true : false;
      $("#" + id).owlCarousel({
        loop: true,
        autoHeight: true,
        smartSpeed: 1000,
        autoplay: auto_value,
        autoplayHoverPause: hover_pause,
        autoplayTimeout: speed_value,
        responsiveClass: true,
        items: 1,
      });
      $(this).on("mouseleave", function () {
        $(this).trigger("stop.owl.autoplay");
        $(this).trigger("play.owl.autoplay", [auto_value]);
      });
    });

    //TOGGLE VISUALIZZA TUTTA LA RECENSIONE
    $(".text-slide-btn a").click(function () {
      let el = $(this).parents(".text-slide").find(".toggle_recensione");
      el.is(":visible")
        ? $(this).html("VISUALIZZA TUTTO")
        : $(this).html("NASCONDI");
      el.toggle(500);
    });
  }

  function textSliderSettings() {
    $(".text-slider").each(function () {
      var id = $(this).attr("id");
      var auto_value = window[id + "_auto"];
      var hover_pause = window[id + "_hover"];
      var speed_value = window[id + "_speed"];
      auto_value = auto_value === "true" ? true : false;
      hover_pause = hover_pause === "true" ? true : false;
      $("#" + id).owlCarousel({
        loop: true,
        autoHeight: false,
        smartSpeed: 1000,
        autoplay: auto_value,
        autoplayHoverPause: hover_pause,
        autoplayTimeout: speed_value,
        responsiveClass: true,
        dots: false,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        nav: true,
        items: 1,
      });
    });
  }

  function setUpParallax() {
    $("[data-jarallax-element]").jarallax({
      speed: 0.2,
      beforeTop: 300,
    });
  }

  function destroyParallax() {
    $("[data-jarallax-element]").jarallax("destroy");
  }

  function fixTeamLayout() {
    if ($(window).width() < 1000) {
      $(".member-right").each(function () {
        if (!$(this).hasClass("small-screen")) {
          $(this)
            .addClass("small-screen")
            .removeClass("big-screen")
            .find("img")
            .insertBefore($(this).find(".member-info"));
        }
      });
    } else {
      $(".member-right").each(function () {
        if (!$(this).hasClass("big-screen")) {
          $(this)
            .addClass("big-screen")
            .removeClass("small-screen")
            .find(".member-info")
            .insertBefore($(this).find("img"));
        }
      });
    }
  }

  function newsBackgroundImages() {
    $(".latest-posts-background-featured-image-holder").each(function () {
      $(this).css(
        "background-image",
        "url(" + ($(this).data("background-image") + ")")
      );
    });
  }

  function slowScroll() {
    $(
      '#header-main-menu ul li a[href^="#"], a.button, a.button-dot, .slow-scroll, #confirm_cookie, #close_modale, #back_to_normal_buy'
    ).on("click", function (e) {
      if ($(this).attr("href") === "#") {
        e.preventDefault();
      } else {
        if ($(window).width() < 1024) {
          if (!$(e.target).is(".sub-arrow")) {
            $("html, body").animate(
              { scrollTop: $(this.hash).offset().top - 76 },
              1500
            );
            $(".menu-holder").removeClass("show");
            $("#toggle").removeClass("on");
            return false;
          }
        } else {
          $("html, body").animate(
            { scrollTop: $(this.hash).offset().top - 76 },
            1500
          );
          return false;
        }
      }
    });
  }

  function logoClickFix() {
    $(".header-logo").on("click", function (e) {
      if ($(".page-template-onepage").length) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 1500);
      }
    });
  }

  function placeholderShowHide() {
    $("input, textarea").on("focus", function () {
      $(this).data("placeholder", $(this).attr("placeholder"));
      $(this).attr("placeholder", "");
    });
    $("input, textarea").on("blur", function () {
      $(this).attr("placeholder", $(this).data("placeholder"));
    });
  }

  function fitVideo() {
    $(".site-content").fitVids({
      ignore: ".wp-block-embed__wrapper",
    });
  }

  function hashFix() {
    var hash = location.hash;
    if (hash != "" && $(hash).length) {
      $("html, body").animate({ scrollTop: $(hash).offset().top - 77 }, 1);
    }
  }

  function firstSectionActiveFix() {
    $(window).scrollTop(1);
    $(window).scrollTop(0);
  }

  function setMenu() {
    $(".trigger_link_click").click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      window.location = $(this).find(".trigger_that").attr("href");
    });
    $(".main-menu").smartmenus({
      subMenusSubOffsetX: 1,
      subMenusSubOffsetY: -8,
      markCurrentTree: true,
    });
    var $mainMenu = $(".main-menu")
      .on("click", "span.sub-arrow", function (e) {
        var obj = $mainMenu.data("smartmenus");
        if (obj.isCollapsible()) {
          var $item = $(this).parent(),
            $sub = $item.parent().dataSM("sub");
          $sub.dataSM("arrowClicked", true);
        }
      })
      .bind({
        "beforeshow.smapi": function (e, menu) {
          var obj = $mainMenu.data("smartmenus");
          if (obj.isCollapsible()) {
            var $menu = $(menu);
            if (!$menu.dataSM("arrowClicked")) {
              return false;
            }
            $menu.removeDataSM("arrowClicked");
          }
        },
      });
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

  scrollToTopOfPage();
})(jQuery);
