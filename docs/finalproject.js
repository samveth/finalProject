function buttonFunction(){
  console.log('hi')

    d3.select(this)
      .style('fill', 'red')
  }

d3.select('#email').on('click' , buttonFunction)

//make height and width variables for the svg
let h = 300
let w = 300
let r = 90


//making the pie data for pie chart
let pieData = [{"label": "Complete", "value":30},
           {"label": "Thoughtful", "value":30},
           {"label": "Grammar", "value":30}];

const svg = d3.select('#pie-chart')
  .append('svg')
    .attr('width' , w)
    .attr('height' , h)
  .append('g')
  .attr('transform' , 'translate(' +  1.5 * r + ',' + 1.5 * r +')')

const listColors = ['#EE8572', '#35495E', '#347474' , '#63B7AF'];
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
  .attr('opacity' , .85)
  .attr("d", arc)
  .attr("stroke", "black")
  .attr("stroke-width", "4px")

// text in the pie graph
d3.select('div#pie-chart svg g')
  .selectAll('text')
  .data(pie(pieData))
  .enter()
  .append('text')
  .attr('transform', function(d) {
    return 'translate (' + arc.centroid(d) + ')';
  })
  .text(function(d,i) {
    return pieData[i].label; 
  })
  .attr('d', arc)
  .attr('text-anchor', 'middle')
  .attr('font-family', 'Raleway')
  .attr('stroke', 'black')



//read in data for pie chart

function cleanupData(d) {
  d.week = +d.week
  return d
}

let syllData = []

d3.csv('finalData.csv', cleanupData)
.then(function(data) {
  syllData = data
  console.log(data)

  d3.select('.csvButtons')
    .append('rect')
      .attr("x", 50)
      .attr("y",50)
      .attr("width",20)
      .attr("height",20)
      .attr("fill",'orange');

  // for (i = 0; i < csv.week.length(); i++) {

  // }

})
.catch(function(error) {
  console.log('csv chart catching error')
})










//define constants of timeline svg
const marginWidth = 50;
const svgWidth = 600;
const svgHeight = 800;
const margin = {top: marginWidth, right: marginWidth, bottom: marginWidth, left: marginWidth + 75};
const plotWidth = svgWidth - margin.left - margin.right;
const plotHeight = svgHeight - margin.top - margin.bottom;
 










// function draw(timeline) {

//     // define svg size
//   var scatterInner = d3.select('body')
//                          .append('svg')
//                          .attr('width', svgWidth + margin.left + margin.right)
//                          .attr('height', svgHeight + margin.top + margin.bottom)
//                          .attr('id', 'scatterPlot')
//                          .append('g')
//                          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//     // create a plot border
//     scatterInner.append('rect')
//                 .attr('x', 0)
//                 .attr('y', 0)
//                 .attr('width', plotWidth)
//                 .attr('height', plotHeight)
//                 .attr('fill', 'transparent');

//     // X scale
//     const xScale = d3.scaleLinear()
//                      .domain([0, plotWidth])
//                      .range([0, plotWidth]);

//     // Y scale
//     const yScale = d3.scaleLinear()
//                      .domain([d3.min(timeline.map(d => d.week -1)), d3.max(timeline.map(d => d.week +1))])
//                      .range([0 ,plotHeight]);

//     // wt scale
//     // const sizeScale = d3.scaleSqrt()
//     //                     .domain([d3.min(cars.map(d => d.wt)), d3.max(cars.map(d => d.wt))])
//     //                     .range([1, 10]);


//     // console.log(d3.extent(0), timeline.map(d => d.week));

// // plot all data points in scatter plot
//     scatterInner.selectAll('circle')
//                   .data(timeline)
//                   .enter()
//                   .append('rect')
//                     .attr('x' , -45)
//                     .attr('y' , d => yScale(d.week) -25)
//                     .attr('width' , 150)
//                     .attr('height' , 35)
//                     .attr("fill", (d, i) => color(i))
//                     .attr('opacity' , '0.95')
//                     .style('stroke', 'black')
//                 .on('mouseover' , popUp)
//                 .on('mouseleave' , popDown)
//                 .on('click' , seeInfo)
//     scatterInner.selectAll('text')
//                .data(timeline)
//                .enter()
//                .append('text')
//                   .attr('font-family', 'Raleway')
//                   .text (function(d) { return 'Week ' +  d['week']})
//                   .style('stroke' , 'black')
//                   .attr('dx' , -5)
//                   .attr('dy' , d => yScale(d.week))             

  

//   // create axes
//     // let xAxisBottom = d3.axisBottom(xScale);
//     // let yAxisLeft = d3.axisLeft(yScale);
//     // scatterInner.append('g')
//     //             .attr('class', 'y-axis')
//     //             .style('stroke', 'white')
//     //             .call(yAxisLeft);
//     // scatterInner.append('g')
//     //             .attr('transform', 'translate(' + 0 + ', ' + plotHeight + ')')
//     //             .attr('class', 'x-axis')
//     //             .call(xAxisBottom);


//  function weekNumber(d) {
//    return + d.week
//  }

// // console.log(weekNumber)

// // This is the function that shows the information when the mouse isn't on the rectangle
//   function popUp(d) {
//     let mouseLoc = d3.mouse(this)
//       let info = 'Click here to learn more about Week ' + d.week + '!!'
//     d3.selectAll('.tooltip')
//       .html(info)
//       .style('visibility' , 'visible')
//       .style('left', 250  + 'px')
//       .style('top', mouseLoc[1] + 'px')
  
//   }

// // This is the function that hides the information when the mouse isn't on the rectangle
// function popDown() {
//   d3.selectAll('.tooltip').style('visibility' , 'hidden')
// }

// function seeInfo(d) {
//   let box = d3.select(this)
//   let info2 = d.topic + '</br> ' + '</br> ' + d.description1 + '</br>' + '</br> ' + d.description2
//   d3.selectAll('.tooltip')
//     .html(info2)
//     .style('left', 250  + 'px')
//     .style('right', margin.right * 0.5 + 'px')
//     // .style('visibility', if('hidden') {'visible'} else {'hidden'})

//   if ('hidden') {
//     console.log('hidden')
//     d3.selectAll('.tooltip')
//     .style('visibility', 'visible');
//     } else {
//     d3.selectAll('.tooltip')
//     console.log('now')
//     .style('visibility', 'hidden');
//     };

//     // .style('visibility' , == 'visible' ? 'hidden' : 'visible')
// }

// }
// draw(timeline);

// d3.select('div#btn-group')
//   .selectAll('button')
//   .data(timeline)
//   .enter()
//   .append('button')
// //   .attr()
//   .attr("fill", 'red')
//   .attr('opacity' , 1)


// d3.selectAll('#button.collapsible')
//   .attr("fill", (d, i) => color(i))

// d3.selectAll("div.content")
//   .style('background-color' , 'white');