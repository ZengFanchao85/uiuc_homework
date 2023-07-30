// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 100},
    width = 800 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select("#my_dataviz_chart1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis1 = svg1.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis1 = svg1.append("g")
  .attr("class", "myYaxis")


svg1.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width / 2)
  .attr("y", height + 32)
  .attr("font-size", "small")
  .text("Month");

svg1.append("text")
  .attr('id', 'svg1_y_label')
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -40)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .attr("font-size", "small")
  .text("Hotel Reservations");

function update_svg_1_y_label(choice) {
    document.getElementById('svg1_y_label').textContent = "Room Reversations (" + choice +")"
}


// A function that create / update the plot for a given variable:
function chart1_update(selectedVar) {

  update_svg_1_y_label(selectedVar)

  // Parse the Data
  d3.csv("booking_per_month.csv", function(data) {
    // X axis
    x.domain(data.map(function(d) { return d.month; }))
    xAxis1.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis1.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = svg1.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.month); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .attr("fill", function(d){
          if (((selectedVar == 'Total' | selectedVar == 'Online'| selectedVar == 'Offline') & d.month == 10) | (selectedVar == 'Aviation' & (d.month == 4 | d.month == 5 | d.month == 10))){
            return "#b3697a"
          }else {
            return "#69b3a2"
          }
        })
        //.attr("fill", "#69b3a2")
  })

}

// Initialize plot
chart1_update('Aviation')
