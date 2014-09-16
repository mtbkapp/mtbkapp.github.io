/* 
 * ported from Mike Bostock's example of line graphs in d3.js 
 * http://bl.ocks.org/mbostock/3883245
 */

var svgBox = {width: 900, height: 500};
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var chartBox = {
    width: svgBox.width - margin.left - margin.right,
    height: svgBox.height - margin.top - margin.bottom
};

function dayOfYearToDate(day) {
    return new Date((new Date(2014,0)).setDate(day));
};

function translate(left, top) {
    return "translate(" + left + "," + top + ")";
};

var svg = d3.select("#vis").append("svg")
    .attr("height", svgBox.height)
    .attr("width", svgBox.width);

var chart = svg.append("g")
    .attr("transform", translate(margin.left, margin.top));


d3.json("/daylight/duration.json", function(error, data) {
    if (error) return console.warn(error);

    var x = d3.scale.linear()
        .domain([0, 365])
        .range([0, chartBox.width]);

    var x = d3.time.scale()
        .domain([new Date(2014,0,1), new Date(2015,0,1)])
        .range([0, chartBox.width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var y = d3.scale.linear()
        .domain([0, d3.max(data) + 50])
        .range([chartBox.height, 0]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", translate(0, chartBox.height))
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var line = d3.svg.line()
        .x(function(d, i) { return x(dayOfYearToDate(i)); })
        .y(y);

    chart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
});
