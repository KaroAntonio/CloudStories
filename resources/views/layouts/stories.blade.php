<!DOCTYPE html>
<meta http-equiv="content-type" content="application/xhtml+xml; charset=utf-8" />

<html> 
<head>
<!-- Bad Style Ref -->
<link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">
</head>
</html>

<body>
<div id="textForm"> 
{!! Form::open(['url'=>'story','id'=>'newStory']) !!}
{!! Form::text('line', null, array('size' => 44 , 'maxLength' => 80, 'id'=>'line'))  !!}
{!! Form::hidden('parentID', $stories[0][0]->id) !!}
{!! Form::close() !!}
</div>

<script src="http://d3js.org/d3.v3.min.js"></script>
<script>
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
var fontSize = 30,
    iconSize = 12,
    iconInset = 25,
    focusMultiplier = 0.5,
    focusHeight = height * focusMultiplier,
    formXOffset = 320,
    formButtonYOffset = 25,
    maxBranches = 3,
    branchOffset = 5;
    storyLineOffset = 5;
    maxLineChars = 44
    showVisits = false;
    
//GET PHP var
var stories = <?php echo json_encode($stories); ?>;

//SET Curser
document.getElementsByTagName("body")[0].style.cursor = "default";

var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
    
//Color Scheme   
var backgroundColor = '#f0f0f0';
//var backgroundColor = '#aaaaaa';
var backColor = '#cdcdcd'; //a light shade of mist
//var backColor = '#ffffff'; //a light shade of mist
//var forwardColor = '#777777';
//var forwardColor = '#3385AD';
var forwardColor = '#FF6666';
//var forwardColor = '#6B24B2';
//var maxBranchColor = '#000000';
var maxBranchColor = '#3385AD';
//var maxBranchColor = inverse(forwardColor);
var branchColorScale;
var colorScale = d3.scale.linear()
    .range([forwardColor, backColor]) 
    .domain([0, 7])
    .clamp(true);
    
//Scales
scaleX = d3.scale.linear()
        .domain([0,20])
        .range([0,25]);

scaleY = d3.scale.linear()
        .domain([0,20])
        .range([0,25]);
    
//SVG Shapes
bookmark = [{"x":0.0, "y":0.0},
            {"x":0.0,"y":20.0},
            {"x":5,"y":15},
            {"x":10.0,"y":20.0},
            {"x":10.0,"y":0.0}];

var background = svg.append("g"); 
var storyG = svg.append("g");
var branchesG = svg.append("g");
var formG = svg.append("g");
var formButtonG = svg.append("g");
var iconG = svg.append("g");

var storyLine = stories[0],
    branches = stories[1],
    selected;

drawBackground();
drawStoryLine();
drawBranches();
drawForm();
drawIcons();

//BIND Keyboard events
d3.select("body").on("keydown", function() {
    triggerKey(d3.event.keyCode);
});

window.onresize = function(event) {
    updateWindow();
    drawBackground();
    drawStoryLine();
    drawBranches();
    drawForm();
    drawIcons();
};
    
function drawIcons() {
    //Info/Help Icon
    iconG.selectAll("circle")
        .remove();
    iconG.selectAll("text")
        .remove();
    iconG.selectAll("polygon")
        .remove();
    
    var i = iconG.selectAll("text")
            .data(["i"])
            .enter()
            .append("text")
            .attr("x", width - iconInset - 2)
            .attr("y", iconInset + 8)
            .attr('class', 'icon')
            .text(function (d) { return d; });
                 
    var circle = iconG.append("circle")
            .attr("cy", iconInset )
            .attr("cx", width - iconInset )
            .attr("r", iconSize)
            .attr("stroke", backgroundColor)
            .attr("stroke-width", 2)
            .attr("fill", 'rgba(255,255,255, 0)')
            .on("click", function() {})
            .on("mouseover", function(d) {
                d3.select(this).attr("stroke", '#454545'); 
                iconG.selectAll("text").attr('class', 'iconHover'); })
            .on("mouseout", function(d) {
                d3.select(this).attr("stroke", backgroundColor); 
                iconG.selectAll("text").attr('class', 'icon'); });
    
    //Bookmark Icon
    var b = iconG.selectAll("polygon")
        .data([bookmark])
        .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d) { return [scaleX(d.x),scaleY(d.y)].join(","); }).join(" "); })
        .attr("transform", 
              "translate(" + (width - (iconInset * 2.5)) + "," + iconInset * 0.55 + ")")
        .attr("fill", 'white')
        .attr("stroke",backgroundColor)
        .attr("stroke-width",2)
        .on("mouseover", function(d) {
                d3.select(this).attr("stroke", '#454545');  })
        .on("mouseout", function(d) {
                d3.select(this).attr("stroke", backgroundColor); });
}
    
function drawBackground() {
    background.selectAll("rect")
        .remove();
    //LINE DIVIDER
    background.append("rect")
                .attr("y", height - focusHeight - fontSize/3)
                .attr("x", width/4)
                .attr("width", width/2)
                .attr("height", 2)
                .attr("fill", backgroundColor);
    
}
    
function drawStoryLine() {
    //DRAW Story Line
    storyG.selectAll("text")
        .remove();
    
    if (storyLine.length > 0) 
        storyG.selectAll("text")
            .data(storyLine)
            .enter()
            .append("text")
            .text( storyText )
            .attr('class','storyLine')
            .attr("fill",storyLineColor)
            .attr("x",(width/2))
            .attr("y",function (d,i) { 
                return height -
                        storyLineOffset -
                        focusHeight - 
                        (fontSize * (i + 0.5))} )
            .on("click", function(d) { clickStory(d) })
            .on("mouseover", function(d,i) {
                     d3.select(this)
                            .attr("fill", storyLineHoverColor )
                            .style("font-size", "31"); })
            .on("mouseout", function(d,i) {
                     d3.select(this).attr("fill", colorScale(i) )
                                    .style("font-size", "30"); });
}

