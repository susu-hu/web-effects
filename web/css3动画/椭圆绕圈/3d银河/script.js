$(window).load(function () {
  var a = $("body"),
    e = $("#universe"),
    d = $("#solar-system");
  var b = function () {
    a.removeClass("view-2D opening")
      .addClass("view-3D")
      .delay(2000)
      .queue(function () {
        $(this).removeClass("hide-UI").addClass("set-speed");
        $(this).dequeue();
      });
  };
  var c = function (f) {
    e.removeClass().addClass(f);
  };
  $("#toggle-data").click(function (f) {
    a.toggleClass("data-open data-close");
    f.preventDefault();
  });
  $("#toggle-controls").click(function (f) {
    a.toggleClass("controls-open controls-close");
    f.preventDefault();
  });
  $("#data a").click(function (f) {
    var g = $(this).attr("class");
    d.removeClass().addClass(g);
    $(this).parent().find("a").removeClass("active");
    $(this).addClass("active");
    f.preventDefault();
  });
  $(".set-view").click(function () {
    a.toggleClass("view-3D view-2D");
  });
  $(".set-zoom").click(function () {
    a.toggleClass("zoom-large zoom-close");
  });
  $(".set-speed").click(function () {
    c("scale-stretched set-speed");
  });
  $(".set-size").click(function () {
    c("scale-s set-size");
  });
  $(".set-distance").click(function () {
    c("scale-d set-distance");
  });
  b();
});
