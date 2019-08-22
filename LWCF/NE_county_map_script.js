// New England County Map

// Path to topoJSON county data and grant data
mapPath = 'https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json'
grantPath = './Data/county-records.json'

const path = d3.geoPath();

const svg = d3.create("svg")
  .attr("viewBox", "0 0 960 600")
  .style("width", "100%")
  .style("height", "auto");

// svg.append("g")
//   .attr("transform", "translate(600,40)");
//  .call(legend);

const format = d3.format(",");

// Create requests to retrieve JSON topography data and CSV population data
const getMapData = d3.json(mapPath);
const getGrantData = d3.json(grantPath);

Promise.all([getMapData, getGrantData]).then(function(values) {
  const json = values[0];
  const grants = values[1];


  const counties = topojson.feature(json, json.objects.countries).features;
  const states = topojson.mesh(json, json.objects.states, (a, b) => a != b);

  // Tooltip setup
  // const tooltip = d3.select("#tooltip")
  //     .style("display", "none")
  //     .classed("tooltip", true);

  svg.append("g")
  .selectAll("path")
  .data(counties)
  .join("path")
    // .attr("fill", d => color(data.get(d.id)))
    .attr("d", path)
  .append("title")
    .text(d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
  ${format(data.get(d.id))}`);

  svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
