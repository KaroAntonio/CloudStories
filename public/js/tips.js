function initTips() {
    //initialize listeners on all dom elements
    hideTip();
    var tip_keys = Object.keys(tip_library);
    for (var i = 0; i < tip_keys.length; i++){   
        $(tip_keys[i]).on('mouseover',function(tip_key){
            return function() {
                showTip(tip_key);
            };
        }(tip_keys[i]))
        $(tip_keys[i]).on('mouseout',function(tip_key){
            return function() {
                hideTip(tip_key);
            };
        }(tip_keys[i]))
    }
}

function disableTips() {
    tips_enabled = false;
    $('#tips_container')[0].innerHTML = "";
    preferences['tips_enabled'] = false;
    console.log(preferences)
    postPreferences(preferences);
    set_cookie( "tips_enabled", false, 200 );
}

function hideTip(tip_key) {
    //Clear tips and potentially show a default tip
    if (tips_enabled) {
        //$('#tips_container')[0].innerHTML = "<div id='tip_default' onclick='disableTips()'>Turn off Tips</div>";
        showTip('default');
        $(tip_key).css('background','transparent')
        $(tip_key).css('border','none')
    }
}

function showTip(tip_key) {
    if (tips_enabled) {
        var tip = tip_library[tip_key];
        $('#tips_container')[0].innerHTML = "";
        var content = "<div id='tip_title'>"+tip.title+"</div>"
            +"<div id='tip_content'>"+tip.content+"</div>";
        $('#tips_container')[0].innerHTML = content;
        //$(tip_key).css('background','#fcfcfc')
        //$(tip_key).css('border','dashed 2px #FF6666')
    }
}
