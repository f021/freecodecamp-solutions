import d3 from 'd3'

const force = dataset => {

  const getWH = elm => ({
    width: elm.offsetWidth,
    height: elm.offsetHeight
  })

  document.getElementById('root').innerHTML = ''

  const rootSize = getWH(document.getElementById('root'))

  const margin = {
    top: 50,
    bottom: 50,
    left: 100,
    right: 150
  }

  const colors = ['red', '#f1c40f', '#2cc36b']

  const w = rootSize.width - margin.left - margin.right
  const h = rootSize.height - margin.top - margin.bottom

  let svg = d3.select('#root')
                  .append('svg')
                    .attr({
                      width: w + margin.left + margin.right,
                      height: h + margin.top + margin.bottom
                    })
                  .append('g')
                    .attr({
                      transform: `translate(${margin.left}, ${margin.top})`
                    })

  const force = d3.layout.force()
                     .nodes(dataset.nodes)
                     .links(dataset.links)
                     .size([w, h])
                     .gravity(.5)
                     .linkDistance([ 200 ])
                     .charge([-350])
                     .start()


  let color = d3.scale.pow().nice()
                .domain([
                  d3.min(dataset.nodes, d => d.weight),
                  d3.median(dataset.nodes, d => d.weight),
                  d3.max(dataset.nodes, d => d.weight)
                ])
                .range(colors)

  let radius = d3.scale.pow().exponent(1.2)

  const link = svg.selectAll('line')
                   .data(dataset.links)
                   .enter()
                   .append('line')
                     .style('stroke', '#ccc')
                     .style('stroke-width', .1)


  const node = svg.selectAll('.node')
                  .data(dataset.nodes)
                  .enter()
                  .append('g')
                  .attr('class', 'node')
                  .call(force.drag);

  node.append('circle')
       .attr({
         r: d => radius(d.weight),
         fill: d => color(d.weight),
         'fill-opacity': .8
       })

  node.append('text')
       .attr({
         class: 'label',
         dx: 5,
         dy: -5
       })
       .text(d => d.name)


   force.on('tick', () => {
     link.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)

      node.attr({
        transform: d =>`translate(${d.x},${d.y})`
      })
    })
}

export default force
