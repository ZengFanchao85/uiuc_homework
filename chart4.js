// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 100},
    width = 800 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg4 = d3.select("#my_dataviz_chart4")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis4 = svg4.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis4 = svg4.append("g")
  .attr("class", "myYaxis")

svg4.append("text")
  .attr("class", "y label")
  .attr('id', 'svg4_y_label')
  .attr("text-anchor", "end")
  .attr("y", -40)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .attr("font-size", "small")
  .text("Meal Reservations");

  function update_svg_4_y_label(choice) {
    document.getElementById('svg4_y_label').textContent = "Meal Reversations (" + choice +")"
  }


// A function that create / update the plot for a given variable:
function chart4_update(selectedVar) {

  update_svg_4_y_label(selectedVar)

  // Parse the Data
  d3.csv("meal_types.csv", function(data) {
    // X axis
    x.domain(data.map(function(d) { return d.meal_type; }))
    xAxis4.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis4.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = svg4.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.meal_type); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .attr("fill", function(d){
            if (d.meal_type == 'Meal Plan 1') {
              return "#b3697a"
            }else {
              return "#69b3a2"
            }
          })
  })

}

// Initialize plot
chart4_update('Aviation')
