/**
 * A plugin to visualise chart.js charts inside of reveal.js slides.
 *
 * Using head.js 0.96 from Reveal package to load external ressources.
 *
 * @author Voldemar Le Grand <voldemarlegrand@gmail.com>
 */
var RevealChartjs = window.RevealChartjs || (function(){

    var options = Reveal.getConfig().chartjs || {};
    options.libUrl = options.libUrl || 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js';

    head.js(options.libUrl, function() {
        var charts = findAllCharts(document);

        Reveal.addEventListener("slidechanged", function(event){
            for (var i = charts.length - 1; i >= 0; i--) {
                if(event.currentSlide === charts[i].slide) {
                    drawChart(charts[i].canvas);
                }
            };
        })
    });

    function drawChart(canvas) {
        var data = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];
        var ctx = canvas.getContext("2d");
        var chart = new Chart(ctx);
        var doughnut = chart.Doughnut(data, { })
    };

    function findAllCharts(document) {
        var charts = [];
        var canvases = document.querySelectorAll( "[data-chartjs]" );
        for(var i=0; i<canvases.length; i++) {
            var slide = findAncestorByTagName(canvases[i], "section");
            if(slide) {
                charts.push({
                    slide:  slide,
                    canvas: canvases[i]
                });
            }
        }
        return charts;
    }

    function findAncestorByTagName(elt, tagName) {
        while ((elt = elt.parentElement) && !elt.tagName==tagName);
        return elt;
    }

})();
