(function () {
  var loadCss = function(filename) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);
  };
  var dark = document.getElementById('dark-mode');
  var light = document.getElementById('light-mode');

  var hide = function(e) {
    e.style.display = "none";
  };
  var show = function(e) {
    e.style.display = "";
  };

  dark.addEventListener("click", function(e) {
    localStorage.setItem("mode", "dark");
    loadCss('/stylesheets/dark.css');
    hide(dark);
    show(light);
  });
  light.addEventListener("click", function(e) {
    localStorage.setItem("mode", "light");
    loadCss('/stylesheets/main.css');
    hide(light);
    show(dark);
  });

  if (localStorage.getItem("mode") == "dark") {
    loadCss('/stylesheets/dark.css');
    hide(dark);
    show(light);
  }
})();
