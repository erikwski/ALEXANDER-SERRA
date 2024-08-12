$(function () {
  ("use strict");

  $(document).ready(function () {
    console.log("ciao");
    $(".site-wrapper").addClass("navigationIn");
    $("#openingPercorso").addClass("loaded");
    $("html").addClass("loaded enable_scroll");
    //push new state for prevent back
    window.addEventListener("hashchange", navigateBack);
    window.addEventListener("popstate", navigateBack);
    
    $(".navigateBack").on("click", navigateBack);
  });

  function navigateBack(e){
    console.log(e);
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
    console.log("back");
    $("#openingPercorso").removeClass("loaded");
    $(".site-wrapper").removeClass("navigationIn");
    debugger;
    setTimeout(() => {
      window.history.back();
    }, 500);
  }
});