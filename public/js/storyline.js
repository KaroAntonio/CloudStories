function buildStoryLine(id) {
    if (findLine(id) == null)
        return;
    
    //Build Story Line
    storyLine = [findLine(id)];
    storyLine[0].top = isTop(id);
    
    while (storyLine[storyLine.length-1].id != 1) {
        var newLine = findLine(storyLine[storyLine.length-1].parentID);
        //Because not all stories are sent in request
        //A null line will be found
        if (newLine == null) break;
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

function findBranches(id) {
    var new_branches = [];
    for(i = 0; i < stories.length; i++) {
        if (stories[i].parentID == id) {
            new_branches.push(stories[i]);
        }
    }
    return new_branches;
}

function findLine(id) {
    for (i = 0; i < stories.length; i++) 
        if (stories[i].id == id)
            return stories[i]
    return null
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
    if (id == undefined) id = 1;
    xmlhttp.open("GET","/get_subtree/"+id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var subtree = eval("(" + xmlhttp.responseText + ")");
            appendSubtree(subtree);
            if (branches.length == 0) {
                showStory(storyLine[0].id)
            }
            if (callback !== undefined) {
                if (callback == 'click')
                    clickStory(subtree[0])
                else
                    callback();
            }
        }
      }
    return true;
}

function appendSubtree(subtree) {
    storyIDs = [];
    for (var i = 0; i < stories.length; i++)
        storyIDs.push(Number(stories[i].id))
    
    for (var i = 0; i < subtree.length; i++) 
        if (storyIDs.indexOf(Number(subtree[i].id)) == -1) 
            stories.push(subtree[i]);
}

function showStory(id) {
    buildStoryLine(id);
    branches = findBranches(id);
    drawAll();
}

function clickStory(d) {
    if (d != null)
        set_cookie( "last_line_id", d.id, 200 );
    if (d != null) {
        if (user != null)
            user['experience'] += 1;
        if (d.id != -1) {
            showStory(d.id);
            requestSubtree(d.id);
        } else {
            $("#line").val(d.line);
            submitForm();
        }
    }
}

function submitForm() {
    var newLine = document.forms["line_form"]["line"].value.trim();
    var test = newLine.toLowerCase();
    
    //Validate
    //Discard empty lines
    if (test == "") {
        if (branches != 0)
            clickStory(branches[0])
        return
    }
        
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
    var userID = (user == null) ? 0 : user.id
    $('#authorID').val(userID);
    
    var posting = $.post( 'store', $("#line_form").serialize() );
    
    $("#line").val("");
    posting.done(function( data ) {
        num_lines ++;
        appendSubtree([data]);
        clickStory(data);
    });
}