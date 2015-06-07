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
{!! Form::open(['url'=>'store','id'=>'lineForm']) !!}
{!! Form::text('line', null, array('size' => 49 , 'maxLength' => 80, 'id'=>'line'))  !!}
{!! Form::hidden('parentID', null, array('id'=>'parentID')) !!}
{!! Form::close() !!}
</div>
<div id="story_line"></div>
<div id="branches"></div>
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
<script src="/jspos/POSTagger.js" type="text/javascript"></script>
<script src="/js/colors.js" type="text/javascript"></script>
<script src="/jspos/lexer.js" type="text/javascript"></script>
<script src="/jspos/lexicon.js" type="text/javascript"></script>
<script type="text/javascript">
//GET PHP var
var stories = <?php echo json_encode($stories); ?>;
    
var storyLine,
    branches,
    selected,
    dictionary,
    generatedLine="";
    
buildStoryLine(1);

//RECEIVE SERVER DATA
//check for browser support
if(typeof(EventSource)!=="undefined") {
    //create an object, passing it the name and location of the server side script
    var eSource = new EventSource("/updateStories.php");
    //detect message receipt
    eSource.onmessage = function(event) {
        //route page to new address if the parent line has a new branch
        var data = JSON.parse(event.data);
        if (storyLine[0]['id'] == Number(data[0])){
            requestSubtree(Number(data[0]))
            if (findLine(data[1]) != null) {
                buildStoryLine(data[1]);
                branches = findBranches(data[1]);
                drawAll();
            }
        }
    };
}
    
//Disable enter submit
$('#lineForm').on("keyup keypress", function(e) {
  var code = e.keyCode || e.which; 
  if (code  == 13) {               
    e.preventDefault();
    return false;
  }
});

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = (w.innerHeight|| e.clientHeight|| g.clientHeight);
    
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
    
//SET Curser
document.getElementsByTagName("body")[0].style.cursor = "default";
    
//SET Div dimensions
document.getElementById("story_line").setAttribute("style","height:500px");

var svg = d3.select("#story_line").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
    
var bookmarkVisible = false;
    
var bookmarkTip = d3.tip()
    .direction('w') 
    .offset([20 ,-20])
    .attr("class","tip")
    .html(function(d) {
        return "On Line " + storyLine[0].id +"<form id=\"bookmarkForm\">Go to <input type=\"text\" name=\"line_id\" id=\"line_id\" size=\"5\"></form>";
        })
    .style("color", backColor);
    
svg.call(bookmarkTip);
    
//Color Scheme   
var backgroundColor = '#f0f0f0';
var backColor = '#cbcbcb'; //a light shade of mist
//var forwardColor = '#777777';
var forwardColor = '#3385AD';
//var forwardColor = '#FF6666';
//var forwardColor = '#6B24B2';
//var forwardColor = '#8A8AE6';
//var forwardColor = '#CC0066';
var maxBranchColor = '#FF6666';
//var maxBranchColor = '#8A8AE6';
//var maxBranchColor = '#000000';
//var maxBranchColor = '#3385AD';
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
var storyBreakG = svg.append("g");
var branchesG = svg.append("g");
var formG = svg.append("g");
var formButtonG = svg.append("g");
var iconG = svg.append("g");

drawAll();
var last_line = get_cookie("last_line_id");
if (last_line != "")
    requestSubtree(
        last_line,
        clickStory(findLine(get_cookie("last_line_id"))))

//BIND Keyboard events
d3.select("body").on("keydown", function() {
    triggerKey(d3.event.keyCode);
});

window.onresize = function(event) {
    updateWindow();
    drawAll();
};
    
function disableTipForms() {
    //This should disable all tips
    
    //Disable enter submit
    $('#bookmarkForm').on("keyup keypress", function(e) {
      var code = e.keyCode || e.which; 
      if (code  == 13) {               
        e.preventDefault();
        return false;
      }
    });
}

function drawAll() {
    drawBackground();
    drawStoryLine();
    drawBranches();
    drawForm();
    drawIcons();
}
    
