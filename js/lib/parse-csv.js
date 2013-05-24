/*
Parse CSV Function
by Greg MacWilliam
(I simply wrapped it in a module definition)
https://gist.github.com/gmac/5620847#file-csv-parser
*/
define('parse-csv', function (){

    var parseCSV = (function( root ) {
        return function parseCSV(csv, delimiter) {

            delimiter = (delimiter || ",");

            var pattern = new RegExp("(\\"+ delimiter +"|\\r?\\n|\\r|^)"+"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|"+"([^\"\\"+ delimiter +"\\r\\n]*))", "gi");
            var quote = new RegExp("\"\"", "g");
            var data = [[]];
            var matches = null;
            var val, d;

            while (matches = pattern.exec(csv)) {
                d = matches[ 1 ];
                if (d.length && (d !== delimiter)) data.push([]);
                val = matches[ 2 ] ? matches[ 2 ].replace(quote, "\"") : matches[ 3 ];
                data[ data.length-1 ].push(val);
            }

            return data;

        };
    }(this));

    return parseCSV;

});