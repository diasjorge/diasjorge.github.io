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

    var loadDarkMode = function() {
        loadCss('/css/dark.css');
        setTimeout(function() {
            var iframe = document.getElementById('twitter-widget-0');
            iframe.contentWindow.document.getElementsByTagName('body')[0].style.color="#839496";
        }, 500);
        hide(dark);
        show(light);
    };

    dark.addEventListener("click", function(e) {
        localStorage.setItem("mode", "dark");
        loadDarkMode();
    });
    light.addEventListener("click", function(e) {
        localStorage.setItem("mode", "light");
        loadCss('/css/main.css');
        hide(light);
        show(dark);
    });

    document.addEventListener("DOMContentLoaded", function(event) {
        if (localStorage.getItem("mode") == "dark") {
            loadDarkMode();
        }
    });
})();
