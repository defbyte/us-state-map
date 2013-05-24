(function(root){

    var config = {
        paths: {
            "json2": "lib/json2",
            "raphael": "lib/raphael",
            "raphael-map": "lib/raphael-map",
            "parse-csv": "lib/parse-csv",
            "simple-ajax": "lib/simple-ajax",
            "interpolate": "app/interpolate"
        }
    };

    // IGNORE BELOW THIS LINE...

    // Enable cache-busting:
    if ((root.location && root.location.href.indexOf('localhost') >= 0) || root.REQUIRE_NOCACHE) {
        config.urlArgs = "bust="+(new Date()).getTime();
    }

    // Predefine RequireJS setup, or configure existing library:
    if (typeof root.require === 'undefined') root.require = config;
    else if (root.requirejs && typeof root.requirejs.config === 'function') root.requirejs.config(config);

}(this));