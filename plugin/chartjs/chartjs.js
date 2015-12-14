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
                    chart.engine.render();
                }
            };
        });


        // First of all, draw charts of the current slide
        for (var i=0; i<charts.length; i++) {
            var chart = charts[i];
            if(chart.slide.classList.contains("present")) {
                chart.engine.render();
            }
        };
        // Then we pass to charts of all other slides
        // Should do it to make charts visible on zoom view
        for (var i=0; i<charts.length; i++) {
            var chart = charts[i];
            if(!chart.slide.classList.contains("present")) {
                chart.engine.render();
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
                var defFunction;
                try {
                    defFunction = Function(canvases[i].textContent);
                }catch(ex){
                    // Ignore a "compilation" error, and so ignore the chart
                }

                if(defFunction) {
                    var chart = {
                        slide:  slide,
                        canvas: canvas,
                        chart:  new Chart(canvas.getContext("2d")),
                        def:    defFunction,
                    };
                    chart.engine = defFunction.apply(chart);
                    charts.push(chart);
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
