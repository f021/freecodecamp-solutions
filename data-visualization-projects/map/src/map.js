import d3 from 'd3'
import topojson from 'topojson'

const map = dataset => {


  const colors = ['orange', 'green', 'red']

  const urlMap = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json'
  const urlData =`https://data.nasa.gov/resource/y77d-th95.geojson`;

  const getWH = elm => ({
    width: elm.offsetWidth,
    height: elm.offsetHeight
  })

  const rootSize = getWH(document.getElementById('root'))

  const tooltipHTML = (d) =>
    `<h1>${d.name}</h1>
    <ul>
      <li>
        <span class='key'>mass:</span>
        <span class='value'>${d.mass}</span>
      </li>
      <li>
        <span class='key'>year:</span>
        <span class='value'>${d.year.slice(0,4)}</span>
      </li>
    </ul>`

  const margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  const w = rootSize.width - margin.left - margin.right
  const h = rootSize.height - margin.top - margin.bottom

  let chart = d3.select('#root')
                .append('svg')
                .attr('width', w + margin.left + margin.right)
                .attr('height', h + margin.top + margin.bottom)
                .append('g')
                .attr('id', 'chart')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const projection = d3.geo.mercator()
                       .translate([600,560])
                       .scale(200)

  const path = d3.geo.path().projection(projection)

  d3.json(urlMap, json => {

    chart.selectAll('path')
         .data(topojson.feature(json, json.objects.countries).features)
         .enter()
         .append('path')
         .attr('fill', 'rgba(0, 0, 0, .5)')
         .attr('stroke', 'white')
         .attr('d', path)

    chart.append('text')
         .attr('x', w / 2)
         .attr('y', h * .1)
         .attr('text-anchor', 'middle')
         .text('METEOR RAIN')

    d3.json(urlData, json => {

      const mass = d3.scale.quantile()
                     .domain([
                       d3.min(json.features, d => d.properties.mass),
                       d3.mean(json.features, d => d.properties.mass),
                       d3.max(json.features, d => d.properties.mass)
                     ])
                     .range([2, 4, 10])


     const color = d3.scale.pow().nice()
                   .domain([
                     d3.min(json.features, d => d.properties.mass),
                     d3.mean(json.features, d => d.properties.mass),
                     d3.max(json.features, d => d.properties.mass)
                   ])
                   .range(['green', 'orange'])

      // const old = d3.scale.linear().scale

      const meteor = chart.selectAll('.meteor')
                          .data(json.features)
                          .enter()
                          .append('g')
                          .attr('class', 'meteor')

     meteor.append('circle')
           .attr('cx', d => projection([d.properties.reclong, d.properties.reclat])[0])
           .attr('cy', d => projection([d.properties.reclong, d.properties.reclat])[1])
          //  .attr('r', 3)
          .attr('r', d => mass(d.properties.mass))
          .attr('opacity', .8)
          .attr('fill', d => color(d.properties.mass))



     d3.selectAll('.meteor')
       .on('mouseover', function(d) {
         let [x, y] = d3.mouse(this);
         d3.select('#tooltip')
           .classed('hidden', false)
           .style({
             left: `${x + 30}px`,
             top: `${y - 30}px`
           })
           .html(tooltipHTML(d.properties));
         }
       )
       .on('mouseout', () =>
          d3.select('#tooltip')
            .classed('hidden', true))

    })



  } );

}


export default map
