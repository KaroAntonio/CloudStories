//JS FILE HOLDING ALL JS FOR PRODUCTION

function increase_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
    
function inverse(hex) {
    if (hex.length != 7 || hex.indexOf('#') != 0) {
        return null;
    }
    var r = (255 - parseInt(hex.substring(1, 3), 16)).toString(16);
    var g = (255 - parseInt(hex.substring(3, 5), 16)).toString(16);
    var b = (255 - parseInt(hex.substring(5, 7), 16)).toString(16);
    var inverse = "#" + pad(r) + pad(g) + pad(b);

    return inverse
}
    
function pad(num) {
    if (num.length < 2) {
        return "0" + num;
    } else {
        return num;
    }
}

function set_cookie ( cookie_name, cookie_value, lifespan_in_days, valid_domain ) {
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=" + encodeURIComponent( cookie_value ) +
      "; max-age=" + 60 * 60 * 24 * lifespan_in_days +
      "; path=/" + domain_string ;
}
    
function is_cookie(cookie_name) {
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match ( cookie_name + '=([^;]*)' );
        return cookie_value != null;
    }
    return false;
}
    
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match ( cookie_name + '=([^;]*)' );
        return decodeURIComponent ( cookie_value[1] ) ;
    }
    return '' ;
}

/*
 countdown.js v2.6.0 http://countdownjs.org
 Copyright (c)2006-2014 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var module,countdown=function(v){function A(a,b){var c=a.getTime();a.setMonth(a.getMonth()+b);return Math.round((a.getTime()-c)/864E5)}function w(a){var b=a.getTime(),c=new Date(b);c.setMonth(a.getMonth()+1);return Math.round((c.getTime()-b)/864E5)}function x(a,b){b=b instanceof Date||null!==b&&isFinite(b)?new Date(+b):new Date;if(!a)return b;var c=+a.value||0;if(c)return b.setTime(b.getTime()+c),b;(c=+a.milliseconds||0)&&b.setMilliseconds(b.getMilliseconds()+c);(c=+a.seconds||0)&&b.setSeconds(b.getSeconds()+
c);(c=+a.minutes||0)&&b.setMinutes(b.getMinutes()+c);(c=+a.hours||0)&&b.setHours(b.getHours()+c);(c=+a.weeks||0)&&(c*=7);(c+=+a.days||0)&&b.setDate(b.getDate()+c);(c=+a.months||0)&&b.setMonth(b.getMonth()+c);(c=+a.millennia||0)&&(c*=10);(c+=+a.centuries||0)&&(c*=10);(c+=+a.decades||0)&&(c*=10);(c+=+a.years||0)&&b.setFullYear(b.getFullYear()+c);return b}function D(a,b){return y(a)+(1===a?p[b]:q[b])}function n(){}function k(a,b,c,e,l,d){0<=a[c]&&(b+=a[c],delete a[c]);b/=l;if(1>=b+1)return 0;if(0<=a[e]){a[e]=
+(a[e]+b).toFixed(d);switch(e){case "seconds":if(60!==a.seconds||isNaN(a.minutes))break;a.minutes++;a.seconds=0;case "minutes":if(60!==a.minutes||isNaN(a.hours))break;a.hours++;a.minutes=0;case "hours":if(24!==a.hours||isNaN(a.days))break;a.days++;a.hours=0;case "days":if(7!==a.days||isNaN(a.weeks))break;a.weeks++;a.days=0;case "weeks":if(a.weeks!==w(a.refMonth)/7||isNaN(a.months))break;a.months++;a.weeks=0;case "months":if(12!==a.months||isNaN(a.years))break;a.years++;a.months=0;case "years":if(10!==
a.years||isNaN(a.decades))break;a.decades++;a.years=0;case "decades":if(10!==a.decades||isNaN(a.centuries))break;a.centuries++;a.decades=0;case "centuries":if(10!==a.centuries||isNaN(a.millennia))break;a.millennia++;a.centuries=0}return 0}return b}function B(a,b,c,e,l,d){var f=new Date;a.start=b=b||f;a.end=c=c||f;a.units=e;a.value=c.getTime()-b.getTime();0>a.value&&(f=c,c=b,b=f);a.refMonth=new Date(b.getFullYear(),b.getMonth(),15,12,0,0);try{a.millennia=0;a.centuries=0;a.decades=0;a.years=c.getFullYear()-
b.getFullYear();a.months=c.getMonth()-b.getMonth();a.weeks=0;a.days=c.getDate()-b.getDate();a.hours=c.getHours()-b.getHours();a.minutes=c.getMinutes()-b.getMinutes();a.seconds=c.getSeconds()-b.getSeconds();a.milliseconds=c.getMilliseconds()-b.getMilliseconds();var g;0>a.milliseconds?(g=s(-a.milliseconds/1E3),a.seconds-=g,a.milliseconds+=1E3*g):1E3<=a.milliseconds&&(a.seconds+=m(a.milliseconds/1E3),a.milliseconds%=1E3);0>a.seconds?(g=s(-a.seconds/60),a.minutes-=g,a.seconds+=60*g):60<=a.seconds&&(a.minutes+=
m(a.seconds/60),a.seconds%=60);0>a.minutes?(g=s(-a.minutes/60),a.hours-=g,a.minutes+=60*g):60<=a.minutes&&(a.hours+=m(a.minutes/60),a.minutes%=60);0>a.hours?(g=s(-a.hours/24),a.days-=g,a.hours+=24*g):24<=a.hours&&(a.days+=m(a.hours/24),a.hours%=24);for(;0>a.days;)a.months--,a.days+=A(a.refMonth,1);7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7);0>a.months?(g=s(-a.months/12),a.years-=g,a.months+=12*g):12<=a.months&&(a.years+=m(a.months/12),a.months%=12);10<=a.years&&(a.decades+=m(a.years/10),a.years%=
10,10<=a.decades&&(a.centuries+=m(a.decades/10),a.decades%=10,10<=a.centuries&&(a.millennia+=m(a.centuries/10),a.centuries%=10)));b=0;!(e&1024)||b>=l?(a.centuries+=10*a.millennia,delete a.millennia):a.millennia&&b++;!(e&512)||b>=l?(a.decades+=10*a.centuries,delete a.centuries):a.centuries&&b++;!(e&256)||b>=l?(a.years+=10*a.decades,delete a.decades):a.decades&&b++;!(e&128)||b>=l?(a.months+=12*a.years,delete a.years):a.years&&b++;!(e&64)||b>=l?(a.months&&(a.days+=A(a.refMonth,a.months)),delete a.months,
7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7)):a.months&&b++;!(e&32)||b>=l?(a.days+=7*a.weeks,delete a.weeks):a.weeks&&b++;!(e&16)||b>=l?(a.hours+=24*a.days,delete a.days):a.days&&b++;!(e&8)||b>=l?(a.minutes+=60*a.hours,delete a.hours):a.hours&&b++;!(e&4)||b>=l?(a.seconds+=60*a.minutes,delete a.minutes):a.minutes&&b++;!(e&2)||b>=l?(a.milliseconds+=1E3*a.seconds,delete a.seconds):a.seconds&&b++;if(!(e&1)||b>=l){var h=k(a,0,"milliseconds","seconds",1E3,d);if(h&&(h=k(a,h,"seconds","minutes",60,d))&&(h=
k(a,h,"minutes","hours",60,d))&&(h=k(a,h,"hours","days",24,d))&&(h=k(a,h,"days","weeks",7,d))&&(h=k(a,h,"weeks","months",w(a.refMonth)/7,d))){e=h;var n,p=a.refMonth,q=p.getTime(),r=new Date(q);r.setFullYear(p.getFullYear()+1);n=Math.round((r.getTime()-q)/864E5);if(h=k(a,e,"months","years",n/w(a.refMonth),d))if(h=k(a,h,"years","decades",10,d))if(h=k(a,h,"decades","centuries",10,d))if(h=k(a,h,"centuries","millennia",10,d))throw Error("Fractional unit overflow");}}}finally{delete a.refMonth}return a}
function d(a,b,c,e,d){var f;c=+c||222;e=0<e?e:NaN;d=0<d?20>d?Math.round(d):20:0;var k=null;"function"===typeof a?(f=a,a=null):a instanceof Date||(null!==a&&isFinite(a)?a=new Date(+a):("object"===typeof k&&(k=a),a=null));var g=null;"function"===typeof b?(f=b,b=null):b instanceof Date||(null!==b&&isFinite(b)?b=new Date(+b):("object"===typeof b&&(g=b),b=null));k&&(a=x(k,b));g&&(b=x(g,a));if(!a&&!b)return new n;if(!f)return B(new n,a,b,c,e,d);var k=c&1?1E3/30:c&2?1E3:c&4?6E4:c&8?36E5:c&16?864E5:6048E5,
h,g=function(){f(B(new n,a,b,c,e,d),h)};g();return h=setInterval(g,k)}var s=Math.ceil,m=Math.floor,p,q,r,t,u,f,y,z;n.prototype.toString=function(a){var b=z(this),c=b.length;if(!c)return a?""+a:u;if(1===c)return b[0];a=r+b.pop();return b.join(t)+a};n.prototype.toHTML=function(a,b){a=a||"span";var c=z(this),e=c.length;if(!e)return(b=b||u)?"\x3c"+a+"\x3e"+b+"\x3c/"+a+"\x3e":b;for(var d=0;d<e;d++)c[d]="\x3c"+a+"\x3e"+c[d]+"\x3c/"+a+"\x3e";if(1===e)return c[0];e=r+c.pop();return c.join(t)+e};n.prototype.addTo=
function(a){return x(this,a)};z=function(a){var b=[],c=a.millennia;c&&b.push(f(c,10));(c=a.centuries)&&b.push(f(c,9));(c=a.decades)&&b.push(f(c,8));(c=a.years)&&b.push(f(c,7));(c=a.months)&&b.push(f(c,6));(c=a.weeks)&&b.push(f(c,5));(c=a.days)&&b.push(f(c,4));(c=a.hours)&&b.push(f(c,3));(c=a.minutes)&&b.push(f(c,2));(c=a.seconds)&&b.push(f(c,1));(c=a.milliseconds)&&b.push(f(c,0));return b};d.MILLISECONDS=1;d.SECONDS=2;d.MINUTES=4;d.HOURS=8;d.DAYS=16;d.WEEKS=32;d.MONTHS=64;d.YEARS=128;d.DECADES=256;
d.CENTURIES=512;d.MILLENNIA=1024;d.DEFAULTS=222;d.ALL=2047;var E=d.setFormat=function(a){if(a){if("singular"in a||"plural"in a){var b=a.singular||[];b.split&&(b=b.split("|"));var c=a.plural||[];c.split&&(c=c.split("|"));for(var d=0;10>=d;d++)p[d]=b[d]||p[d],q[d]=c[d]||q[d]}"string"===typeof a.last&&(r=a.last);"string"===typeof a.delim&&(t=a.delim);"string"===typeof a.empty&&(u=a.empty);"function"===typeof a.formatNumber&&(y=a.formatNumber);"function"===typeof a.formatter&&(f=a.formatter)}},C=d.resetFormat=
function(){p=" millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(";");q=" milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(";");r=" and ";t=", ";u="";y=function(a){return a};f=D};d.setLabels=function(a,b,c,d,f,k,m){E({singular:a,plural:b,last:c,delim:d,empty:f,formatNumber:k,formatter:m})};d.resetLabels=C;C();v&&v.exports?v.exports=d:"function"===typeof window.define&&"undefined"!==typeof window.define.amd&&
window.define("countdown",[],function(){return d});return d}(module);

function drawAll() {
    drawStoryLine();
    drawBranches();
    drawStats();
    //drawBackground();
    //drawTree();
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
        var bc = backColor
        if (branches[0].visits == 0)
            bc = maxBranchColor
        branchColorScale = d3.scale.linear()
            .range([bc, maxBranchColor ]) 
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

function colorLine(d, cs, line, parent) {
    if (parent[0].id == 'branches')
        line.style.color = cs(d.visits);
    else 
        line.style.color = cs(storyLine.indexOf(d));
}

function drawLine(d, cs, parent) {
    //Draw info
    var line_info = document.createElement("DIV");
    if (d.author_name != 'Anonymous' && d.author_name != undefined)
        line_info.innerHTML = "-" + d.author_name;
    line_info.id = 'info_' + d.id;
    line_info.className = 'info';
    if (debug) line_info.innerHTML += " : " + d.visits + "";
    
    //Draw Line
    var new_line = document.createElement("DIV");
    colorLine(d, cs, new_line, parent)
    
    new_line.id = 'line_' + d.id;
    new_line.className = 'line';
    new_line.innerHTML = d.line;
    
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

//DRAW A BACKGROUND USING P5.JS

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('background')
    //console.log(stringColor('moondrop', forwardColor))
}

function renderStoryShells() {
    //$('#story_line').css('background', '#fff')
    //$('.line').css('color', '#fff')
    background('#fff')
    var s = 50;
    for (var i = storyLine.length - 1; i >= 0; i--) {
        fill(stringColor(storyLine[i].line, forwardColor, 0.95))
        noStroke();
        ellipse(window.innerWidth/2, window.innerHeight/2, i*s, i*s)    
    }
}

function stringColor(w,c, s) {
    //returns a hexcode interpretation of a string
    var sum = 0;
    for (var i = 0; i < w.length; i++) {
        sum += w.charCodeAt(i) * i
    }
    if (sum < 1118481)
        sum+= 13118481
        //sum += parseInt(c.substring(1,6), 16);
    //Modulus the max value for a 6 digit hex
    return shadeColor(("#" + (sum%16777215).toString(16)), s)
}

//http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

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
    
    //Strip HTML Tags
    newLine = stripHTML(newLine);
    //Set Line
    $("#line").val(newLine);
    
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
    
    //Set Hidden Forms w Meta Data
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

//js object binding elements to their tip content
tip_library = {
    'default':{
        'title':'wrdcvlt',
        'content':'[wurd-kuhlt] noun<br>i. a branching story<br>ii. an obsessive group that tends lovingly to the tree<br><div id="tip_default" onclick="disableTips()">Turn off Tips</div>'
    },
    '.info':{
        'title':'Line Info',
        'content':'who wrote this'
    },
    '#branches':{
        'title':'The Branches',
        'content':'these are your options, the future, your posibilities<br>the top branch is the most popular<br>\'ENTER\' chooses the most popular branch<br>scroll for more options'
    },
    '#story_line':{
        'title':'The Story',
        'content':'this is the past, the words you\'ve already read<br>\'SHIFT\' moves you back up the story<br>Hold \'SHIFT\'+\'UP\' to fast rewind'
    },
    '#line_form':{
        'title':'The Next Line...',
        'content':'is yours to write'
    },
    '#user_stats':{
        'title':'Literary Stats',
        'content':'experience // readership // oeuvre <br>experience: is earned whenever you do anything <br>readership: the number of lines appreciated by individual people <br>oeuvre: the number of lines you\'ve written'
    },
    '#countdown':{
        'title':'Spread the cvlt',
        'content':'on kickstarter'
    },
}

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

function buildTree(stories, rootID) {
    //Starting at the root line, 
    //build a tree representation of the stories array
    var root = findLine(rootID);
    var unexplored = [root]
    if (root.parentID != "0") {
        var parent = findLine(root.parentID)
        parent.children = [root]
        root = parent
    }
    while(unexplored.length > 0) {
        var node = unexplored[0];
        unexplored.splice(0,1);
        node.children = findBranches(node.id);
        unexplored = unexplored.concat(node.children)
    }
    return root;
}

function initTree() {
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
    svg_width = width - margin.right - margin.left,
    svg_height = 800 - margin.top - margin.bottom;

    tree = d3.layout.tree()
        .size([height, width]);

    diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y + 10, d.x]; });

    $("#tree_container").empty()
    svg = d3.select("#tree_container").append("svg")
        .attr("width", svg_width + margin.right + margin.left)
        .attr("height", svg_height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
  root = buildTree(stories, get_cookie("last_line_id"));
  root.x0 = svg_height / 2;
  root.y0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  //root.children.forEach(collapse);
  update(root);
}

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);
    
  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++node_i ); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "#FFB2B2" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.line; })
        .attr("transform", "rotate(-5)" )
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "#FFB2B2" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
    clickStory(d)
  update(d);
}
