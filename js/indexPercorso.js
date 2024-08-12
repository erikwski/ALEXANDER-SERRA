$(function () {
  ("use strict");

  $(document).ready(function () {
    console.log("ciao");
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");
    window.history.replaceState({ skipAnimation: true }, null, "/index.html");
    $(".navigateBack").on("click", ()=>{
      $("#openingPercorso").removeClass("loaded");
      $(".site-wrapper").removeClass("navigationIn");
      setTimeout(() => {
        window.history.back();
      }, 500);
    });
  });
});