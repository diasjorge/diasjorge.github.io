tarteaucitron.init({
    "hashtag": "#tarteaucitron", /* Automatically open the panel with the hashtag */
    "highPrivacy": true, /* disabling the auto consent feature on navigation? */
    "orientation": "bottom", /* the big banner should be on 'top' or 'bottom'? */
    "adblocker": false, /* Display a message if an adblocker is detected */
    "showAlertSmall": true, /* show the small banner on bottom right? */
    "cookieslist": true, /* Display the list of cookies installed ? */
    "removeCredit": false /* remove the credit link? */
});

tarteaucitron.user.analyticsUa = 'UA-15098892-1';
(tarteaucitron.job = tarteaucitron.job || []).push('analytics');

tarteaucitron.user.disqusShortname = 'mrdias';
(tarteaucitron.job = tarteaucitron.job || []).push('disqus');

(tarteaucitron.job = tarteaucitron.job || []).push('twittertimeline');

// github
var github = {
    success: function(response) {
        var repos = [];
        var length = response.data.length >= 10 ? 10: response.data.length;
        for (var i = 0; i < length; i++) {
            repos.push(response.data[i]);
        }
        github.render(repos);
    },
    render: function(repos) {
        var i = 0,
            fragment = '',
            target = 'gh_repos';
        t = document.getElementById(target);

        for (i = 0; i < repos.length; i++) {
            fragment += '<li><a href="' + repos[i].html_url + '">' + repos[i].name + '</a><p>' + (repos[i].description || '') + '</p></li>';
        }
        t.innerHTML = fragment;
    }
};

tarteaucitron.services.github = {
    "key": "github",
    "type": "other",
    "name": "Github",
    "uri": "https://help.github.com/articles/github-privacy-statement/",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//api.github.com/users/diasjorge/repos?sort=pushed&type=public&callback=github.success');
    },
    "fallback": function () {
        "use strict";
        var id = 'github';

        if (document.getElementById('gh_repos')) {
            document.getElementById('gh_repos').innerHTML = tarteaucitron.engage(id);
        }
    }
};
(tarteaucitron.job = tarteaucitron.job || []).push('github');
