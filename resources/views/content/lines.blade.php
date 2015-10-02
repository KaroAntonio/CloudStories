<div id='container'>
<div id='story_line_container' class='story_line_container_shadows'>
    <div class='valign bottom'>
        <div id='story_line'></div>
    </div>
</div>
<hr id='story_break'>
<div id="branches"></div>
<div id="text_form">
<div class="container-fluid">
    {!! Form::open(['url'=>'store','id'=>'line_form','class'=>'form-horizontal']) !!}
    {!! Form::hidden('parentID', null, array('id'=>'parentID')) !!}
    {!! Form::hidden('authorID', null, array('id'=>'authorID')) !!}
    <div class="form-group">
     {!! Form::text('line', null, array('maxLength' => 80, 'id'=>'line','class'=>'form-control'))  !!} 
    </div>
    {!! Form::close() !!}
<div id='add_line_button'>+</div>
    <div id='alpha_warning'>WARNING: wrdcvlt is in testing, anything written is dust in the wind.</div>
<div id='user_stats'></div>
</div>
</div>
    <div id='tips_container'>
    </div>
    <div id='tree_container'></div>
</div>
<div id='background'></div>
<div id='veil'>
<div id='welcome_banner'>
         <div class="title-container">
    <div class="title">
        <a onclick='hideBannerTip()'>
            @include('content/title')
        </a>
        
    </div>
</div>
</div>
    <div id='banner_tips'></div>
    <div id='banner_nav'></div>
</div>
<!--JQUERY-->
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<!--
<script src="/jspos/lexer.js" type="text/javascript"></script>
<script src="/jspos/lexicon.js" type="text/javascript"></script>
<script src="/jspos/POSTagger.js" type="text/javascript"></script>
-->
<!--P5.JS-->
<!--<script language="javascript" src="p5/p5.min.js"></script>-->
<!--<script language="javascript" src="p5/addons/p5.dom.js"></script>-->
<!--<script language="javascript" src="p5/addons/p5.sound.js"></script>-->
<!--My JS-->

<script src="js/0_resource.min.js" type="text/javascript"></script>

<!--
<script src="js/colors.js" type="text/javascript"></script>
<script src="js/helpers.js" type="text/javascript"></script>
<script src="js/tips.js" type="text/javascript"></script>
<script src="js/tip_library.js" type="text/javascript"></script>
<script src="js/storyline.js" type="text/javascript"></script>
<script src="js/tree.js" type="text/javascript"></script>
<script src="js/cookies.js" type="text/javascript"></script>
<script src="js/display.js" type="text/javascript"></script>
<script src="js/sketch.js" type="text/javascript"></script>
-->


<script>
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = (w.innerHeight|| e.clientHeight|| g.clientHeight);

//GET PHP vars
var stories = <?php echo json_encode($stories); ?>,
    user = <?php echo json_encode(Auth::user()); ?>,
    preferences;
    
var storyLine,
    branches,
    selected,
    dictionary,
    num_lines,
    generatedLine="";

var fontSize = 30,
    iconSize = 12,
    iconInset = 25,
    focusMultiplier = 0.5,
    focusHeight = height * focusMultiplier,
    formXOffset = 320,
    formButtonYOffset = 25,
    maxBranches = 3,
    branchOffset = 5,
    storyLineOffset = 5,
    maxLineChars = 44,
    enableWarning = false, //Input warning that lines will not be commited
    tips_enabled = true,
    visited = false, //the site has been visited before
    debug = true;
    
//Request & Ajax params
var subtree_depth = 15;
    
//D3 Tree Layout    
//Tree Projection
var diagonal;
var tree,
    svg;
var node_i = 0,
    duration = 750,
    root;
    
//Color Scheme   
var backgroundColor = '#f0f0f0';
var backColor = '#cbcbcb'; //a light shade of mist
//var forwardColor = '#777777';
//var forwardColor = '#3385AD';
//var forwardColor = '#FF6666';
//var forwardColor = '#6B24B2';
var forwardColor = '#8A8AE6';
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

//INITIALIZE Preferences
try {
    preferences = JSON.parse(user.preferences);
} catch (e){
    preferences = {}
}
initPrefs(preferences);
    
//INITIALIZE Tips
if (user != null) {
    tips_enabled = preferences['tips_enabled']
} else {
}
    
//Banner Tips
if (user == null) showBannerTip(0);
else hideBannerTip();
    
//Explorational Tips
initTips();

//SET Cursor
document.getElementsByTagName("body")[0].style.cursor = "default";
//SET form listeners
if (enableWarning) {
    $('#line').on('focus', displayAlphaWarning);
    $('#line').on('focusout', hideAlphaWarning);
}

disable_form('#line_form');
buildStoryLine(1);
listen_for_bumps();

//DISPLAY current lines
if (user != null) {
    if (user['line_ids'] != "")
        num_lines = JSON.parse(user['line_ids']).length;
    else 
        num_lines = 0;
    requestSubtree(
        user['current_line'],
        1,
        function() {clickStory(findLine(user['current_line']))})
} else if (is_cookie("last_line_id")) {
    var last_line = get_cookie("last_line_id");
    requestSubtree(
        last_line,
        1,
        'click')
}
else drawAll();

</script>