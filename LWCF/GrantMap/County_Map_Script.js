// LWCF Grant Amounts by County Map

// Path to topoJSON county data and grant data
mapPath = 'https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json';
grantPath = '../Data/county-records.json';  // TODO: Update with all counties

const format = d3.format(",");
const path = d3.geoPath();

const svg = d3.select("#map")
  .append("svg")
  .attr("viewBox", "0 0 960 600")
  .style("width", "100%")
  .style("height", "auto");

// Add group for legend
// svg.append("g")
//   .attr("transform", "translate(600,40)");
//  .call(legend);

// Create requests to retrieve JSON topography and grant data
const getMapData = d3.json(mapPath);
const getGrantData = d3.json(grantPath);

Promise.all([getMapData, getGrantData]).then(function(values) {
  const map = values[0];
  const grants = values[1];


  const counties = topojson.feature(map, map.objects.countries).features;
  const states = topojson.mesh(map, map.objects.states, (a, b) => a !== b);

  // Tooltip setup
  // const tooltip = d3.select("#tooltip")
  //     .style("display", "none")
  //     .classed("tooltip", true);

  // Create county map
  svg.append("g")
  .selectAll("path")
  .data(counties)
  .join("path")
    // .attr("fill", d => color(data.get(d.id)))
    .attr("d", path)
  .append("title")
    .text(d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}`);
  // .text(d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
  // ${format(data.get(d.id))}`);

  // Add state outlines
  svg.append("path")
    .datum(states)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
