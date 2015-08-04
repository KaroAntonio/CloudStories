//Helper Functions

function listen_for_bumps() {
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
    if (document.activeElement.name == 'line') {
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
        shiftDown = true;
        if (storyLine.length > 0)
                clickStory(storyLine[1]);
    } else if (code == 38 && shiftDown) {
        if (storyLine.length > 0)
                clickStory(storyLine[1]);
    }
}
