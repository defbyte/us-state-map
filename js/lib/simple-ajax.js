/*
Simple AJAX
by Greg MacWilliam
(I simply wrapped it in a module definition)
https://gist.github.com/gmac/5630172
*/
define('simple-ajax', function() {

    var ajax = (function( root ) {

        function getRequest() {
            if (root.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
            else if (root.XMLHttpRequest) return new XMLHttpRequest();
            else return null;
        }

        return function(url, callback, post) {
            post = post || "";
            var req = getRequest();

            if (req) {

                req.onreadystatechange = function() {
                    if (req.readyState == 4 && callback && typeof callback.call == 'function') {
                        callback(req.responseText);
                    }
                };

                if (post) {
                    req.open("POST", url, true);
                    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    req.setRequestHeader('Connection', 'close');
                } else {
                    req.open("GET", url, true);
                }

                req.send(post);
            }

            return !req ? null : {
                abort: function() {
                    req.onreadystatechange = undefined;
                    req.abort && req.abort();
                }
            };
        };

    }(this));

    return ajax;

});