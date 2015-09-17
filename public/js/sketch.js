//DRAW A BACKGROUND USING P5.JS

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('background')
    //console.log(stringColor('moondrop', forwardColor))
}

function renderStoryShells() {
    //$('#story_line').css('background', '#fff')
    //$('.line').css('color', '#fff')
    background('#fff')
    var s = 50;
    for (var i = storyLine.length - 1; i >= 0; i--) {
        fill(stringColor(storyLine[i].line, forwardColor, 0.95))
        noStroke();
        ellipse(window.innerWidth/2, window.innerHeight/2, i*s, i*s)    
    }
}

function stringColor(w,c, s) {
    //returns a hexcode interpretation of a string
    var sum = 0;
    for (var i = 0; i < w.length; i++) {
        sum += w.charCodeAt(i) * i
    }
    if (sum < 1118481)
        sum+= 13118481
        //sum += parseInt(c.substring(1,6), 16);
    //Modulus the max value for a 6 digit hex
    return shadeColor(("#" + (sum%16777215).toString(16)), s)
}

//http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}