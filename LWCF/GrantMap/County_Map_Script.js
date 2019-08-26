// LWCF Grant Amounts by County Map

// Path to topoJSON county data and grant data
mapPath = 'https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json';
grantPath = './us_grants_by_county.json';

const format = d3.format("$,");
const path = d3.geoPath();

// Create a scale to map total grant value of a county to a color
const color = d3.scaleThreshold()
    .domain([
      1000,
      10000,
      100000,
      500000,
      750000,
      1000000,
      10000000,
      20000000])
    .range(d3.schemeGreens[9]);

const formatDict = {
  1000: "$1K",
  10000: "$10K",
  100000: "$100K",
  500000: "$500K",
  750000: "$750K",
  1000000: "$1M",
  10000000: "$10M",
  20000000: "$20M"
};

legend = g => {
  const w = 260;
  const length = color.range().length;

  const x = d3.scaleLinear()
      .domain([1, length - 1])
      .rangeRound([w / length, w * (length - 1) / length]);

  // Draw boxes for each color threshold
  g.selectAll("rect")
    .data(color.range())
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("width", w / length)
      .attr("height", 8)
      .attr("fill", d => d);

  // Add legend title
  g.append("text")
      .attr("y", -6)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Total Value of LWCF Grants ($)");

  // Draw ticks and labels
  g.call(d3.axisBottom(x)
      .tickSize(10)
      .ticks(length - 1)
      .tickFormat(i => formatDict[color.domain()[i - 1]])
      )
    .select(".domain")
      .remove();
}

const svg = d3.select("#map")
  .append("svg")
  .attr("viewBox", "0 0 960 600")
  .style("width", "100%")
  .style("height", "auto");

// Add group to hold the legend
svg.append("g")
  .attr("transform", "translate(600,40)")
  .call(legend);

// Create requests to retrieve JSON topography and grant data
const getMapData = d3.json(mapPath);
const getGrantData = d3.json(grantPath);

Promise.all([getMapData, getGrantData]).then(function(values) {
  const us = values[0];
  const grants = values[1];


  const counties = topojson.feature(us, us.objects.counties).features;
  const states = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  // Map state id (2-digit number) to properties obj (which includes state name)
  const st = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));

  // Create county map
  svg.append("g")
    .selectAll("path")
    .data(counties)
    .join("path")
      .attr("fill", d => {
        if (grants[d.id]) {
          return color(+grants[d.id]['grant_value']);
        } else {
          return "gray"
        }
      })
      .attr("d", path)
    .append("title")
      .text(d => {
        if (grants[d.id]) {
          return `${d.properties.name}, ${st.get(d.id.slice(0, 2)).name}\n${format(grants[d.id]['grant_value'])}`;
        } else {
         return `${d.properties.name}, ${st.get(d.id.slice(0, 2)).name}`;
        }
      });

  // Add state outlines
  svg.append("path")
    .datum(states)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

});
