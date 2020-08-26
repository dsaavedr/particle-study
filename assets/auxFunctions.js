function log(s) {
    console.log(s);
}

function scale(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function point(x, y, r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();
}

function random(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

