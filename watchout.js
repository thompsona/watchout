// start slingin' some d3 here.

var svg = d3.select('body').append('svg');

var w = window.innerWidth, h = window.innerHeight;



// svg.append("defs").append("pattern")
//       .attr("id", "image")
//       .attr("x", "0")
//       .attr("y", "0")
//       .attr("height", "40")
//       .attr("width", "40")
//     .append("image")
//       .attr("x", "0")
//       .attr("y", "0")
//       .attr("height", "40")
//       .attr("width", "40")
//       .attr("xlink:href", "http://guerreromarcial.webcindario.com/Imagenes/thick_ninja_shuriken_540.jpg")
//     ;

var radius = 20;

svg.attr({width: w, height: h});

svg.selectAll('circle').data(d3.range(10))
  .enter()
    .append('circle')
    .attr({r: radius, 
          cx: function(d) {
                return Math.random() * w;
              },
          cy: function(d) {
                return Math.random() * h;
              },
          class: 'badCircle'
          })
    .style('fill', function(d) {
      if(d % 2 === 0) {
        return "pink";
      }else {
        return "blue";
      }
    })
    // .style('fill', "url(#image)")
;

var drag = d3.behavior.drag()
  .on("drag", function(d){
    d3.select(this).attr( {cx: d3.event.x, cy: d3.event.y} );
  });

svg.append('circle')
  .data([{x: 300, y: 300}])
  .attr({r: radius})
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

  var player = d3.select('.goodCircle');
  var enemies = d3.selectAll('.badCircle');

// code runs every 1 second
var enemyMove = function () {
  enemies.each( function () {
    d3.select(this).transition()
    .duration(1000)
    .attr('cx', function(d) {
      return Math.random() * w;
    })
    .attr('cy', function(d) {
      return Math.random() * h;
    }).delay(Math.random() * 3000)
    .each("end", enemyMove);
  });
  //enemyMove();
};
enemyMove();

var checkDistance = function(x1, y1, x2, y2) {
  return Math.sqrt((Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
};


var checkCollision = function() {
  enemies.each(function(d) {
    var enemyX = parseInt(d3.select(this).attr('cx'), 10);
    var enemyY = parseInt(d3.select(this).attr('cy'), 10);
    var enemyR = parseInt(d3.select(this).attr('r'), 10);
    var playerX = parseInt(player.attr('cx'), 10);
    var playerY = parseInt(player.attr('cy'), 10);
    var playerR = parseInt(player.attr('r'), 10);

    d3.select('.current span').text(1 + +d3.select('.current span').text());

    var distanceBetween = checkDistance(playerX, playerY, enemyX, enemyY);

    if( distanceBetween < enemyR + playerR) {
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
d3.timer(checkCollision);

