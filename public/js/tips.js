function initTips() {
    //initialize listeners on all dom elements
    hideTip();
    var tip_keys = Object.keys(tip_library);
    for (var i = 0; i < tip_keys.length; i++){   
        $(tip_keys[i]).on('mouseover',function(tip_key){
            return function() {
                showTip(tip_key,'#tips_container');
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
    postPreferences(preferences);
    set_cookie( "tips_enabled", false, 200 );
}

function hideTip(tip_key) {
    //Clear tips and potentially show a default tip
    if (tips_enabled) {
        //$('#tips_container')[0].innerHTML = "<div id='tip_default' onclick='disableTips()'>Turn off Tips</div>";
        showTip('default','#tips_container');
        $(tip_key).css('background','transparent')
        $(tip_key).css('border','none')
    }
}

function showTip(tip_key, tag, showTitle, large, library) {
    showTitle = typeof showTitle !== 'undefined' ?  showTitle : true;
    large = typeof large !== 'undefined' ?  large : false;
    library = typeof library !== 'undefined' ?  library : tip_library;
    if (tips_enabled) {
        var tip = library[tip_key];
        $(tag)[0].innerHTML = "";
        var content = "";
        if (showTitle & large) 
            content += "<div class='large_tip_title'>"+tip.title+"</div>";
        if (showTitle & !large)
            content += "<div class='tip_title'>"+tip.title+"</div>";
        if (!large)
            content += "<div class='tip_content'>"+tip.content+"</div>";
        else
            content += "<div class='large_tip_content'>"+tip.content+"</div>";
        $(tag)[0].innerHTML = content;
        //$(tip_key).css('background','#fcfcfc')
        //$(tip_key).css('border','dashed 2px #FF6666')
    }
}

function getTipKey(library, index) {
    //get the ith tip key
    return Object.keys(library)[index]
}

function showBannerTip(i) {
    //using a global index, show the corresponding  tip 
    //SKIP certain tips
    
    showTip(getTipKey(intro_library, i), '#banner_tips', i!=0, true, intro_library)
    //Add Nav arrows to tip
    //$('#banner_tips')[0].innerHTML += '<div id="banner_nav"></div>'
    $('#banner_nav')[0].innerHTML = "";
    //$('#banner_nav')[0].innerHTML += "<div id='tip_nav_left' class='nav_button' onclick='showBannerTip("+(i-1)+")'><-</div>";
    $('#banner_nav')[0].innerHTML += "<div id='next_button' class='nav_button' onclick='showBannerTip("+(i+1)+")'>NEXT></div>";
    $('#banner_nav')[0].innerHTML += "<div id='start_button' class='nav_button'>START</div>";
    //$('#banner_nav')[0].innerHTML += "<div id='tip_nav_right' class='nav_button' onclick='showBannerTip("+(i+1)+")'>-></div>";
    //$('#banner_nav')[0].innerHTML += "<br><div id='banner_register' class='nav_link' onclick='location.href=\"/auth/register\"'>register</div>";
    //$('#banner_nav')[0].innerHTML += "<br><div id='banner_login' class='nav_link' onclick='location.href=\"/auth/login\"'>login</div>";
    //$('#banner_nav')[0].innerHTML += "<br><div id='close_tips' class='nav_button'>X</div>";
    
    
    //if (i == 0) $('#tip_nav_left')[0].style.visibility = 'hidden';
    if (getTipKey(intro_library, i+1) == undefined) {
        //$('#tip_nav_right')[0].style.visibility = 'hidden';
        $('#next_button')[0].style.display = 'none';
    } else {
        $('#start_button')[0].style.display = 'none';
    }
    $('#close_tips').on('click',hideBannerTip);
    $('#start_button').on('click',hideBannerTip);
    $('#disable_tips').remove();
}

function hideBannerTip() {
    $('#veil').css('display', 'none');
}
