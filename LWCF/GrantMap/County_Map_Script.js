// LWCF Grant Amounts by County Map

// Path to topoJSON county data and grant data
mapPath = 'https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json';
grantPath = '../GrantMap/us_grants_by_county.json';

const format = d3.format("$,");
const path = d3.geoPath();
const color = d3.scaleQuantize([1, 10], d3.schemeGreens[9]);  // TODO: Update for max/min in data

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
          return color(grants[d.id]['grant_value']);
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