function drawIcons() {
    //Info/Help/Settings Icons
    iconG.selectAll("circle")
        .remove();
    iconG.selectAll("text")
        .remove();
    iconG.selectAll("polygon")
        .remove();
    iconG.selectAll("path")
        .remove();
    
    var i = iconG.selectAll("text")
            .data(["i"])
            .enter()
            .append("text")
            .attr("x", width - iconInset - 0)
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
              "translate(" + (width - (iconInset * 3.5)) + "," + iconInset * 0.55 + ")")
        .attr("fill", 'white')
        .attr("stroke",backgroundColor)
        .attr("stroke-width",2)
        .on("mouseover", function(d) {
                d3.select(this).attr("stroke", '#454545');  })
        .on("mouseout", function(d) {
                d3.select(this).attr("stroke", backgroundColor) })
        .on("click", function(d) {
            if (!bookmarkVisible) {
                bookmarkVisible = true;
                bookmarkTip.show(d);
                disableTipForms();
            } else {
                bookmarkVisible = false;
                bookmarkTip.hide(d) ;
            }
            
            });
    
    //GEAR Icon
    var gear = iconG.append("path")
        .attr("d", "M293.629,127.806l-5.795-13.739c19.846-44.856,18.53-46.189,14.676-50.08l-25.353-24.77l-2.516-2.12h-2.937c-1.549,0-6.173,0-44.712,17.48l-14.184-5.719c-18.332-45.444-20.212-45.444-25.58-45.444h-35.765c-5.362,0-7.446-0.006-24.448,45.606l-14.123,5.734C86.848,43.757,71.574,38.19,67.452,38.19l-3.381,0.105L36.801,65.032c-4.138,3.891-5.582,5.263,15.402,49.425l-5.774,13.691C0,146.097,0,147.838,0,153.33v35.068c0,5.501,0,7.44,46.585,24.127l5.773,13.667c-19.843,44.832-18.51,46.178-14.655,50.032l25.353,24.8l2.522,2.168h2.951c1.525,0,6.092,0,44.685-17.516l14.159,5.758c18.335,45.438,20.218,45.427,25.598,45.427h35.771c5.47,0,7.41,0,24.463-45.589l14.195-5.74c26.014,11,41.253,16.585,45.349,16.585l3.404-0.096l27.479-26.901c3.909-3.945,5.278-5.309-15.589-49.288l5.734-13.702c46.496-17.967,46.496-19.853,46.496-25.221v-35.029C340.268,146.361,340.268,144.434,293.629,127.806z M170.128,228.474c-32.798,0-59.504-26.187-59.504-58.364c0-32.153,26.707-58.315,59.504-58.315c32.78,0,59.43,26.168,59.43,58.315C229.552,202.287,202.902,228.474,170.128,228.474z" )
        .attr("transform", 
              "translate(" + (width - (iconInset * 2.8)) + "," + iconInset * 0.48 + ") scale(" + 0.08 + ")")
        .attr("fill", backgroundColor)
        .attr("stroke",backgroundColor)
        .attr("stroke-width",2)
        .on("mouseover", function(d) {
                d3.select(this).attr("stroke", '#454545');
                d3.select(this).attr("fill", '#454545');})
        .on("mouseout", function(d) {
                d3.select(this).attr("stroke", backgroundColor);
                d3.select(this).attr("fill", backgroundColor);});
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
    
function buildStoryLine(id) {
    
    if (findLine(id) == null)
        return;
    
    //Build Story Line
    storyLine = [findLine(id)];
    storyLine[0].top = isTop(id);
    
    while (storyLine[storyLine.length-1].id != 1) {
        var newLine = findLine(storyLine[storyLine.length-1].parentID);
        newLine.top = isTop(newLine.id);
        storyLine.push(newLine);
    }
    
    branches = findBranches(storyLine[0].id);
}
    
function isTop(id){
    var line = findLine(id);
    var siblings = findBranches(line.parentID);
    var topVisits = 0;
    for (var i = 0; i < siblings.length; i++) 
            if (Number(siblings[i].visits) > topVisits) 
                topVisits = siblings[i].visits;
    return Number(line.visits) >= Number(topVisits);
}
    
function findLine(id) {
    for (i = 0; i < stories.length; i++) 
        if (stories[i].id == id)
            return stories[i]
    return null
}
    
