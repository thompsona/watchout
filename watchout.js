// start slingin' some d3 here.

var svg = d3.select('body').append('svg');

var w = window.innerWidth, h = window.innerHeight;

svg.attr({width: w, height: h});

svg.selectAll('circle').data(d3.range(10))
  .enter()
    .append('circle')
    .attr('r', function(d) {return 20;})
    .attr('cx', function(d) {
      return Math.random() * w;
    })
    .attr('cy', function(d) {
      return Math.random() * h;
    })
    .style('fill', function(d) {
      if(d % 2 === 0) {
        return "pink";
      }else {
        return "blue";
      }
    })
    .attr('class', 'badCircle');


var drag = d3.behavior.drag()
  .on("drag", function(d){
    console.log("called");
    console.log(d3.event.dx);
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this).attr("transform", function(d,i){
      return "translate(" + [ d.x , d.y] + ")";
    });
  });

svg.append('circle')
  .data([{x: 0, y: 0}])
  .attr('r', function(d) {return 20;})
  .attr('cx', function(d) {
    return 300;
  })
  .attr('cy', function(d) {
    return 300;
  })
  .style('fill', function(d) {
    return "black";
  })
  .attr('class', 'goodCircle')
  .call(drag);


// code runs every 1 second
setInterval( function () {
  d3.selectAll('.badCircle').transition()
    .duration(1000)
    .attr('cx', function(d) {
      return Math.random() * w;
    })
    .attr('cy', function(d) {
      return Math.random() * h;
    });
}, 1000);

