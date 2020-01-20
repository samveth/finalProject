function myFunction(){
    d3.select(this)
      .style('fill', 'red')
  }

d3.select('#button').on('click' , myFunction)

//make height and width variables
let h = 300
w = 300
r = 100

//random svg and circle
d3.select("body") 
  .append("svg")
  .attr("width", 100)
  .attr("height" , 100)
  .append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 50)
  .style("fill", 'blue')

  //making the oie data for pie chart
pieData = [{"label": "one", "value":50},
           {"label": "two", "value":30},
           {"label": "three", "value":20}];

var visual = d3.select('body')
  .append('svg:svg')
  .data([piedata])
    .attr('width' , w)
    .attr('height' , h)
    .attr('radius' , r)
  .append('svg:g')
    .attr('transform' , 'translate(' + r + ',' + r +')')

var arc = d3.svg.arc()
  .outerRadius(r);

var pie = d3.layout.pie()
  .value(function(d) { return d.value; });

var arcs = visual.selectAll('g.slice')
  .data(pie)
  .enter()
    .append('svg:g')
      .attr('class' , 'slice');
  arcs.append('svg:path')
      .attr('fill' , 'green')
      .attr('d', arc);
  arcs.append('svg:text')
       .attr('transform' , function(d) {
         d.innerRadius = 0
         d.outerRadius = r
         return 'translate'
       }
  
