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
    dataOfferta = dataInizio.getTime();
  // if (dataInizio > oggi) {
  //   $("#notReadyOffert")
  //     .addClass("showIt")
  //     .show()
  //     .find("b")
  //     .html("NON ANCORA ATTIVA");
  // }
  if (dataFine < oggi) {
    $("#notReadyOffert")
      .addClass("showIt")
      .show()
      .find("b")
      .html("CHALLENGE NON PIÚ ATTIVA");
    $("#bannerTimeout").hide();
  }
  if (dataInizio < oggi) {
    dataOfferta = dataFine.getTime();
    $("#titleTimer").html("La Challenge inizia fra:");
  } else {
    $("#gruppi_whatsapp").addClass("disabled");
  }
  let x1 = setInterval(function () {
    const now = new Date().getTime(),
      distance = dataOfferta - now;

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
      //timer scaduto
      clearInterval(x1);
      window.location.reload();
    }
    //seconds
  }, 1000);
});
