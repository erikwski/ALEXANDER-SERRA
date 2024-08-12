$(function () {
  ("use strict");
  localStorage.setItem("skipAndScrollTo", "about");

  $(document).ready(function () {
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");
  
    $(".navigateBack").on("click", navigateBack);
  });

  function navigateBack(e){
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");
    setTimeout(() => {
      // window.history.back();
    }, 500);
  }
});