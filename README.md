# Chart.js plugin for reveal.js presentation framework

Plugin provide a simple way to integrate [Chart.js](http://www.chartjs.org/) charts in [reveal.js](https://github.com/hakimel/reveal.js) presentation framework :

```html
<section>
    <canvas data-chartjs width="400" height="200">
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
        return this.chart.Doughnut(data);
    </canvas>
</section>
```

Code inside the `<canvas>` tag should define a chart using `this.chart` object and return this chart.



## Installation

Plugin source code should be installed inside `reveal.js` plugin directory.
For example, by symlinking the plugin working copy :

```bash
git clone https://github.com/VoldemarLeGrand/chartjs-revealed.git
ln -s ../../chartjs-revealed/plugin/chartjs reveal.js/plugin/chartjs
```

Next and last step is to load plugin as a [presentation dependency](https://github.com/hakimel/reveal.js#dependencies) :

```javascript
Reveal.initialize({
    dependencies: [
        { src: "plugin/chartjs/chartjs.js", condition: function() { return !!document.querySelector( "[data-chartjs]" ); } },
    ]
});
```



## API

JavaScript code inside `<canvas>` is executed with `this` value pointed to chart object with following properties :

  * `canvas` : corresponding `<canvas>` element
  * `chart` : [`Chart`](http://www.chartjs.org/docs/#getting-started-creating-a-chart) object created for given `<canvas>`
  * `slide` : corresponding `<section>` element
  * `def` : define function compiled from `<canvas>` element text content
  * `engine` : chart created by define function, used to redraw a chart



## Configuration

URL of Chart.js library may be specified in the presentation configuration :

```javascript
Reveal.initialize({
    chartjs: {
        libUrl: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"
    }
});
```


## Known limitations

  * In current version plugin knows nothing about slide fragments



## License

Plugin is released under the BSD License. See [LICENSE](https://github.com/VoldemarLeGrand/chartjs-revealed/blob/master/LICENSE) file for details.
