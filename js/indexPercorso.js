$(function () {
  ("use strict");
  localStorage.setItem("skipAndScrollTo", "about");

  $(document).ready(function () {
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");
  
    $(".navigateBack").on("click", navigateBack);

    slowScroll();
  });

  function navigateBack(e){
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");
    setTimeout(() => {
      // window.history.back();
    }, 500);
  }

  function slowScroll() {
    $(
      'a.button'
    ).on("click", function (e) {
      if ($(this).attr("href") === "#") {
        e.preventDefault();
      } else {
        if ($(window).width() < 1024) {
          if (!$(e.target).is(".sub-arrow")) {
            $("html, body").animate(
              { scrollTop: $(this.hash).offset().top },
              500
            );
            $(".menu-holder").removeClass("show");
            $("#toggle").removeClass("on");
            return false;
          }
        } else {
          $("html, body").animate(
            { scrollTop: $(this.hash).offset().top },
            500
          );
          return false;
        }
      }
    });
  }
});