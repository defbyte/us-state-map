// HTML Element Detection:
// Provides plain-vanilla JS tests for detecting HTML elements.

define('detection', function() {

    // querySelectorAll Polyfill:
    if (!document.querySelectorAll) {
        var d=document, s=d.createStyleSheet();
        d.querySelectorAll = function(r, c, i, j, a) {
            a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
            for (i=r.length; i--;) {
                s.addRule(r[i], 'k:v');
                for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                s.removeRule(0);
            }
            return c;
        };
    }

    return {
        // "has()" api: tests for basic CSS selector queries.
        has: function(selector) {
            return document.querySelectorAll(selector).length > 0;
        }
    };
});

define(['detection'], function(detection){

    function setup() {
        var mods = [];

        if (!window.JSON) {     // test for native JSON support.
            mods.push('json2'); // fill with shim if missing
        }

        require(mods, bootstrap);
    }

    function bootstrap() {
        /*
        Inspect page and load relevant modules.
        */
        var mods = [];

        if (detection.has('#us-state-map')) {
            mods.push('app/us-state-map');
        }

        require(mods);
    }

    // 3... 2.. 1. LIFT OFF!
    setup();
});