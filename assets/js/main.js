// init Isotope
var $grid = $(".grid").isotope({
  itemSelector: ".element-item",
  layoutMode: "fitRows",
  getSortData: {
    name: ".name",
    symbol: ".symbol",
    number: ".number parseInt",
    category: "[data-category]",
    weight: function (itemElem) {
      var weight = $(itemElem).find(".weight").text();
      return parseFloat(weight.replace(/[\(\)]/g, ""));
    },
  },
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function () {
    var number = $(this).find(".number").text();
    return parseInt(number, 10) > 50;
  },
  // show if name ends with -ium
  ium: function () {
    var name = $(this).find(".name").text();
    return name.match(/ium$/);
  },
};

// bind filter button click
$("#filters").on("click", "button", function () {
  var filterValue = $(this).attr("data-filter");
  // use filterFn if matches value
  filterValue = filterFns[filterValue] || filterValue;
  $grid.isotope({
    filter: filterValue,
  });
});

// change is-checked class on buttons
$(".button-group").each(function (i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on("click", "button", function () {
    $buttonGroup.find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
  });
});

// counter project
$.fn.jQuerySimpleCounter = function (options) {
  var settings = $.extend(
    {
      start: 0,
      end: 100,
      easing: "swing",
      duration: 400,
      complete: "",
    },
    options
  );

  var thisElement = $(this);

  $({
    count: settings.start,
  }).animate(
    {
      count: settings.end,
    },
    {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
      },
      complete: settings.complete,
    }
  );
};

$("#number1").jQuerySimpleCounter({
  end: 2000,
  duration: 3000,
});
$("#number2").jQuerySimpleCounter({
  end: 700,
  duration: 3000,
});
$("#number3").jQuerySimpleCounter({
  end: 5,
  duration: 2000,
});

// active header links
// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    /*
      - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
      - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
      */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".navbar-nav a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".navbar-nav a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

// button scroll experience section
var buttons = $(".next-prev");
$(buttons).each(function () {
  $(this).click(function () {
    var id = $(this).attr("id");
    if (id == "next") {
      $("#scroll-div")
        .stop()
        .animate(
          {
            scrollTop: 90,
          },
          300,
          "swing",
          function () {
            $(this)
              .scrollTop(90)
              .find("section:last")
              .after($("section:first", this));
          }
        );
    } else {
      $("#scroll-div")
        .stop()
        .animate(
          {
            scrollTop: 0,
          },
          300,
          "swing",
          function () {
            $(this)
              .scrollTop(90)
              .find("section:first")
              .before($("section:last", this));
          }
        );
    }
  });
});

// before after js
var divisor = document.getElementById("divisor"),
  slider = document.getElementById("slider");

function moveDivisor() {
  divisor.style.width = slider.value + "%";
}

$("input.slider").on("input change", function (event) {
  var element = $(this).parents("div.container");
  var pos = event.target.value;

  element.find("div.before").css({
    width: pos + "%",
  });
  element.find("div.slider-button").css({
    left: "calc(" + pos + "% - 18px)",
  });
});

// isotops-massage first
$(".isotops-massage").on("mouseenter mouseleave", hoverDirectionmassage);

function hoverDirectionmassage(event) {
  var $overlay = $(this).find(".massage-isotopp"),
    side = getMouseDirection(event),
    animateTo,
    positionIn = {
      top: "0%",
      left: "0%",
    },
    positionOut = (function () {
      switch (side) {
        case 0:
          return {
            top: "-100%",
            left: "0%",
          };
          break;
        case 1:
          return {
            top: "0%",
            left: "100%",
          };
          break;
        case 2:
          return {
            top: "100%",
            left: "0%",
          };
          break;
        default:
          return {
            top: "0%",
            left: "-100%",
          };
          break;
      }
    })();
  if (event.type === "mouseenter") {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 200, "linear");
}

function getMouseDirection(event) {
  var $item = $(event.currentTarget),
    offset = $item.offset(),
    w = $item.outerWidth(),
    h = $item.outerHeight(),
    x = (event.pageX - offset.left - w / 2) * (w > h ? h / w : 1),
    y = (event.pageY - offset.top - h / 2) * (h > w ? w / h : 1),
    direction =
      Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return direction;
}

// face massage
$(".isotops-massage-face").on("mouseenter mouseleave", hoverDirection);

function hoverDirection(event) {
  var $overlay = $(this).find(".massage-facee"),
    side = getMouseDirection(event),
    animateTo,
    positionIn = {
      top: "0%",
      left: "0%",
    },
    positionOut = (function () {
      switch (side) {
        case 0:
          return {
            top: "-100%",
            left: "0%",
          };
          break;
        case 1:
          return {
            top: "0%",
            left: "100%",
          };
          break;
        case 2:
          return {
            top: "100%",
            left: "0%",
          };
          break;
        default:
          return {
            top: "0%",
            left: "-100%",
          };
          break;
      }
    })();
  if (event.type === "mouseenter") {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 200, "linear");
}

function getMouseDirection(event) {
  var $item = $(event.currentTarget),
    offset = $item.offset(),
    w = $item.outerWidth(),
    h = $item.outerHeight(),
    x = (event.pageX - offset.left - w / 2) * (w > h ? h / w : 1),
    y = (event.pageY - offset.top - h / 2) * (h > w ? w / h : 1),
    direction =
      Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return direction;
}

// second hair
$(".isotops-massage-hair").on("mouseenter mouseleave", hoverDirectionhair);

function hoverDirectionhair(event) {
  var $overlay = $(this).find(".massage-hairr"),
    side = getMouseDirection(event),
    animateTo,
    positionIn = {
      top: "0%",
      left: "0%",
    },
    positionOut = (function () {
      switch (side) {
        case 0:
          return {
            top: "-100%",
            left: "0%",
          };
          break;
        case 1:
          return {
            top: "0%",
            left: "100%",
          };
          break;
        case 2:
          return {
            top: "100%",
            left: "0%",
          };
          break;
        default:
          return {
            top: "0%",
            left: "-100%",
          };
          break;
      }
    })();
  if (event.type === "mouseenter") {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 200, "linear");
}

function getMouseDirection(event) {
  var $item = $(event.currentTarget),
    offset = $item.offset(),
    w = $item.outerWidth(),
    h = $item.outerHeight(),
    x = (event.pageX - offset.left - w / 2) * (w > h ? h / w : 1),
    y = (event.pageY - offset.top - h / 2) * (h > w ? w / h : 1),
    direction =
      Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return direction;
}

// third nail
$(".isotops-massage-nail").on("mouseenter mouseleave", hoverDirectionnail);

function hoverDirectionnail(event) {
  var $overlay = $(this).find(".massage-naill"),
    side = getMouseDirection(event),
    animateTo,
    positionIn = {
      top: "0%",
      left: "0%",
    },
    positionOut = (function () {
      switch (side) {
        case 0:
          return {
            top: "-100%",
            left: "0%",
          };
          break;
        case 1:
          return {
            top: "0%",
            left: "100%",
          };
          break;
        case 2:
          return {
            top: "100%",
            left: "0%",
          };
          break;
        default:
          return {
            top: "0%",
            left: "-100%",
          };
          break;
      }
    })();
  if (event.type === "mouseenter") {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 200, "linear");
}
