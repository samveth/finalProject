function myFunction(){
    d3.select(this)
      .style('fill', 'red')
  }

d3.select('#button').on('click' , myFunction)

//make height and width variables for the svg
let h = 300
let w = 300
let r = 90


//making the pie data for pie chart
let pieData = [{"label": "one", "value":50},
           {"label": "two", "value":30},
           {"label": "three", "value":20}];

const svg = d3.select('#pie-chart')
  .append('svg')
    .attr('width' , w)
    .attr('height' , h)
  .append('g')
    .attr('transform' , 'translate(' + 2 * r + ',' + 2 * r +')')

const listColors = ['red', 'blue', 'purple' , 'green' , 'orange' , 'maroon' , 'pink' , 'yellow'];
const color = d3.scaleOrdinal(listColors);

const pie = d3.pie()
  .value(d => d.value)
  .sort(null)


const arc = d3.arc()
   .innerRadius(0)
   .outerRadius(r);

function type(d) {
  d.pieData = Number(d.pieData)
  return d
}

 // characteristics of the inside the pie graph   
d3.select('div#pie-chart svg g')
  .selectAll('path')
  .data(pie(pieData))
  .enter()
  .append('path')
  .attr("fill", (d, i) => color(i))
  .attr("d", arc)
  .attr("stroke", "black")
  .attr("stroke-width", "6px")

  //define constants of timeline svg
const marginWidth = 50;
const svgWidth = 600;
const svgHeight = 400;
const margin = {top: marginWidth, right: marginWidth, bottom: marginWidth, left: marginWidth};
const plotWidth = svgWidth - margin.left - margin.right;
const plotHeight = svgHeight - margin.top - margin.bottom;
 

function draw(timeline) {

    // define svg size
  var scatterInner = d3.select('body')
                         .append('svg')
                         .attr('width', svgWidth + margin.left + margin.right)
                         .attr('height', svgHeight + margin.top + margin.bottom)
                         .attr('id', 'scatterPlot')
                         .append('g')
                         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // create a plot border
    scatterInner.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', plotWidth)
                .attr('height', plotHeight)
                .attr('stroke', 'grey')
                .attr('fill', 'transparent');

    // X scale
    const xScale = d3.scaleLinear()
                     .domain([0, plotWidth])
                     .range([0, plotWidth]);

    // Y scale
    const yScale = d3.scaleLinear()
                     .domain([d3.min(timeline.map(d => d.week -1)), d3.max(timeline.map(d => d.week +1))])
                     .range([plotHeight, 0]);

    // wt scale
    // const sizeScale = d3.scaleSqrt()
    //                     .domain([d3.min(cars.map(d => d.wt)), d3.max(cars.map(d => d.wt))])
    //                     .range([1, 10]);


    console.log(d3.extent(0), timeline.map(d => d.week));

// plot all data points in scatter plot
    scatterInner.selectAll('circle')
                .data(timeline)
                .enter()
                .append('rect')
                .attr('x', 30)
                .attr('y', d => yScale(d.week))
                .attr('width', 150)
                .attr('height' , 30)
                .attr("fill", (d, i) => color(i))
                .attr('opacity' , 0.5)
                .style('stroke', 'black')
                .on('mouseover' , popUp)
                // .on('mouseleave' , popDown)
                

  // create axes
    let xAxisBottom = d3.axisBottom(xScale);
    let yAxisLeft = d3.axisLeft(yScale);
    scatterInner.append('g')
                .attr('class', 'y-axis')
                .call(yAxisLeft);
    scatterInner.append('g')
                .attr('transform', 'translate(' + 0 + ', ' + plotHeight + ')')
                .attr('class', 'x-axis')
                .call(xAxisBottom);


  function popUp(d) {
    let mouseLoc = d3.mouse(this)
      let info =
      ' This is information'
    d3.selectAll('.tooltip, .info')
      .html(info)
      .style('visibility' , 'visible')
      .style('left', mouseLoc[0] + yScale + xScale.bandwidth() + 'px')
      .style('top', mouseLoc[1] - yScale.bandwidth() + 'px')
  }
}
draw(timeline);



// function popDown(d) {
//   d3.select(this)
//     .style('fill' , (d , i) => color(i))
// }