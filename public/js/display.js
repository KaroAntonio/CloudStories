function drawAll() {
    drawStoryLine();
    drawBranches();
    drawStats();
}

function drawStoryLine() {
    $('#story_line').empty();
    for (i = (storyLine.length - 1); i >= 0; i--) {
        var new_line = document.createElement("DIV");
        new_line.style.color = colorScale(i);
        new_line.onmouseenter = function(e) { 
            return function() { 
                e.style['font-style'] = 'italic';
                e.style.color = colorScale(0)}}(new_line);
        new_line.onmouseout = function(e,i) { 
            return function() { 
                e.style['font-style'] = 'normal';
                e.style.color = colorScale(i)}}(new_line,i);
        new_line.onclick = function(i) { 
            return function() { clickStory(storyLine[i])}}(i)
        new_line.className = "line";
        new_line.id = 'line_' + storyLine[i].id;
        new_line.innerHTML = storyLine[i].line;
        $('#story_line')[0].appendChild(new_line);
    }
    $('#story_line_container')[0].scrollTop = 
        $('#story_line_container')[0].scrollHeight;
}

function drawBranches() {
    
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
        
        
        for (i = 0; i < branches.length ; i++) {
            var new_line = document.createElement("DIV");
            var d = branches[i];
            new_line.style.color = branchColorScale(d.visits);
            new_line.onmouseenter = function(e,d) { 
                return function() { 
                    e.style['font-style'] = 'italic';
                    e.style.color = colorScale(0)}}(new_line,d);
            new_line.onmouseout = function(e,i,d) { 
                return function() { 
                    e.style['font-style'] = 'normal';
                    e.style.color = branchColorScale(d.visits)}}(new_line,i,d);
            new_line.onclick = function(i) { 
                return function() { clickStory(branches[i])}}(i)
            new_line.id = 'line_' + d.id;
            new_line.className = 'line';
            new_line.innerHTML = d.line;
            $('#branches')[0].appendChild(new_line);
        }
    } else {
        selected = null
    }
    
    //Focus Form
    if (branches.length == 0)
        if (storyLine.length > 1)
            document.getElementById("line").focus();
}

function drawStats() {
    if (user != null) {
        $('#user_stats')[0].innerHTML = 
            "" + user["experience"] + 
            " // " + user["prestige"];
    }
}