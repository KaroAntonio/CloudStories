function drawAll() {
    drawStoryLine();
    drawBranches();
    drawStats();
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
    var shadowStyle = 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 5px ' + forwardColor;
    var unShadow = 'inset 0 0 0px ' + forwardColor;
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
        $(this).css('border-color', '#cccccc');
        $(this)[0].style['boxShadow'] = unShadow;
        $(this)[0].style['MozBoxShadow'] = unShadow;
        $(this)[0].style['WebKitBoxShadow'] = unShadow;
    });
    
    var generated = {
        line : generatedLine,
        visits : 0,
        id : -1,
    };
    
    if (generatedLine != "")
        branches.push(generated);
    
    $('#branches').empty();
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
        
        if (branches.length <= 3)
            $('#branches').height($('.line').height()*branches.length);
        
        //Display Top Three Branches
        for (i = 0; i < branches.length ; i++)
            drawLine(branches[i],branchColorScale,$('#branches'));
            
        //Display The rest of the branches
        for (i = 0; i < tiers.length; i++ )
            for (j = 0; j < tiers[i].length; j++) 
                drawLine(tiers[i][j],branchColorScale,$('#branches'));
    } else {
        selected = null
        $('#branches').height(3);
    }
    
    //Focus Form
    if (branches.length == 0)
        if (storyLine.length > 1)
            document.getElementById("line").focus();
}

function drawLine(d, cs, parent) {
    //Draw info
    var line_info = document.createElement("DIV");
    line_info.innerHTML = "-" + d.author_name;
    line_info.id = 'info_' + d.id;
    line_info.className = 'info';
    if (debug) line_info.innerHTML += " : " + d.visits + "";
    
    //Draw Line
    var new_line = document.createElement("DIV");
    new_line.style.color = cs(d.visits);
    new_line.id = 'line_' + d.id;
    new_line.className = 'line';
    new_line.innerHTML = d.line;
    
    var m_enter = function(e, info, d) { 
        return function() { 
            //info.style.display = 'inline';
            info.style.color = '#aaa';
            e.style['font-style'] = 'italic';
            e.style.color = colorScale(0)}}(new_line, line_info, d);
    var m_out = function(e, info, i,d) { 
        return function() { 
            //info.style.display = 'none';
            info.style.color = '#fff';
            //line_info.style.marginLeft = 0 + "px";
            e.style['font-style'] = 'normal';
            e.style.color = cs(d.visits)}}(new_line, line_info, i,d);
    
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