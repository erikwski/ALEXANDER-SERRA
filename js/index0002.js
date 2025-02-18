(function ($) {  
  window.$ = $;
  
  let oggi = new Date(),
    startPopup = new Date("01/02/2025 00:00"),
    endPopup = new Date("05/11/2025 00:00"),
    isPopupEnabled =
      oggi > startPopup &&
      oggi < endPopup &&
      +localStorage.getItem("popupRaduni2025") < 3;

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
  gestioneCallConoscitiva();

  //Show-Hide header sidebar
  $("#toggle").on("click", multiClickFunctionStop);

  $(".preventDefault").click(function(e){
    e.preventDefault();
  })
  // $("#percorsoDett").on("click", (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   $(".site-wrapper").addClass("navigationOut");
  //   localStorage.setItem("skipAndScrollTo", "about");
  //   setTimeout(() => {
  //     window.location.href = "percorso.html";
  //   }, 500);
  // });

  $(window).on("load", function () {
    $(".loader").remove();
    scrollToTopOfPage();
    isotopeSetUp();
    setUpParallax();
    hashFix();
    const scrollTo = localStorage.getItem("skipAndScrollTo");
    if (scrollTo) {
      localStorage.removeItem("skipAndScrollTo");
      skipAnimazioneIniziale(scrollTo);
    } else {
      animazioneIniziale();
    }
  });

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

  function skipAnimazioneIniziale(scrollTo) {
    $("#loader, #cover_loader").remove();
    $("html").addClass("loaded enable_scroll");
    $(".site-wrapper").addClass("navigationOut skipAnimation");
    setTimeout(() => {
      $(".site-wrapper").removeClass("skipAnimation");
      setTimeout(() => {
        $(".site-wrapper").removeClass("navigationOut");
        const scrollEl = $("#" + scrollTo);
        if (scrollEl.length) {
          $(document).scrollTop(scrollEl.offset().top - 77);
          $(`a[href="#${scrollTo}"]`).click();
        }
      }, 1);
    }, 1);
  }

  function animazioneIniziale() {
    $("#loader").addClass("runner_animation");
    setTimeout(() => {
      //BACKGROUND ESCE DALLO SCHERMO
      $("html").addClass("loaded");
      showPopupRaduni();
      //PIANO PIANO RENDERIZZO ELEMENTI
      setTimeout(() => {
        $("#loader, #cover_loader").remove();
        if (!isPopupEnabled) $("html").addClass("enable_scroll");
      }, 1200);
    }, 3000);
  }

  function showPopupRaduni() {
    if (isPopupEnabled) {
      $("#removeIfNoOffer").show();

      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let countDownPopup = endPopup.getTime();
      let x3 = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDownPopup - now;

        let ggPopup = Math.floor(distance / day);
        let hhPopup = (distance % day) / hour;
        //   mmPopup = (distance % hour) / minute,
        //   ssPopup = (distance % minute) / second;
        $("#countdownPopup .counterPopup")[0].innerText =
          (ggPopup < 10 && "0") + Math.floor(ggPopup);
        $("#countdownPopup .counterPopup")[1].innerText =
          (hhPopup < 10 && "0") + Math.floor(hhPopup);
        // $("#countdownPopup .counterPopup")[1].innerText =
        //   (mmPopup < 10 && "0") + Math.floor(mmPopup);
        // $("#countdownPopup .counterPopup")[2].innerText =
        //   (ssPopup < 10 && "0") + Math.floor(ssPopup);

        if (distance < 0) {
          //offerta scaduta
          clearInterval(x3);
          location.reload();
        }
        //seconds
      }, 1000);

      $("#popupButton").click(() => {
        //setto a 5 cosí da non mostrare piú popup a chi lo clicca
        localStorage.setItem("popupRaduni2025", 5);
        try {
          $.get("api/updateContatore.php", {
            id: 3,
          }).always(() => (window.location.href = "raduni2025"));
        } catch (error) {
          localStorage.setItem("popupRaduni2025", 2);
          console.log("errore check popup");
        }
      });
      $("#popup-overlay, #popupSkip").click(() => {
        try {
          let closedClick = +localStorage.getItem("popupRaduni2025");
          localStorage.setItem("popupRaduni", closedClick++);
          try {
            $.get("api/updateContatore.php", {
              id: 4,
            }).always(() => console.log("raduni2024 declined"));
          } catch (error) {
            localStorage.setItem("popupRaduni2025", 2);
            console.log("errore check popup");
          }
          $("html").addClass("enable_scroll");
          $("#popup").addClass("toggleOut");
          $("#popup-overlay").addClass("delay-0").removeClass("open");

          setTimeout(() => {
            $("#popup, #popup-overlay").remove();
            clearInterval(x3);
          }, 1700);
        } catch (error) {
          console.log(error, "ciao");
        }
      });
      $("#popup, #popup-overlay").addClass("open");
    } else {
      $("#popup, #popup-overlay").remove();
    }
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

  function isValidEmailAddress(emailAddress) {
    var pattern =
      /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  }

  function SendMail() {
    $("#showFormContattami").click(()=>{
      if($("#halfOnFormSubmit").hasClass("one_half")){
        $("#formContattami").hide(500, () =>
          $("#halfOnFormSubmit").removeClass("one_half")
        );
      }else{
        $("#halfOnFormSubmit").addClass("one_half")
        $("#formContattami").show(500);
      }
    });

    $("#invia_mail").click(() => {
      $("#invia_mail").addClass("disabled");
      var emailVal = $("#contact-email").val();
      if (
        isValidEmailAddress(emailVal) ||
        $("#contact-telephone").val().length > 0
      ) {
        var params = {
          nome: $("#name").val(),
          email: $("#contact-email").val() || "mailnoncompilata@fakemail.com",
          telefono: $("#contact-telephone").val(),
          soggetto: $("#subject").val(),
          messaggio: $("#message").val(),
        };

        // Serializzazione dei dati in formato URL-encoded
        var formBody = Object.keys(params)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          )
          .join("&");

        // Invio della richiesta AJAX a FormKeep
        $.ajax({
          url: "https://formkeep.com/f/b262ef7e8af9",
          method: "POST",
          data: formBody,
          contentType: "application/x-www-form-urlencoded",
          success: function () {
            $(".contact-submit-message").addClass("successSubmit").show().html("Richiesta inviata correttamente, ti ricontatteremo il prima possibile")
            $(
                ".contact-form input:not([type='submit']), .contact-form textarea"
              ).val("");
            $("#invia_mail").removeClass("disabled");
          },
          error: function () {
            $(".contact-submit-message")
              .addClass("errorSubmit")
              .show()
              .html("Errore nell'invio della richiesta, riprovare più tardi");
            $("#invia_mail").removeClass("disabled");
          }
        });
      } else {
        $(".contact-submit-message").addClass("warningSubmit").show().html("Compila correttamente la mail oppure il numero di telefono")
        $("#invia_mail").removeClass("disabled");
      }
    });
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

  function gestioneCallConoscitiva() {
    $("#call-conoscitiva").click(()=>{
      if (!$(".alex-dialog").hasClass("open")){
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

  scrollToTopOfPage();
})(jQuery);
