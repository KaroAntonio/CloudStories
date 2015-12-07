function drawAll() {
    drawStoryLine();
    drawBranches();
    drawStats();
    drawUserIcons();
    //drawBackground();
    if (enableTree) drawTree();
}

function drawUserIcons() {
    //draw users at their respctive locations
    if (locations == null) return;
    
    for(var i = 0; i < locations.length;i++) {
        if (locations[i].uid != user.id) {
            console.log(locations[i].uid);
            var icon = $('<div></div>');
            icon.attr('id','user_icon_'+locations[i].uid);
            icon.addClass('user_icon');
            icon.html(locations[i].name[0]);
            $('#line_'+locations[i].line_id).append(icon)
        }
    }
}

function drawTree() {
    initTree();
}

function drawBackground() {
    renderStoryShells();
}

function drawStoryLine() {
    $('#story_line').empty();
    for (i = (storyLine.length - 1); i >= 0; i--) 
        drawLine(storyLine[i],colorScale,$('#story_line'));
    
    $('#story_line_container')[0].scrollTop = 
        $('#story_line_container')[0].scrollHeight;
}

function drawBranches() {
    //Color Input Line
    var formOutlineColor = '#eee'
    var shadowStyle = 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 5px ' + forwardColor;
    var unShadow = 'inset 0 0 0px ' + forwardColor;
    $('#line').css('border-color', formOutlineColor);
    $('#line')[0].style['boxShadow'] = unShadow;
    $('#line')[0].style['MozBoxShadow'] = unShadow;
    $('#line')[0].style['WebKitBoxShadow'] = unShadow;
    
    $('#line').focus(
    function(){
        //$(this).css('webkitBoxShadow', maxBranchColor);
        $(this).css('border-color', forwardColor);
        $(this)[0].style['boxShadow'] = shadowStyle;
        $(this)[0].style['MozBoxShadow'] = shadowStyle
        $(this)[0].style['WebKitBoxShadow'] = shadowStyle;
    });
    $('#line').blur(
    function(){
        //$(this).css('webkitBoxShadow', maxBranchColor);
        $(this).css('border-color', formOutlineColor);
        $(this)[0].style['boxShadow'] = unShadow;
        $(this)[0].style['MozBoxShadow'] = unShadow;
        $(this)[0].style['WebKitBoxShadow'] = unShadow;
    });
    
    /*
    var lh = $('.line').height();
    var padding = Math.min(lh/2,
                           (branches.length - 1) * lh).toString() + "px"
    //$('#branches').css('padding-top', padding)
    $('#branches').css('padding-bottom', padding)
    */
    
    $('#branches').empty();
    if (branches.length > 0) {
        //Hidden Branch
        if (user == null || user.id != 1){
            for (var i = 0; i < branches.length; i++) {
                if (branches[i].id == 263) {
                    branches.splice(i,1);
                }
            }
        }
        
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
        var bc = backColor
        if (branches[0].visits == 0)
            bc = maxBranchColor
        branchColorScale = d3.scale.linear()
            .range([bc, maxBranchColor ]) 
            .domain([0, branches[0].visits])
            .clamp(true);
        
        if (branches.length <= 3) {
            $('#branches').height(
                $('.line').height()*branches.length
                //Math.min($('.line').height()*branches.length, $('.line').height())
            );
        }
        
        //Display Top Three Branches
        for (i = 0; i < branches.length ; i++)
            drawLine(branches[i],branchColorScale,$('#branches'), i==0);
            
        //Display The rest of the branches
        for (i = 0; i < tiers.length; i++ )
            for (j = 0; j < tiers[i].length; j++) 
                drawLine(tiers[i][j],branchColorScale,$('#branches'));
    } else {
        selected = null
        $('#branches').height(10);
    }
    
    //Focus Form
    if (branches.length == 0)
        if (storyLine.length > 1)
            document.getElementById("line").focus();
}

function colorLine(d, cs, line, parent) {
    if (parent[0].id == 'branches')
        line.style.color = cs(d.visits);
    else 
        line.style.color = cs(storyLine.indexOf(d));
}

function drawLine(d, cs, parent, isFirst) {
    isFirst = typeof isFirst !== 'undefined' ?  isFirst : false;
    //Draw info
    var line_info = document.createElement("DIV");
    if (d.author_name != 'Anonymous' && d.author_name != undefined)
        line_info.innerHTML = "-" + d.author_name;
    line_info.id = 'info_' + d.id;
    line_info.className = 'info';
    if (debug) line_info.innerHTML += " : " + d.visits + "";
    if (debug_ids) line_info.innerHTML += " : " + d.id+ "";
    
    //Draw Line
    var new_line = document.createElement("DIV");
    colorLine(d, cs, new_line, parent)
    
    new_line.id = 'line_' + d.id;
    new_line.className = 'line';
    new_line.innerHTML = d.line;
    
    if (isFirst) {
        //new_line.innerHTML  = "> " + new_line.innerHTML + " <"
        //new_line.style['border-bottom'] = '2px dashed #ff0000';
    }
    
    var m_enter = function(line, info, d) { 
        return function() { 
            //info.style.display = 'inline';
            info.style.color = '#aaa';
            line.style['font-style'] = 'italic';
            line.style.color = colorScale(0)}}(new_line, line_info, d);
    var m_out = function(line, info, i,d) { 
        return function() { 
            //info.style.display = 'none';
            info.style.color = 'transparent';
            //line_info.style.marginLeft = 0 + "px";
            line.style['font-style'] = 'normal';
            colorLine(d, cs, new_line, parent)}}(new_line, line_info, i,d);
    
    new_line.onmouseenter = m_enter;
    line_info.onmouseenter = m_enter;
    new_line.onmouseout = m_out;
    line_info.onmouseout = m_out;
    
    new_line.onclick = function(d) { 
        return function() { clickStory(d)}}(d)
    
    parent[0].appendChild(line_info);
    parent[0].appendChild(new_line);
    //Offest author tag aftern element is attached to DOM
    line_info.style.marginLeft = -line_info.offsetWidth + "px";
    
}

function drawStats() {
    if (user != null) {
        $('#user_stats')[0].innerHTML = 
            "" + user["experience"] + 
            " // " + user["prestige"] + 
            " // " + num_lines;
    }
}

function displayAlphaWarning() { $('#alpha_warning').css('display','block') }
function hideAlphaWarning() { $('#alpha_warning').css('display','none') }
