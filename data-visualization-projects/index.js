const fillArr = ([x, ...xs], fn) => 
  Array.from(new Array(x), (_, i) =>
    xs.length ? fillArr(xs, fn) : fn(i))

const dataset = fillArr([500, 8], Math.random)
const rootSize = document.getElementById('root').getBoundingClientRect()

const tooltipHTML = (arr) =>
  arr.reduce((r, n, i) => r + `<p>${i} : ${n}</p>`, '')

const margin = {
  top: 50,
  bottom: 50,
  left: 100,
  right: 150
}

const w = rootSize.width - margin.left - margin.right
const h = rootSize.height - margin.top - margin.bottom

// scale

const x = d3.scale.linear()
            .domain([
              d3.min(dataset, d => d[0]),
              d3.max(dataset, d => d[0])
            ])
           .range([0, w])

const y = d3.scale.linear()
            .domain([
              d3.min(dataset, d => d[1]),
              d3.max(dataset, d => d[1])
            ])
           .range([h, 0])

const z = d3.scale.linear()
            .domain([
              d3.min(dataset, d => d[2]),
              d3.max(dataset, d => d[2])
            ])
           .range([1, 12])

const c = d3.scale.linear()
            .domain([
              d3.min(dataset, d => d[3]),
              d3.max(dataset, d => d[3])
            ])
           .range(['green', 'orange'])

// draw axis

var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('bottom')
                  .ticks(5)
                  .tickSize(-h)

var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient('left')
                  .ticks(5)
                  .tickSize(-w)

// make chart

let chart = d3.select('#root')
              .append('svg')
                .attr({
                  width: w + margin.left + margin.right,
                  height: h + margin.top + margin.bottom
                })
              .append('g')
              .attr({
                id: 'chart',
                transform: `translate(${margin.left}, ${margin.top})`
              })

// draw title
d3.select('svg').append('text')
  .attr({
    x: w/2,
    y: 0,
    'text-anchor': 'middle',
    transform: `translate(${margin.left}, ${margin.top/2})`
  })
  .text('RANDOM SCATTERPLOT')

chart.append('g')
        .attr({
          class: 'axis',
          transform: `translate(0, ${h})`
        })
        .call(xAxis)
      .append('text')
        .attr({
          class: 'label',
          x: w,
          y: 30
        })
        .attr('text-anchor', 'end')
        .text('x axis')


// draw axis

chart.append('g')
       .attr('class', 'axis')
       .call(yAxis)
     .append('text')
       .attr({
         class: 'label',
         y: 0,
         dy: '-30px',
         transform: 'rotate(-90)'
       })
       .style('text-anchor', 'end')
       .text('y axis')

// draw dots

let dot = chart.selectAll('.dot')
     .data(dataset)
     .enter()
     .append('g')
       .attr('class', 'dot')
        
    dot.append('circle')
       .attr({
         fill: d => c(d[3]),
         cx: (d,i) => x(d[0]),
         cy: h,
         r: 0
        })
        .transition()
        .delay((d,i) => Math.sqrt(i*150) )
        .attr({
          cx: d => x(d[0]),
          cy: d => y(d[1]),
          r: d => z(d[2]),
          fill: d => c(d[3]),
          stroke: 'white',
          'stroke-width': 1
        })
     
    d3.selectAll('circle')
      .on('mouseover', function(d) {
        let [x, y] = d3.mouse(this);
        d3.select('#tooltip')
          .classed('hidden', false)
          .style({
            left: `${x + 120}px`,
            top: `${y - 40}px`
          })
          .html(tooltipHTML(d));
        }
      )
      .on('mouseout', () =>
         d3.select('#tooltip')
           .classed('hidden', true))
     
     dot.append('text')
       .attr({
          class: 'text',
          x: d => x(d[0]),
          y: d => y(d[1]),
          // stroke: 'white'
          display: 'none'
        })
       .text((d,i) =>
         `${ (d[0]).toFixed(2)} : ${(d[1]).toFixed(2)}`)

