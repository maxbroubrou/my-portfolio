// description_area (only blue background rectangle & triangle)
var description_area = document.getElementById("description_area");
var ctx = description_area.getContext("2d");

//dimensions
const h = parseInt(window.innerHeight); //931
const w = parseInt(window.innerWidth  * 0.28); //554
description_area.width = w;
description_area.height = h;

//rectangle
ctx.fillStyle = "#D0ADA7";
ctx.globalAlpha = 0.5;
ctx.fillRect(0, 0, w*0.7, h);

//triangle
ctx.beginPath();
ctx.moveTo(w*0.7, 0);
ctx.lineTo(w*0.7, h);
ctx.lineTo(w, h);
ctx.closePath();
ctx.fill()