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

function drawScales(max) {
    var x = d3.time.scale()
        .domain([new Date(2014,0,1), new Date(2015,0,1)])
        .range([0, chartBox.width]);
 
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
 
    var y = d3.scale.linear()
        .domain([0, max + 50])
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

    return [x, y];
}


function drawLine(data, scales, color) {
    var x = scales[0];
    var y = scales[1];

    var line = d3.svg.line()
        .x(function(d, i) { return x(dayOfYearToDate(i)); })
        .y(y);
 
    chart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("stroke", color) 
        .attr("d", line);
};

function drawLegend(el, cityColors) {
    var x = chartBox.width;
    var y = chartBox.height - 50;

    var legend = el.append("g")
        .attr("class", "legend")
        .attr("transform", translate(x, y))
        .selectAll("text.city-legend")
        .data(cityColors)
        .enter()
        .append("text")
        .attr("class", "city-legend")
        .attr("y", function(d, i) { return i * -15; })
        .text(function(d) { return d[0]; })
        .attr("fill", function(d) { return d[1]; });

};
 
var svg = d3.select("#vis").append("svg")
    .attr("height", svgBox.height)
    .attr("width", svgBox.width);
 
var chart = svg.append("g")
    .attr("transform", translate(margin.left, margin.top));
 
 
d3.json("/more-daylight/combined.json", function(error, data) {
    if (error) return console.warn(error);

    var scales = drawScales(1000); 
    var color = d3.scale.category10();
    var legendData = _.chain(data)
        .keys()
        .map(function(d) { return [d, color(d)]; })
        .value();


    _.each(data, function(durations, city) {
        var cityColor = color(city);
        drawLine(durations, scales, cityColor);
    });

    drawLegend(chart, legendData); 
});