function findBranches(id) {
    var new_branches = [];
    for(i = 0; i < stories.length; i++) {
        if (stories[i].parentID == id) {
            new_branches.push(stories[i]);
        }
    }
    return new_branches;
}
    
function drawStoryLine() {
    //DRAW Story Line
    storyG.selectAll("text")
        .remove();
    storyBreakG.selectAll("text")
        .remove();
    storyBreakG.selectAll("line")
        .remove();
    
    if (storyLine.length > 0) {
        //Draw Story Breaks
        storyBreakG.selectAll("line")
            .data(storyLine)
            .enter()
            .append("line")
            .style("stroke", backgroundColor)
            .style("stroke-width", function (d,i) {
                if (!d.top)
                    return 3;
                else 
                    return 0;
                    })
            .style("stroke-dasharray", "4, 4")
            .attr("x1", width/2 - 200)     // x position of the first end of the line
            .attr("y1", storyBreakY )      // y position of the first end of the line
            .attr("x2", width/2 + 200)     // x position of the second end of the line
            .attr("y2", storyBreakY );    // y position of the second end of the line
        
        //Draw Lines
        storyG.selectAll("text")
            .data(storyLine)
            .enter()
            .append("text")
            .text( storyText )
            .style("font", "30px sans-serif")
            .style("font-weight","100")
            .attr("fill",storyLineColor)
            .attr("x",(width/2))
            .attr("y", storyLineY )
            .on("click", function(d) { clickStory(d) })
            .on("mouseover", function(d,i) {
                     d3.select(this)
                            .attr("fill", storyLineHoverColor )
                            .attr("y", storyLineY(d,i) - 2 ); })
            .on("mouseout", function(d,i) {
                     d3.select(this).attr("fill", colorScale(i) )
                                    .attr("y", storyLineY(d,i) ); });
      
    }
}

