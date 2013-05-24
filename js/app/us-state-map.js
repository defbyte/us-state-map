/*
    US State Map displaying CSV data per state
*/

define([
    "raphael",
    "raphael-map",
    "parse-csv",
    "simple-ajax",
    "interpolate"
],
function( Raphael, USMapData, parseCSV, simpleAJAX, interpolate ) {

    var paper = Raphael('us-state-map', 720, 452);

    function USMapView(options) {
        if (options.csvUrl) {
            this.load(options.csvUrl);
        }
    }

    USMapView.prototype = {

        stateData: {},
        stateShapes: {},
        maxVal: 0,
        minVal: 0,
        startColor: Raphael.getRGB("#003148"),
        endColor: Raphael.getRGB("#fff834"),
        tooltip: false,

        load: function(csvUrl) {

            // Know thyself...
            var self = this;

            simpleAJAX(csvUrl, function(data) {
                self.parseData(data);
                self.render();
            });

        },

        parseData: function(csvData) {
            var data = parseCSV(csvData);
            /*
            PARSE DATA

            iterate over rows
            check for "state code"
            build object of state unemployment data by state ID
            if a record does not have a state ID, ignore it, these would be
            US Territories.
            */
            var i, len, val;
            for (i=1, len=data.length; i < len; i++) {
                var state = data[i][1];
                if (state && state.length === 2) {
                    this.stateData[state.toLowerCase()] = val = parseFloat(data[i][2]) / 100;
                    this.maxVal = Math.max(this.maxVal, val);
                    this.minVal = Math.min(this.minVal, val);
                }
            }
        },

        render: function() {

            this.renderMap(USMapData);

        },

        renderMap: function(data) {

            var shapeAttr = {
                "stroke": "#fff",
                "stroke-opacity": 1,
                "stroke-width": 1,
                "stroke-linejoin": "bevel"
            };

            // Know thyself...
            var self = this;

            function createShape(data) {

                var shape = paper.path(data.shape).attr( shapeAttr );
                shape.attr({title: data.name});

                shape.node.onmouseover = function(){
                    var label = data.name + " " + (self.getStateData(data.id) * 100).toFixed(1) + "%";
                    self.renderTooltip(label);
                };
                shape.node.onmouseout = function(){
                    self.hideTooltip();
                };

                return shape;
            }

            for (var id in data) {
                // This is messy
                data[id].id = id;
                this.stateShapes[id] = createShape(data[id]);
                this.stateShapes[id].attr({
                    fill: this.getStateColor(id)
                });
            }
        },

        getStateColor: function(id) {
            var rgb = interpolate.interpolateRGB(
                    this.startColor,
                    this.endColor,
                    this.stateData[id] / this.maxVal
            );
            return Raphael.rgb(rgb.r, rgb.g, rgb.b);
        },

        getStateData: function(id) {
            return this.stateData[id];
        },

        renderTooltip: function(label) {
            if (!this.tooltip) {
                var tooltip = this.tooltip = document.createElement("div");
                tooltip.className = 'map-tooltip';
                document.getElementsByTagName('body')[0].appendChild( tooltip );

                var map = document.getElementById('us-state-map');

                map.onmousemove = function(e) {
                    tooltip.style.left = e.pageX - (tooltip.offsetWidth/2) + "px";
                    tooltip.style.top = e.pageY - tooltip.offsetHeight + "px";
                };
            }
            this.tooltip.style.display = "block";
            this.tooltip.innerHTML = label;
        },

        hideTooltip: function() {
            this.tooltip.style.display = "none";
        }
    };

    var map = new USMapView({csvUrl: 'data/NPP_FPDB_Unemployment.csv'});

});