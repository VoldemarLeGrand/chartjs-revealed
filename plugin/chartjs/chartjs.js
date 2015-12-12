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
        var ctx = document.getElementById("chart-example").getContext("2d");
        var chart = new Chart(ctx);
        var doughnut = chart.Doughnut(data, { })

    });

})();
