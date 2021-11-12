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

  $("#send_mail").click(() => {
    $.post("https://formspree.io/f/mnqlkegw", {
      nome: $("#name").val(),
      contatto_utente: $("#email").val(),
      servizio_interessato:
        $("#service").val() === "" ? "Non specificato" : $("#service").val(),
      messaggio: $("#message").val(),
    })
      .done((j) => {
        $(".alert").addClass("active");
        $("#name").val("");
        $("#email").val("");
        $("#service").val("");
        $("#message").val("");
        setTimeout(() => {
          $(".closebtn").click();
        }, 3000);
      })
      .fail((j) => {
        $(".alert").addClass("active");
        $("#name").val("");
        $("#email").val("");
        $("#service").val("");
        $("#message").val("");
        setTimeout(() => {
          $(".closebtn").click();
        }, 3000);
      });
  });

  $(".closebtn").click(() => $(".alert").removeClass("active"));

  $(".links li").click(function () {
    $(".links li").removeClass("active");
    $(this).addClass("active");
    $(".tab_menu").hide();
    $($(this).find("a").data("id")).show();
    if ($(this).find("a").data("id") === "#main") {
      $("#intro").removeClass("hidden_tab");
      $("html").scrollTop($("#nav").offset().top - 200);
    } else {
      $("#intro").addClass("hidden");
      $("#intro").addClass("hidden_tab");
      $("html").scrollTop(0);
    }
  });

  $(".trigger_click_on_btn_price_card").click(function () {
    $(this).parents("ul").find(".btn_price_card").click();
  });
  $(".btn_price_card, .link_to_offer").click(function () {
    $(".links li").removeClass("active");
    $(`.links li a[data-id="${$(this).data("id")}"]`)
      .parent()
      .addClass("active");
    $(".tab_menu").hide();
    $($(this).data("id")).show();
    if ($(this).data("id") === "#main") {
      $("#intro").removeClass("hidden_tab");
      $("html").scrollTop($("#nav").offset().top - 200);
    } else {
      $("#intro").addClass("hidden");
      $("#intro").addClass("hidden_tab");
      $("html").scrollTop(0);
    }
  });
})(jQuery);
