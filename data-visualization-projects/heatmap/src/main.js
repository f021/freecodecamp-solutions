import d3 from 'd3'
import heatmap from './heatmap'
import scatterplot from './scatterplot'
import { fillMatrix, fillArr } from './fill-array'

const _ = str =>
  Number(document.getElementById(str).value)

const render = () =>
  heatmap(fillMatrix([_('x'), _('y')], Math.random))
  // scatterplot(fillArr([300, 4], Math.random))

render()

document.addEventListener('input',() => {
  render()
})
