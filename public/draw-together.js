var canvas = document.getElementById('the-canvas');
var ctx = canvas.getContext('2d');
var mouseDown = false;
var serverSocket = io();
var lastMousePosition;


canvas.addEventListener('mousemove', function(event) {
  if (mouseDown){
    var mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    if (lastMousePosition) {
      var pointA = {x: lastMousePosition.x, y: lastMousePosition.y};
      var pointB = {x: mousePosition.x, y: mousePosition.y};
      var line = {pointA: pointA, pointB: pointB};
      serverSocket.emit('draw', line);
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(lastMousePosition.x, lastMousePosition.y);
      ctx.lineTo(mousePosition.x, mousePosition.y);
      ctx.closePath();
      ctx.stroke();
    }
    lastMousePosition = mousePosition;
  }


});

serverSocket.on('draw-to-client', function(line){
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(line.pointA.x, line.pointA.y);
  ctx.lineTo(line.pointB.x, line.pointB.y);
  console.log(line);
  ctx.closePath();
  ctx.stroke();
});
canvas.addEventListener('mouseup', function(event){
  mouseDown = false;
});

canvas.addEventListener('mousedown', function(event) {
  // mouse went down
  mouseDown = true;
});