function drawBranches() {
    
    var generated = {
        line : generatedLine,
        visits : 0,
        id : -1,
    };
    
    if (generatedLine != "")
        branches.push(generated);
    
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
            .style("font", "30px sans-serif")
            .style("font-weight","100")
            .attr("fill", branchColor )
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
                        .style("font-style","italic")
                        .attr("y",function (d) {
                        return height + 
                            branchOffset - 
                            focusHeight - 
                            0 +
                            (fontSize * (i + 0.5))} ); })
            .on("mouseout", function(d,i) {
                 d3.select(this)
                         .attr("fill", branchColor )
                        .style("font-style","normal")
                         .attr("y",function (d) {
                        return height + 
                            branchOffset - 
                            focusHeight - 
                            0 +
                            (fontSize * (i + 0.5))} ); })
    } else {
        selected = null
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
            .style("font-weight","100")
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
    
function generateSentence() {
    //return a relevant semi-sensical sentence using already contributed words
    generatedLine="";
    parseWords();
    var words = []
    var pos = [
        "NN",
        "NNP",
        "NNPS",
        "NNS",
        "PP",
        "JJ",
        "JJR",
        "JJS",
        "PRP"]
    
    var allowed = [];
    
    
    for(var i = 0; i< dictionary.length; i++) {
        //if (pos.indexOf(dictionary[i][1]) != -1) 
            allowed.push(dictionary[i]);
    }
        
    var is = [];
    for (var i = 0; i< 2; i++) 
        is.push(Math.floor((Math.random() * allowed.length)));
    
    words.push(allowed[is[0]][0]);
    words.push(allowed[is[1]][0]);
    
    var parts = [
        "http://api.netspeak.org/netspeak3/search?query=*",
        "*",
        "*&topk=100&nmin=2&nmax=10"]
    
    var url = parts[0]+words[0]+parts[1]+words[1]+parts[2];
    
    var sentence = "";
    
    $.ajax({
        //Use netspeak api
    url: url,
 
    // The name of the callback parameter, as specified by the YQL service
    jsonp: "callback",
 
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
 
    // Tell YQL what we want and that we want JSON
    data: {
        
        format: "json"
    },
 
    // Work with the response
    success: function( response ) {
        
        if (response[4] != undefined) {
            var t = response[4][Math.floor((Math.random() * response[4].length))]
            
            for (var i= 0; i< t[3].length; i++) {
                sentence += t[3][i][2] + " " 
            }
            
            //console.log(words)
            generatedLine = sentence;
            
        }
        drawBranches();
        drawForm();
    }
});
    
    return sentence
}
    
function parseWords() {
    //parse lines into nouns already used in the story and 
    dictionary = [];
    
    for(var i=0; i<storyLine.length; i++) {
        var line = storyLine[i].line
        var words = new Lexer().lex(line);
        var taggedWords = new POSTagger().tag(words);
        for (var j=0; j<taggedWords.length; j++) {
            
            dictionary.push(taggedWords[j]);
        }   
    }
}
    
function triggerKey(code) {
    //Disable Keys if form is active
    if (document.activeElement.name == 'line') {
        if (code == 13) submitForm();
        return
    }
    
    if (document.activeElement.name == 'line_id') {
        if (code == 13) submitForm();
        return
    }
    
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

function storyText(d,i) {
    if (showVisits)
        return (d.line + " " + d.visits);
    else {
        //return (d.line + " \u21AF");
        return (d.line);
    }  
}

// Display Branches of clicked line
function clickStory(d) {
    set_cookie( "last_line_id", d.id, 200 );
    bookmarkTip.hide();
    bookmarkVisible = false;
    if (d != null) {
        if (d.id != -1) {
            buildStoryLine(d.id);
            branches = findBranches(storyLine[0].id);
            drawAll();
            requestSubtree(d.id);
        } else {
            $("#line").val(d.line);
            submitForm();
        }
    }
}
    
function requestSubtree(id,callback) {
    var xmlhttp;
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xmlhttp.open("GET","/get_subtree/"+id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var subtree = eval("(" + xmlhttp.responseText + ")");
            appendSubtree(subtree);
            if (callback !== undefined)
                callback();
        }
      }
}
    
function storyLineY(d,i) {
    return height -
            storyLineOffset -
            focusHeight - 
            (fontSize * (i + 0.5));
}
     
function storyBreakY(d,i) {
    return height -
            storyLineOffset -
            focusHeight - 
            (fontSize * (i + 1.3));
}
    
function storyLineColor(d,i) {
    return colorScale(i);
}
    
function storyLineHoverColor(d,i) {
    return colorScale(0);
}

function branchHoverColor(d,i) {
    return colorScale(0); // leaf node
}

function branchColor(d) {
    return branchColorScale(d.visits); // leaf node
}
    
function submitForm() {
    if (bookmarkVisible == true) {
        //can only visit lines that have already been read
        var id = $('#line_id').val();
        requestSubtree(id, function() {
            if (findLine(id) == null) {
                console.log("No Such Line");
            } else {
                clickStory(findLine(id))
            }
        });
        bookmarkTip.hide();
        bookmarkVisible = false;
        return 
    }
    
    bookmarkTip.hide();
    bookmarkVisible = false;
    
    var newLine = document.forms["lineForm"]["line"].value.trim();
    var test = newLine.toLowerCase();
    
    //Validate
    //Discard empty lines
    if (test == "")
        return
        
    //Check for duplicates
    var siblings = findBranches(storyLine[0].id);
    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].line.toLowerCase() == test) {
            clickStory(siblings[i]);
            $("#line").val("");
            return;
        }
    }
            
    $('#parentID').val(storyLine[0].id);
    
    var posting = $.post( 'store', $("#lineForm").serialize() );
    
    $("#line").val("");
    posting.done(function( data ) {
        appendSubtree([data]);
        clickStory(data);
    });
}

function appendSubtree(subtree) {
    storyIDs = [];
    for (var i = 0; i < stories.length; i++)
        storyIDs.push(Number(stories[i].id))
    
    for (var i = 0; i < subtree.length; i++) 
        if (storyIDs.indexOf(Number(subtree[i].id)) == -1) 
            stories.push(subtree[i]);
}

function set_cookie ( cookie_name, cookie_value, lifespan_in_days, valid_domain ) {
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=" + encodeURIComponent( cookie_value ) +
      "; max-age=" + 60 * 60 * 24 * lifespan_in_days +
      "; path=/" + domain_string ;
}
    
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match ( cookie_name + '=([^;]*)' );
        return decodeURIComponent ( cookie_value[1] ) ;
    }
    return '' ;
}


</script>
</body>