/*
Interpolator code from d3js
https://github.com/mbostock/d3

Modified and modularized by Chris Davis
*/
define('interpolate', function(){

    var exports = {

        /*
        Expects two objects with r,g,b properties
        */
        interpolateRGB: function(a, b, t) {
            var ar = a.r,
                ag = a.g,
                ab = a.b,
                br = b.r - ar,
                bg = b.g - ag,
                bb = b.b - ab;
            return {
                r: Math.round(ar + br * t),
                g: Math.round(ag + bg * t),
                b: Math.round(ab + bb * t)
            };
        },

        /*
        Expects two objects with h,s,l properties
        */
        interpolateHSL: function(a, b, t) {
            var ah = a.h,
                as = a.s,
                al = a.l,
                bh = b.h - ah,
                bs = b.s - as,
                bl = b.l - al;
            if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
            if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
            else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
            return {
                h: ah + bh * t,
                s: as + bs * t,
                l: al + bl * t
            };
        }

    };

    return exports;
});