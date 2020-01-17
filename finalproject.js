function myFunction(){
    d3.select(this)
      .style('fill', 'red')
  }

d3.select('#button').on('click' , myFunction)

