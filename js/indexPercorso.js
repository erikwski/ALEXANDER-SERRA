$(function () {
  ("use strict");

  $(document).ready(function () {
    console.log("ciao");
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");
    //push new state for prevent back
    window.history.pushState({ skipAnimation: true }, null, "");
    window.addEventListener("popstate", navigateBack);
    
    $(".navigateBack").on("click", navigateBack);
  });

  function navigateBack(){
    console.log("back");
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");

    setTimeout(() => {
      window.history.back();
    }, 500);
  }
});