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
            for (var i=0; i<charts.length; i++) {
                var chart = charts[i];
                if(event.currentSlide === chart.slide) {
                    // Execute drawing function passing the current chart as this
                    chart.draw.apply(chart);
                }
            };
        });


        // First of all, draw charts of the current slide
        for (var i=0; i<charts.length; i++) {
            var chart = charts[i];
            if(chart.slide.classList.contains("present")) {
                chart.draw.apply(chart);
            }
        };
        // Then we pass to charts of all other slides
        // Should do it to make charts visible on zoom view
        for (var i=0; i<charts.length; i++) {
            var chart = charts[i];
            if(!chart.slide.classList.contains("present")) {
                chart.draw.apply(chart);
            }
        };

    });

    function findAllCharts(document) {
        var charts = [];
        var canvases = document.querySelectorAll( "[data-chartjs]" );
        for(var i=0; i<canvases.length; i++) {
            var canvas = canvases[i];
            var slide = findAncestorByTagName(canvas, "section");
            if(slide) {
                var drawFunction;
                try {
                    drawFunction = Function(canvases[i].textContent);
                }catch(ex){
                    // Ignore a "compilation" error, and so ignore the chart
                }

                if(drawFunction) {
                    charts.push({
                        slide:  slide,
                        canvas: canvas,
                        chart:  new Chart(canvas.getContext("2d")),
                        draw:   drawFunction
                    });
                }
            }
        }
        return charts;
    }

    function findAncestorByTagName(elt, tagName) {
        while ((elt = elt.parentElement) && !elt.tagName==tagName);
        return elt;
    }

})();