function drawBranches() {
    
    //DRAW Branches
    branchesG.selectAll("text")
        .remove();
    
    if (branches.length > 0) {
        //SORT braches wrt to visits
        branches.sort(function(a,b) { 
            return parseFloat(a.visits) - parseFloat(b.visits) 
        });
        branches.reverse();
        
        //SPLICE Branches into tiers
        var tiers = [];
        //The Top tier shows the most popular branch
        tiers[0] = branches.splice(0, 1);
        //The Middle tier shows the runner-up branches
        tiers[1] = branches.splice(0, branches.length*1/3);
        //The Bottom tier shows the least popular branches
        tiers[2] = branches.splice(0, branches.length);
        
        //CHOOSE a random branch from each third
        for(var i = 0; i < tiers.length; i++) {
            if (tiers[i].length > 0) {
                var j = Math.floor((Math.random() * tiers[i].length));
                branches.unshift(tiers[i].splice(j, 1)[0]);
            }
        }
        
        //SET Selected Branch to the top branch
        if (branches.length > 0)
            selected = branches[branches.length - 1];
        else
            selected = null;
        
        //SORT Branches to display as a gradient
        branches.sort(function(a,b) { 
            return parseFloat(b.visits) - parseFloat(a.visits) 
        });
        
        //SET Branch Color Scale
        branchColorScale = d3.scale.linear()
            .range([backColor, maxBranchColor ]) 
            .domain([0, branches[0].visits])
            .clamp(true);
        
        branchesG.selectAll("text")
            .data(branches)
            .enter()
            .append("text")
            .text( storyText )
            .attr('class','branch')
            .attr("fill", branchColor )
            .style("font-weight", "400")
            .attr("x",(width/2))
            .attr("y",function (d,i) {
                return height + 
                    branchOffset - 
                    focusHeight + 
                    (fontSize * (i + 0.5))} )
            .on("click", function(d) { clickStory(d) })
            .on("mouseover", function(d,i) {
                 d3.select(this)
                        .attr("fill", branchHoverColor )
                        .style("font-size", "31"); })
            .on("mouseout", function(d) {
                 d3.select(this)
                         .attr("fill", branchColor )
                         .style("font-size", "30"); })
    }
}
    
function drawForm() {
    
    if (branches.length == 0)
        if (storyLine.length > 1)
            document.getElementById("line").focus();
    
    
    
    
    document.getElementById("textForm")
        .style.left = 
            width/2 - 
            formXOffset + 
            70 + "px";
    
    document.getElementById("textForm")
            .style.marginTop = 
                height +
                branchOffset - 
                focusHeight + 
                (branches.length * fontSize) +"px";
    
    formButtonG.selectAll("text")
            .remove();
    
    formButtonG.selectAll("text")
            .data(["+"])
            .enter()
            .append("text")
            .attr("x", width / 2 + formXOffset - 50 + "px")
            .attr("y", (
                height +
                branchOffset - 
                focusHeight +  
                formButtonYOffset + 
                (branches.length * fontSize)))
            .attr('class', 'formButton')
            .text(function (d) { return d; })
            .on("click", function() { submitForm() })
            .on("mouseover", function(d) {
                 d3.select(this).attr('class', 'formButtonHover'); })
            .on("mouseout", function(d) {
                 d3.select(this).attr('class', 'formButton'); });
    
    //Move Form off screen at beginning
    if ((storyLine.length == 1) && (branches.length == 0)) {
        console.log("beginning")
        document.getElementById("textForm")
            .style.marginTop = 
                height * 2  +"px";
        formButtonG.selectAll("text")
                    .attr("y", height * 2);
    }
}
    
function triggerKey(code) {
    //Disable Keys if form is active
    if (document.activeElement.name == 'line')
        return;
    
    //On enter key, 'click' selected branch
    if (code == 13) {
        if (selected == null)
            clickStory(storyLine[0])
        else
            clickStory(selected);
    } else if (code == 16) {
        if (storyLine.length > 0)
            clickStory(storyLine[1]);
    }
}
    
function updateWindow(){
    width = w.innerWidth || e.clientWidth || g.clientWidth;
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
    svg.attr("width", width).attr("height", height);
    focusHeight = height * focusMultiplier;
}

function storyText(d) {
    if (showVisits)
        return (d.line + " " + d.visits);
    else
        return (d.line);
}

// Display Branches of clicked line
function clickStory(d) {
    if (d != null) {
        var route = window.location.href;
        route = route.replace(/story\/.*/, '');
        window.location = route + "story/" + d.id;
    }
    
}
    
function storyLineColor(d,i) {
    return colorScale(i);
}
    
function storyLineHoverColor(d,i) {
    //return increase_brightness(colorScale(0),26);
    return colorScale(0);
}

function branchHoverColor(d,i) {
    return colorScale(0); // leaf node
}

function branchColor(d) {
    return branchColorScale(d.visits); // leaf node
}
    
function submitForm() {
    document.forms["newStory"].submit();
}
    
function increase_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
    
function inverse(hex) {
    if (hex.length != 7 || hex.indexOf('#') != 0) {
        return null;
    }
    var r = (255 - parseInt(hex.substring(1, 3), 16)).toString(16);
    var g = (255 - parseInt(hex.substring(3, 5), 16)).toString(16);
    var b = (255 - parseInt(hex.substring(5, 7), 16)).toString(16);
    var inverse = "#" + pad(r) + pad(g) + pad(b);

    return inverse
}
    
function pad(num) {
    if (num.length < 2) {
        return "0" + num;
    } else {
        return num;
    }
}

</script>
</body>