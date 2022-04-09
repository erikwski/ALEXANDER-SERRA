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
$("[name=checked-demo]").click(function () {
  if ($(this).prop("checked")) {
    $("#container_check").addClass("checkbox_active");
    $(".btn_group").removeClass("disabled");
  } else {
    $("#container_check").removeClass("checkbox_active");
    $(".btn_group").addClass("disabled");
  }
});
setTimeout(() => {
  $(".loader-overlay").addClass("loader_out");
  $(".load_ini").addClass("go_ini");
}, 1500);
