$(document).ready(function () {
  $(".btn_home").click(function () {
    let el = $("#intro_container").parent();
    el.addClass("scale_out");
    setTimeout(() => {
      el.hide();
      $("#card_" + $(this).attr("id")).toggle(500);
    }, 700);
  });
  $(".back_home").click(() => {
    $(".card:visible").toggle(500, () => {
      $("#intro_container").parent().removeClass("scale_out").toggle(500);
    });
  });
  $("#containerCondition button").click(function () {
    $(this).parent().addClass("conditionAccepted");
    $("#beforeCondition").toggle(500, () => {
      $("#afterCondition").toggle(500);
    });
  });
  setTimeout(() => {
    $(".loader-overlay").addClass("loader_out");
    $(".load_ini").addClass("go_ini");
  }, 1500);
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let dataInizio = new Date("11/10/2022"),
    dataFine = new Date("11/13/2022 16:00"),
    oggi = new Date(),
    dataOfferta = dataInizio.getTime(),
    offertaAttiva = false;
  // if (dataInizio > oggi) {
  //   $("#notReadyOffert")
  //     .addClass("showIt")
  //     .show()
  //     .find("b")
  //     .html("OFFERTA NON ANCORA ATTIVA");
  // }
  if (dataFine < oggi) {
    $("#notReadyOffert")
      .addClass("showIt")
      .show()
      .find("b")
      .html("OFFERTA NON PIÚ ATTIVA");
  }
  if (dataInizio < oggi) {
    offertaAttiva = true;
    dataOfferta = dataFine.getTime();
    $("#titleTimer").html("L'offerta scade fra:");
  }
  let x1 = setInterval(function () {
    const now = new Date().getTime(),
      distance = dataOfferta - now;

    ($("#countdown1 span")[0].innerText = Math.floor((distance / day) * -1)),
      ($("#countdown1 span")[1].innerText = Math.floor(
        ((distance % day) / hour) * -1
      )),
      ($("#countdown1 span")[2].innerText = Math.floor(
        ((distance % hour) / minute) * -1
      )),
      ($("#countdown1 span")[3].innerText = Math.floor(
        ((distance % minute) / second) * -1
      ));

    if (distance < 0) {
      //timer scaduto
      $("#titleTimer").html("Offerta scaduta da:");
      //clearInterval(x1);
    }
    //seconds
  }, 1000);
});
