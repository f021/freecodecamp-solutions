import d3 from 'd3'
import {flat1} from './flat-array'

const heatmap = (dataset) => {
  const rows = dataset.length
  const cols = dataset[0].length
  dataset = flat1(dataset)

  const colors = ['orange', 'green']

  const tooltipHTML = (arr) =>
    arr.reduce((r, n, i) => r + `<p>${i} : ${n}</p>`, '')

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

  const w = rootSize.width - margin.left - margin.right
  const h = rootSize.height - margin.top - margin.bottom

  const cell = {
    w: w / cols,
    h: h / rows,
    gap: 0
  }

  const rand = () =>
    Math.floor(Math.random() * dataset.length + 1)

  // scale

  let chart = d3.select('#root')
                  .append('svg')
                    .attr({
                      width: w + margin.left + margin.right,
                      height: h + margin.top + margin.bottom
                    })
                  .append('g')
                    .attr({
                      transform: `translate(${margin.left}, ${margin.top})`
                    })


  // let color = d3.scale.quantile()
  //               .domain([0, .5, 1])
  //               .range(colors)


  let color = d3.scale.linear()
                .domain([0,1])
                .range(colors)



  chart.selectAll('rect')
       .data(dataset)
       .enter()
       .append('rect')
       .on('mouseover', function(d){
         console.log(d)
       })
        //  .attr({
        //    x: (_, i) => w/2,
        //    y: (_, i) => h/2,
        //    width: cell.w,
        //    height: cell.h,
        //    fill: (d, i) => color(d)
        //  })
        //  .transition()
        //  .delay((d,i) => 50 * i)
         .attr({
           x: (_, i) => (i % cols) * (cell.w + cell.gap),
           y: (_, i) => Math.floor(i / cols) * (cell.h + cell.gap),
           width: cell.w,
           height: cell.h,
           fill: (d, i) => color(d)
         })

         // scale

 const x = d3.scale.linear()
             .domain([0, cols])
            .range([0, w])

 const y = d3.scale.linear()
             .domain([0, rows])
            .range([0, h])

  // draw axis

  const xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('top')
                    .ticks(cols > 10 ? 10 : cols)
                    // .tickSize(-h)

  const yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(rows > 10 ? 10 : rows)
                    // .tickSize(-w)

  chart.append('g')
          .attr({
            class: 'axis'
            // transform: `translate(0, ${h})`
          })
          .call(xAxis)
        .append('text')
          .attr({
            class: 'label',
            x: w,
            y: -30
          })
          .attr('text-anchor', 'end')
          .text('x axis')


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

         // draw title
         d3.select('svg').append('text')
           .attr({
             x: w/2,
             y: 0,
             'text-anchor': 'middle',
             transform: `translate(${margin.left}, ${margin.top/2})`
           })
           .text('RANDOM HEATMAP')

 }


 export default heatmap
