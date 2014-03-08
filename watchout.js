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



    d.x += d3.event.dx;
    d.y += d3.event.dy;
    console.log("d3.event.dx: ", d3.event.dx, " new d.x: ", d.x);
    console.log("d3.event.dy: ", d3.event.dy, " new d.y: ", d.y);
    // d3.select(this).attr("transform", function(d,i){
    //   return "translate(" + [ d.x , d.y] + ")";
    // });
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
//    console.log("enemy: x:", enemyX, " y:", enemyY, " r:", enemyR);
    var playerX = player.attr('cx');
    var playerY = player.attr('cy');
    var playerR = player.attr('r');
    // console.log("player: x:", playerX, " y:", playerY, " r:", playerR);
    // console.log("checkDistance: ", checkDistance(playerX, playerY, enemyX, enemyY));
    // console.log('distance: ', (+enemyR + +playerR));
    if(checkDistance(playerX, playerY, enemyX, enemyY) < (+enemyR + +playerR)) {
      console.log("COLLISION");
    }
  });
};

setInterval(function() {
  checkCollision();
}, 100
);