//Helper Functions
function listen_for_bumps() {
    //RECEIVE SERVER DATA
    //check for browser support
    if(typeof(EventSource)!=="undefined") {
        //create an object, passing it the name and location of the server side script
        var eSource = new EventSource("/updateStories.php");
        //detect message receipt
        eSource.onmessage = function(event) {
            //bump user to a new line if current line has a new branch
            var data = JSON.parse(event.data);
            if (data != null) {
                if (storyLine[0]['id'] == Number(data[0])){
                    requestSubtree(Number(data[0]))
                    if (findLine(data[1]) != null) {
                        buildStoryLine(data[1]);
                        branches = findBranches(data[1]);
                        drawAll();
                    }
                }
            }
        };
    }
}

function init_location_listener(frequency) {
    //repeatedly request locations in order to update the locations of users
    requestLocations();
    //return setInterval(requestLocations, frequency);
}

function removeUserIcons() {
    //clear current users drawn to the DOM
    $('.user_icon').remove();
}

function requestLocations() {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","/get_locations", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            locations = eval("(" + xmlhttp.responseText + ")");
            //drawAll();
            removeUserIcons()
            drawUserIcons();
        }
      }
    return true;
}

function requestSubtree(id, depth, callback) {
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
    xmlhttp.open("GET","/get_subtree/"+id+"/"+depth, true);
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

function initPrefs(p) {
    //initialize uninitialize prefs
    if (!('tips_enabled' in p))
        p['tips_enabled'] = true;
    else {
        if (p['tips_enabled'] === "true")
            p['tips_enabled'] = true;
        else p['tips_enabled'] = false;
    }
    return p;
}

function postPreferences(p) {
    //http://laravel.io/forum/04-03-2014-simple-ajax-post-response-in-laravel-4
    $.ajaxSetup({
       headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
    });
    var posting = $.post( 'update_prefs', p, onSuccess );
}

function onSuccess(data, status, xhr)
			{
				console.log(data, status, xhr);
			}

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function disable_form(tag) {
    //Disable enter submit
    $(tag).on("keyup keypress", function(e) {
        var code = e.keyCode || e.which; 
        if (code  == 13) {               
            e.preventDefault();
            return false;
        }
    });
}

function releaseKey(code) {
    if (code == 16)
        shiftDown = false;
}
    
function triggerKey(code) {
    //Disable Keys if form is active
    var test = document.forms["line_form"]["line"].value.trim();
    if (document.activeElement.name == 'line') {
        if (code == 13) submitForm();
        return
    } else
        $("#line").blur();
    
    //On enter key, 'click' selected branch
    if (code == 13) {
        if (selected == null)
            clickStory(storyLine[0])
        else
            clickStory(selected);
    } else if (code == 16) {
        shiftDown = true;
        if (storyLine.length > 0)
                clickStory(storyLine[1]);
    } else if (code == 38 && shiftDown) {
        if (storyLine.length > 0)
                clickStory(storyLine[1]);
    }
}

function get_random(int)
{
    var ranNum= Math.floor(Math.random()*int);
    return ranNum;
}
