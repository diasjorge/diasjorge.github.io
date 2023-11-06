"use strict";

(function () {
    var loadCss = function(filename) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    };
    var dark = document.getElementsByClassName('dark-mode');
    var light = document.getElementsByClassName('light-mode');

    var hide = function(e) {
        e.style.display = "none";
    };
    var show = function(e) {
        e.style.display = "";
    };

    var loadDarkMode = function() {
        for (let item of dark) {
            show(item);
        };
        for (let item of light) {
            hide(item);
        };
    };

    var loadLightMode = function() {
        for (let item of light) {
            show(item);
        };
        for (let item of dark) {
            hide(item);
        };
    };

    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkTheme.matches) {
        loadDarkMode();
    }
    prefersDarkTheme.addEventListener('change',({ matches }) => {
        if (matches) {
            loadDarkMode();
        } else {
            loadLightMode();
        }
    });

    const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
    if (prefersLightTheme.matches) {
        loadLightMode();
    }
    prefersLightTheme.addEventListener('change',({ matches }) => {
        if (matches) {
            loadLightMode();
        } else {
            loadDarkMode();
        }
    });
})();
