const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const currencyFormat = d3.format("$,.2f");

const dateFormat = time =>
  new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'long'
  }).format(new Date(time))

const tooltipHTML = ( [date, currency] ) =>
  `<p id='currency'>${currencyFormat(currency)} Billion</p>
  <p id='date'>${dateFormat(date)}</p>`

fetch(url)
  .then(res => res.json())
  .then(json => render(json));

const render = dataset => {  
    
  document.getElementById('title').textContent = dataset.name.split(',')[0];
  document.getElementById('source').textContent = dataset.source_name;
  document.getElementById('description').textContent = dataset.description;
  
  const margin = {
    top: 25,
    bottom: 25,
    left: 50,
    right: 20  
  };
  
  const w = 600  - margin.left - margin.right;
  const h = 400  - margin.top - margin.bottom;
  const len = dataset.data.length;
  const gap = 1;
  const barWidth = w/len - gap;
  
  // make svg container for plot
  
  let svg = d3.select('#plot')
    .append('svg')
    .attr({
      width: w + margin.left + margin.right,
      height: h + margin.top + margin.bottom
    });
  
  // scale for x axis and y axis
  
  let x = d3.time
    .scale()
    .domain([
      new Date(dataset.data[0][0]),
      new Date(dataset.data.slice(-1)[0][0])
    ])
    .range([0, w]);
  
  let y = d3.scale
    .linear()
    .domain([
      d3.min(dataset.data, d => d[1]),
      d3.max(dataset.data, d => d[1])
    ])
    .range([h, 0])

 // make x, y scale 
  
  svg.append('g')
    .call(
      d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(d3.time.years, 5)
    ).attr({
        class: 'axis',
        transform: `translate(${margin.left}, ${h + margin.top})`
  });
  
    svg.append("g")
      .attr("class", "y axis")
      .call(y)
      .append("text")
      .attr({
        transform: "rotate(-90)",
        x: 0,
        dx: '-3em',
        y: 0,
        dy: `${margin.left + 20} px` 
      })
      .style('text-anchor', 'end')
      .text('Gross Domestic Product, USA');
    
  svg.append('g')
    .call(
      d3.svg.axis()
        .scale(y)
        .orient('left')
    ).attr({
      class: 'axis',
      transform: `translate(${margin.left}, ${margin.bottom})`
    });
    
  svg
    .selectAll('rect')
    .data(dataset.data)
    .enter()
    .append('rect')
    .on('mouseover', function(d) {
      let [x, y] = d3.mouse(this);
      d3.select('#tooltip')
        .classed('hidden', false)
        .style({
          left: `${ x + margin.left + 10 }px`,
          top: `${ y - 10 }px`
        }).html(tooltipHTML(d));
        d3.select(this)
        .attr('fill', 'white')
      }
    ).on('mouseout', function(d) {
       d3.select('#tooltip')
        .classed('hidden', true);
       d3.select(this)
        .transition()
        .duration(100)
        .attr('fill', 'black')
      }
     ).attr({
      width: barWidth,
      height: (d, i) => h - y(d[1]),
      x: (d, i) => i * (barWidth + gap),
      y: (d, i) => y(d[1]),
      fill: 'black',
      transform: `translate(${margin.left}, ${margin.bottom})`
    });
}
