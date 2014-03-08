// start slingin' some d3 here.

var svg = d3.select('body').append('svg');

var w = window.innerWidth, h = window.innerHeight;



svg.append("defs").append("pattern")
      .attr("id", "image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "40")
      .attr("width", "40")
    .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "40")
      .attr("width", "40")
      .attr("xlink:href", "http://img18.imageshack.us/img18/7293/shuriken2.png")
      
    ;

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
    .attr('class', 'badCircle')
    .style('fill', "url(#image)");


var drag = d3.behavior.drag()
  .on("drag", function(d){
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this).attr("cx", function(d){
      return d.x;
    });
    d3.select(this).attr("cy", function(d){
      return d.y;
    });
  });

svg.append('circle')
  .data([{x: 300, y: 300}])
  .attr('r', function(d) {return 20;})
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
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

var checkDistance = function(x1, y1, x2, y2) {
  return Math.sqrt((Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
};


var checkCollision = function() {
  var player = d3.select('.goodCircle');
  var enemies = d3.selectAll('.badCircle');
  enemies.attr('cx', function(d) {
    var enemyX = (d3.select(this).attr('cx'));
    var enemyY = (d3.select(this).attr('cy'));
    var enemyR = d3.select(this).attr('r');
    var playerX = player.attr('cx');
    var playerY = player.attr('cy');
    var playerR = player.attr('r');

    d3.select('.current span').text(1 + +d3.select('.current span').text());

    if(checkDistance(playerX, playerY, enemyX, enemyY) < (+enemyR + +playerR)) {
      d3.select('.collisions span').text(1 + +d3.select('.collisions span').text());
      //set high score
      if ( +d3.select('.high span').text() < +d3.select('.current span').text() ) {
        d3.select('.high span').text(d3.select('.current span').text());
      }
      //set score to zero
      d3.select('.current span').text(0);

    } 
  });
};

// collision clock
setInterval(function() {
  checkCollision();
}, 100
);

// score increment
setInterval 

