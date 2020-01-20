function myFunction(){
    d3.select(this)
      .style('fill', 'red')
  }

d3.select('#button').on('click' , myFunction)

d3.select("body") 
  .append("svg")
  .attr("width", 100)
  .attr("height" , 100)
  .append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 50)
  .style("fill", 'blue')


pieData = [{"label": "one", "value":50}
           {"label": "two", "value":30}
           {"label": "three", "value":20}]

