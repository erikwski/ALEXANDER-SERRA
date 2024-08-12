$(function () {
  ("use strict");

  $(document).ready(function () {
    console.log("percorso");
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");

    window.onbeforeunload = navigateBack;

    $(".navigateBack").on("click", navigateBack);
  });

  function navigateBack(e){
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");
    setTimeout(() => {
      window.history.back();
    }, 500);
  }
});