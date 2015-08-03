//Helper Functions

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
    console.log(code + " up")
    if (code == 16)
        shiftDown = false;
}
    
function triggerKey(code) {
    console.log(code + " down")
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
        shiftDown = true;
        if (storyLine.length > 0)
                clickStory(storyLine[1]);
    } else if (code == 38 && shiftDown) {
        if (storyLine.length > 0)
                clickStory(storyLine[1]);
    }
}
