<div id='container'>
<div id='story_line_container'>
    <div class='valign bottom'>
        <div id='story_line'></div>
    </div>
</div>
    <hr id='story_break'>
<div id="branches"></div>
<div id="text_form"> 
{!! Form::open(['url'=>'store','id'=>'line_form']) !!}
{!! Form::text('line', null, array('size' => 49 , 'maxLength' => 80, 'id'=>'line','class'=>'form-control'))  !!} 
{!! Form::hidden('parentID', null, array('id'=>'parentID')) !!}
{!! Form::hidden('authorID', null, array('id'=>'authorID')) !!}
{!! Form::close() !!}
<div id='add_line_button'>+</div>
<div id='user_stats'></div>
</div>
</div>

<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
<script src="/jspos/POSTagger.js" type="text/javascript"></script>
<script src="/js/colors.js" type="text/javascript"></script>
<script src="/jspos/lexer.js" type="text/javascript"></script>
<script src="/jspos/lexicon.js" type="text/javascript"></script>
<!--My JS-->
<script src="js/helpers.js" type="text/javascript"></script>
<script src="js/storyline.js" type="text/javascript"></script>
<script src="js/cookies.js" type="text/javascript"></script>
<script src="js/display.js" type="text/javascript"></script>

<script>
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = (w.innerHeight|| e.clientHeight|| g.clientHeight);

//GET PHP vars
var stories = <?php echo json_encode($stories); ?>,
    user = <?php echo json_encode(Auth::user()); ?>;
    
var storyLine,
    branches,
    selected,
    dictionary,
    generatedLine="";

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
    debug = false;
    
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
    
//BIND Keyboard events
var shiftDown = false;
d3.select("body").on("keydown", function() {
    triggerKey(d3.event.keyCode);
});
d3.select("body").on("keyup", function() {
    releaseKey(d3.event.keyCode);
});

//SET Curser
document.getElementsByTagName("body")[0].style.cursor = "default";
    
disable_form('#line_form');
buildStoryLine(1);
listen_for_bumps()

if (user != null) {
    requestSubtree(
        user['current_line'],
        function() {clickStory(findLine(user['current_line']))})
} else if (is_cookie("last_line_id")) {
    var last_line = get_cookie("last_line_id");
    requestSubtree(
        last_line,
        function() {clickStory(findLine(last_line))})
}
else drawAll();

</script>