/**
 * A plugin to visualise chart.js charts inside of reveal.js slides.
 *
 * With some functions borrowed from math.js plugin for reveal.js by Hakim El Hattab
 *
 * @author Voldemar Le Grand <voldemarlegrand@gmail.com>
 */
var RevealChartjs = window.RevealChartjs || (function(){

    var options = Reveal.getConfig().chartjs || {};
    options.libUrl = options.libUrl || 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js';

    loadScript(options.libUrl, function() {

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

    function loadScript( url, callback ) {

        var head = document.querySelector( 'head' );
        var script = document.createElement( 'script' );
        script.type = 'text/javascript';
        script.src = url;

        // Wrapper for callback to make sure it only fires once
        var finish = function() {
            if( typeof callback === 'function' ) {
                callback.call();
                callback = null;
            }
        }

        script.onload = finish;

        // IE
        script.onreadystatechange = function() {
            if ( this.readyState === 'loaded' ) {
                finish();
            }
        }

        // Normal browsers
        head.appendChild( script );

    }

})();
