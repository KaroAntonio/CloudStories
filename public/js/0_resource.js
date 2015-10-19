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
function createContext() {
    var n = new Array(1000)
    n[0] = "The sky";
    n[1] = "Everything and more";
    n[2] = "The clear star that is yesterday";
    n[3] = "Tomorrow";
    n[4] = "An old apple";
    n[5] = "Camouflage paint";
    n[6] = "A sound you heard";
    n[7] = "A setback of the heart";
    n[8] = "The body of mind";
    n[9] = "A classical composition";
    n[10] = "Another day";
    n[11] = "Chair number eleven";
    n[12] = "Nihilism";
    n[13] = "Tranquility";
    n[14] = "Wondrous awe";
    n[15] = "That memory we used to share";
    n[16] = "Nothing of importance";
    n[17] = "Clear water";
    n[18] = "Gasoline";
    n[19] = "Sixty-four";
    n[20] = "Nothingness";
    n[21] = "The flow of quizzes";
    n[22] = "An enigma";
    n[23] = "A wave loudly clashing against a long shoreline";
    n[24] = "Stupidity";
    n[25] = "Love";
    n[26] = "Sex";
    n[27] = "An idea";
    n[28] = "The last sentence you saw";
    n[29] = "The person you were before";
    n[30] = "A flailing monkey";
    n[31] = "Organisational culture";
    n[32] = "Trickery";
    n[33] = "A caring mother";
    n[34] = "A sickingly prodigous profile";
    n[35] = "A fly";
    n[36] = "Two-finger John";
    n[37] = "Sevenworm";
    n[38] = "Pinocchio";
    n[39] = "Lucky number slevin";
    n[40] = "A shooting star";
    n[41] = "Whiskey on the table";
    n[42] = "A cranky old lady";
    n[43] = "Stew and rum";
    n[44] = "Spam";
    n[45] = "Lonely Henry";
    n[46] = "Style";
    n[47] = "Fashion";
    n[48] = "A principal idea";
    n[49] = "Too long a stick";
    n[50] = "A glittering gem";
    n[51] = "That way";
    n[52] = "Significant understanding";
    n[53] = "Passion or serendipity";
    n[54] = "A late night";
    n[55] = "A stumbling first step";
    n[56] = "That stolen figurine";
    n[57] = "A token of gratitude";
    n[58] = "A small mercy";
    n[59] = "Utter nonsense";
    n[60] = "Colorful clay";
    n[61] = "Insignificance";
    n[62] = "The light at the end of the tunnel";
    n[63] = "The other side";
    n[64] = "Abstraction";
    n[65] = "Rock music";
    n[66] = "A passionate evening";
    n[67] = "A great silence";
    n[68] = "A river a thousand paces wide";
    n[69] = "The legend of the raven's roar";
    n[70] = "Enqoyism"

    var v = new Array(1000)
    v[0] = "is like a painted flower; it never wilts.";
    v[1] = "runs through everything.";
    v[2] = "is ever present.";
    v[3] = "lies ahead, what with the future yet to come.";
    v[4] = "approaches at high velocity!";
    v[5] = "is nonsensical, much like me.";
    v[6] = "likes to take a walk in the park.";
    v[7] = "is still not very coherent.";
    v[8] = "loves to love.";
    v[9] = "would die for a grapefruit!";
    v[10] = "sickens me.";
    v[11] = "has your skin crawling.";
    v[12] = "makes people shiver.";
    v[13] = "is always a pleasure.";
    v[14] = "could please even the most demanding follower of Freud.";
    v[15] = "slips on a banana peel.";
    v[16] = "is nothing at all?";
    v[17] = "doesn't like paying taxes.";
    v[18] = "would kindly inquire something about you.";
    v[19] = "is not yet ready to die.";
    v[20] = "is omni-present, much like candy.";
    v[21] = "is good for you.";
    v[22] = "does not make any sense.";
    v[23] = "gambles with lives, happiness, and even destiny itself!";
    v[24] = "would scare any linguist away.";
    v[25] = "sees the sun.";
    v[26] = "is running away.";
    v[27] = "jumps both ways.";
    v[28] = "can get both high and low.";
    v[29] = "tests the thesis that your theorem would unleash.";
    v[30] = "comes asking for bread.";
    v[31] = "is interdependant on the relatedness of motivation, subcultures, and management.";
    v[32] = "says hello.";
    v[33] = "tenderly sees to her child.";
    v[34] = "wants to go to hell.";
    v[35] = "is often pregnant.";
    v[36] = "is often one floor above you.";
    v[37] = "likes to have a shower in the morning.";
    v[38] = "wants to set things right.";
    v[39] = "tells the tale of towers.";
    v[40] = "stole the goods.";
    v[41] = "woke the prime minister.";
    v[42] = "shot the sheriff.";
    v[43] = "lay down on the riverbed.";
    v[44] = "asked you a question?";
    v[45] = "sat down once more.";
    v[46] = "shoots pineapples with a machinegun.";
    v[47] = "will take you to places you never expected not to visit!";
    v[48] = "revels in authority.";
    v[49] = "stands upon somebody else's legs.";
    v[50] = "visits Japan in the winter.";
    v[51] = "says goodbye to the shooter.";
    v[52] = "welcomes spring!";
    v[53] = "loves a good joke!";
    v[54] = "is a storyteller without equal.";
    v[55] = "rains heavily.";
    v[56] = "is like a summer breeze.";
    v[57] = "is f***ing cosmopolitan, having a trained assassin stay overnight, letting heartbreaking lies roll over us like a summer breeze.";
    v[58] = "wanted the TRUTH!";
    v[59] = "set a treehouse on fire.";
    v[60] = "bathes in sunlight.";
    v[61] = "has its world rocked by trees (or rocks).";
    v[62] = "ever stuns the onlooker.";
    v[63] = "brings both pleasure and pain.";
    v[64] = "takes the world for granted.";
    v[65] = "is not enough.";
    v[66] = "was always the second best.";
    v[67] = "is not all that great.";
    v[68] = "shakes beliefs widely held.";
    v[69] = "always strikes for the heart.";
    v[70] = "is belief in the interrelatedness of all things."

    var i1 = 0;
    var i2 = 0;

    var nx = 71;
    var vx = 71;
    var generatorContext = {
        i1 : i1,
        i2 : i2,
        nx : nx,
        vx : vx,
        n : n,
        v : v,
    }
    
    return generatorContext;
}

function generate(what, gc) {
    var gc = createContext();
    
	if(what == 1)
		gc.i1 = get_random(gc.nx);
	else if (what == 2)
		gc.i2 = get_random(gc.vx);
	else {
		gc.i1 = get_random(gc.nx);
		gc.i2 = get_random(gc.vx);
	}
    
	return gc.n[gc.i1] + " " + gc.v[gc.i2];
}

function qrand(n) {

        RandSeed = (RandMultiplier * RandSeed + RandIncrement) % 0x7fffffff

        return (RandSeed >> 16) % n

}



function qinit() {

        RandMultiplier = 0x015a4e35

        RandIncrement = 1



        // Initialize using the computer's date and time...

        var now = new Date()

        RandSeed = now.getTime() % 0xffffffff

        FirstSentence = 1

        FirstAmerica = 1

}



function GenRandomSentenceTemplate() {

        // code key:  

        //              0 = lone noun

        //              1 = noun phrase

        //              2 = transitive verb phrase (present tense, singular, third person)

        //              3 = conjunction

        //              4 = intransitive verb phrase

        //              5 = transitive verb phrase (infinitive, singular)

        //              6 = adjective

        //              7 = adverb

        var w = ""

        var n = 17

        var r = qrand(n+5)

        if ( r > n )            w = "1 2 1."

        else if ( r == 1 )      w = "1 2 1, 3 1 2 1."

        else if ( r == 2 )      w = "When 1 4, 1 4."

        else if ( r == 3 )      w = "If 1 2 1, then 1 4."

        else if ( r == 4 )      w = "Sometimes 1 4, but 1 always 2 1!"

        else if ( r == 5 )      w = "Most people believe that 1 2 1, but they need to remember how 7 1 4."

        else if ( r == 6 ) {

                if ( FirstAmerica ) {

                        FirstAmerica = 0

                        w = "1, 1, and 1 are what made America great!"

                } else {

                        w = "1 2 1."

                }

        }

        else if ( r == 7 )      w = "1 4, 3 1 2 1."

        else if ( r == 8 )      w = "Now and then, 1 2 1."

        else if ( r == 9 )      w = "1 4, and 1 4; however, 1 2 1."

        else if ( r == 10 ) {

                if ( FirstSentence ) {

                        w = "1 2 1."

                } else {

                        w = "Indeed, 1 2 1."

                }

        }

        else if ( r == 11 ) {

                if ( FirstSentence ) {

                        w = "1 2 1."

                } else {

                        w = "Furthermore, 1 4, and 1 2 1."

                }

        }

        else if ( r == 12 ) {

                if ( FirstSentence ) {

                        w = "1 2 1."

                } else {

                        w = "For example, 1 indicates that 1 2 1."

                }

        }

        else if ( r == 13 )     w = "When you see 1, it means that 1 4."

        else if ( r == 14 )     w = "Any 0 can 5 1, but it takes a real 0 to 5 1."

        else if ( r == 15 )     w = "1 is 6."

        else if ( r == 16 )     w = "When 1 is 6, 1 2 1."

        FirstSentence = 0

        return w

}





function GenNoun() {

        var n = 125

        var r = qrand(n)

        var w = ""

        if ( r == 0 )           w = "cocker spaniel"

        else if ( r == 1 )      w = "roller coaster"

        else if ( r == 2 )      w = "abstraction"

        else if ( r == 3 )      w = "pine cone"

        else if ( r == 4 )      w = "microscope"

        else if ( r == 5 )      w = "bottle of beer"

        else if ( r == 6 )      w = "bowling ball"

        else if ( r == 7 )      w = "grain of sand"

        else if ( r == 8 )      w = "wheelbarrow"

        else if ( r == 9 )      w = "pork chop"

        else if ( r == 10 )     w = "bullfrog"

        else if ( r == 11 )     w = "squid"

        else if ( r == 12 )     w = "tripod"

        else if ( r == 13 )     w = "girl scout"

        else if ( r == 14 )     w = "light bulb"

        else if ( r == 15 )     w = "hole puncher"

        else if ( r == 16 )     w = "carpet tack"

        else if ( r == 17 )     w = "submarine"

        else if ( r == 18 )     w = "diskette"

        else if ( r == 19 )     w = "tape recorder"

        else if ( r == 20 )     w = "anomaly"

        else if ( r == 21 )     w = "insurance agent"

        else if ( r == 22 )     w = "mortician"

        else if ( r == 23 )     w = "fire hydrant"

        else if ( r == 24 )     w = "photon"

        else if ( r == 25 )     w = "line dancer"

        else if ( r == 26 )     w = "paper napkin"

        else if ( r == 27 )     w = "stovepipe"

        else if ( r == 28 )     w = "graduated cylinder"

        else if ( r == 29 )     w = "hydrogen atom"

        else if ( r == 30 )     w = "garbage can"

        else if ( r == 31 )     w = "reactor"

        else if ( r == 32 )     w = "power drill"

        else if ( r == 33 )     w = "scooby snack"

        else if ( r == 34 )     w = "freight train"

        else if ( r == 35 )     w = "ocean"

        else if ( r == 36 )     w = "bartender"

        else if ( r == 37 )     w = "senator"

        else if ( r == 38 )     w = "mating ritual"

        else if ( r == 39 )     w = "briar patch"

        else if ( r == 40 )     w = "jersey cow"

        else if ( r == 41 )     w = "chain saw"

        else if ( r == 42 )     w = "prime minister"

        else if ( r == 43 )     w = "cargo bay"

        else if ( r == 44 )     w = "buzzard"

        else if ( r == 45 )     w = "polar bear"

        else if ( r == 46 )     w = "tomato"

        else if ( r == 47 )     w = "razor blade"

        else if ( r == 48 )     w = "ball bearing"

        else if ( r == 49 )     w = "fighter pilot"

        else if ( r == 50 )     w = "support group"

        else if ( r == 51 )     w = "fundraiser"

        else if ( r == 52 )     w = "cowboy"

        else if ( r == 53 )     w = "football team"

        else if ( r == 54 )     w = "cab driver"

        else if ( r == 55 )     w = "nation"

        else if ( r == 56 )     w = "ski lodge"

        else if ( r == 57 )     w = "mastadon"

        else if ( r == 58 )     w = "recliner"

        else if ( r == 59 )     w = "minivan"

        else if ( r == 60 )     w = "deficit"

        else if ( r == 61 )     w = "food stamp"

        else if ( r == 62 )     w = "wedding dress"

        else if ( r == 63 )     w = "fairy"

        else if ( r == 64 )     w = "globule"

        else if ( r == 65 )     w = "movie theater"

        else if ( r == 66 )     w = "tornado"

        else if ( r == 67 )     w = "rattlesnake"

        else if ( r == 68 )     w = "CEO"

        else if ( r == 69 )     w = "corporation"

        else if ( r == 70 )     w = "plaintiff"

        else if ( r == 71 )     w = "class action suit"

        else if ( r == 72 )     w = "judge"

        else if ( r == 73 )     w = "defendant"

        else if ( r == 74 )     w = "dust bunny"

        else if ( r == 75 )     w = "vacuum cleaner"

        else if ( r == 76 )     w = "lover"

        else if ( r == 77 )     w = "sandwich"

        else if ( r == 78 )     w = "hockey player"

        else if ( r == 79 )     w = "avocado pit"

        else if ( r == 80 )     w = "fruit cake"

        else if ( r == 81 )     w = "turkey"

        else if ( r == 82 )     w = "sheriff"

        else if ( r == 83 )     w = "apartment building"

        else if ( r == 84 )     w = "industrial complex"

        else if ( r == 85 )     w = "inferiority complex"

        else if ( r == 86 )     w = "salad dressing"

        else if ( r == 87 )     w = "short order cook"

        else if ( r == 88 )     w = "pig pen"

        else if ( r == 89 )     w = "grand piano"

        else if ( r == 90 )     w = "tuba player"

        else if ( r == 91 )     w = "traffic light"

        else if ( r == 92 )     w = "turn signal"

        else if ( r == 93 )     w = "paycheck"

        else if ( r == 94 )     w = "blood clot"

        else if ( r == 95 )     w = "earring"

        else if ( r == 96 )     w = "blithe spirit"

        else if ( r == 97 )     w = "customer"

        else if ( r == 98 )     w = "warranty"

        else if ( r == 99 )     w = "grizzly bear"

        else if ( r == 100 )    w = "cyprus mulch"

        else if ( r == 101 )    w = "pit viper"

        else if ( r == 102 )    w = "crank case"

        else if ( r == 103 )    w = "oil filter"

        else if ( r == 104 )    w = "steam engine"

        else if ( r == 105 )    w = "chestnut"

        else if ( r == 106 )    w = "chess board"

        else if ( r == 107 )    w = "pickup truck"

        else if ( r == 108 )    w = "cheese wheel"

        else if ( r == 109 )    w = "eggplant"

        else if ( r == 110 )    w = "umbrella"

        else if ( r == 111 )    w = "skyscraper"

        else if ( r == 112 )    w = "dolphin"

        else if ( r == 113 )    w = "asteroid"

        else if ( r == 114 )    w = "parking lot"

        else if ( r == 115 )    w = "demon"

        else if ( r == 116 )    w = "tabloid"

        else if ( r == 117 )    w = "particle accelerator"

        else if ( r == 118 )    w = "cloud formation"

        else if ( r == 119 )    w = "cashier"

        else if ( r == 120 )    w = "burglar"

        else if ( r == 121 )    w = "spider"

        else if ( r == 122 )    w = "cough syrup"

        else if ( r == 123 )    w = "satellite"

        else if ( r == 124 )    w = "scythe"

        return w

}





function GenPreposition() {

        var n = 14

        var r = qrand(n)

        var w = ""

        if ( r == 0 )           w = "of"

        else if ( r == 1 )      w = "from"

        else if ( r == 2 )      w = "near"

        else if ( r == 3 )      w = "about"

        else if ( r == 4 )      w = "around"

        else if ( r == 5 )      w = "for"

        else if ( r == 6 )      w = "toward"

        else if ( r == 7 )      w = "over"

        else if ( r == 8 )      w = "behind"

        else if ( r == 9 )      w = "beyond"

        else if ( r == 10 )     w = "related to"

        else if ( r == 11 )     w = "defined by"

        else if ( r == 12 )     w = "inside"

        else if ( r == 13 )     w = "living with"

        return w

}





function GenNounPhrase(depth) {

        var phraseKind = qrand(3)

        var s = ""

        if ( phraseKind == 0 || depth>0 ) {

                s = GenNoun()

        } else if ( phraseKind == 1 ) {

                s = GenAdjective() + " " + GenNoun()

        } else if ( phraseKind == 2 ) {

                s = GenNoun() + " " + GenPreposition() + " " + GenNounPhrase(depth+1)

        }

        var r = qrand(100)

        if ( r < 30 ) {

                s = "the " + s

        } else if ( r < 35 ) {

                s = "another " + s

        } else if ( r < 40 ) {

                s = "some " + s

        } else {

                var c = s.substring(0,1).toLowerCase()

                if ( (s.substring(0,8) != "Eurasian") && 

                 (c=='a' || c=='e' || c=='i' || c=='o' || c=='u') ) {

                        s = "an " + s

                } else {

                        s = "a " + s

                }

        }

        return s

}





function GenAdverb() {

        var n = 28

        var r = qrand(n)

        var s = ""

        if ( r == 0 )           s = "knowingly"

        else if ( r == 1 )      s = "slyly"

        else if ( r == 2 )      s = "greedily"

        else if ( r == 3 )      s = "hesitantly"

        else if ( r == 4 )      s = "secretly"

        else if ( r == 5 )      s = "carelessly"

        else if ( r == 6 )      s = "thoroughly"

        else if ( r == 7 )      s = "barely"

        else if ( r == 8 )      s = "ridiculously"

        else if ( r == 9 )      s = "non-chalantly"

        else if ( r == 10 )     s = "hardly"

        else if ( r == 11 )     s = "eagerly"

        else if ( r == 12 )     s = "feverishly"

        else if ( r == 13 )     s = "lazily"

        else if ( r == 14 )     s = "inexorably"

        else if ( r == 15 )     s = "accurately"

        else if ( r == 16 )     s = "accidentally"

        else if ( r == 17 )     s = "completely"

        else if ( r == 18 )     s = "usually"

        else if ( r == 19 )     s = "single-handledly"

        else if ( r == 20 )     s = "underhandedly"

        else if ( r == 21 )     s = "almost"

        else if ( r == 22 )     s = "wisely"

        else if ( r == 23 )     s = "ostensibly"

        else if ( r == 24 )     s = "somewhat"

        else if ( r == 25 )     s = "overwhelmingly"

        else if ( r == 26 )     s = "seldom"

        else if ( r == 27 )     s = "often"

        return s

}





function GenAdjective() {

        var n = 105

        var r = qrand(n)

        var w = ""

        if ( r == 0 )           w = "slow"

        else if ( r == 1 )      w = "surly"

        else if ( r == 2 )      w = "gentle"

        else if ( r == 3 )      w = "optimal"

        else if ( r == 4 )      w = "treacherous"

        else if ( r == 5 )      w = "loyal"

        else if ( r == 6 )      w = "smelly"

        else if ( r == 7 )      w = "ravishing"

        else if ( r == 8 )      w = "annoying"

        else if ( r == 9 )      w = "burly"

        else if ( r == 10 )     w = "raspy"

        else if ( r == 11 )     w = "moldy"

        else if ( r == 12 )     w = "blotched"

        else if ( r == 13 )     w = "federal"

        else if ( r == 14 )     w = "phony"

        else if ( r == 15 )     w = "magnificent"

        else if ( r == 16 )     w = "alleged"

        else if ( r == 17 )     w = "crispy"

        else if ( r == 18 )     w = "gratifying"

        else if ( r == 19 )     w = "elusive"

        else if ( r == 20 )     w = "revered"

        else if ( r == 21 )     w = "spartan"

        else if ( r == 22 )     w = "righteous"

        else if ( r == 23 )     w = "mysterious"

        else if ( r == 24 )     w = "worldly"

        else if ( r == 25 )     w = "cosmopolitan"

        else if ( r == 26 )     w = "college-educated"

        else if ( r == 27 )     w = "bohemian"

        else if ( r == 28 )     w = "statesmanlike"

        else if ( r == 29 )     w = "stoic"

        else if ( r == 30 )     w = "hypnotic"

        else if ( r == 31 )     w = "dirt-encrusted"

        else if ( r == 32 )     w = "purple"

        else if ( r == 33 )     w = "infected"

        else if ( r == 34 )     w = "shabby"

        else if ( r == 35 )     w = "tattered"

        else if ( r == 36 )     w = "South American"

        else if ( r == 37 )     w = "Alaskan"

        else if ( r == 38 )     w = "overripe"

        else if ( r == 39 )     w = "self-loathing"

        else if ( r == 40 )     w = "frustrating"

        else if ( r == 41 )     w = "rude"

        else if ( r == 42 )     w = "pompous"

        else if ( r == 43 )     w = "impromptu"

        else if ( r == 44 )     w = "makeshift"

        else if ( r == 45 )     w = "so-called"

        else if ( r == 46 )     w = "proverbial"

        else if ( r == 47 )     w = "molten"

        else if ( r == 48 )     w = "wrinkled"

        else if ( r == 49 )     w = "psychotic"

        else if ( r == 50 )     w = "foreign"

        else if ( r == 51 )     w = "familiar"

        else if ( r == 52 )     w = "pathetic"

        else if ( r == 53 )     w = "precise"

        else if ( r == 54 )     w = "moronic"

        else if ( r == 55 )     w = "polka-dotted"

        else if ( r == 56 )     w = "varigated"

        else if ( r == 57 )     w = "mean-spirited"

        else if ( r == 58 )     w = "false"

        else if ( r == 59 )     w = "linguistic"

        else if ( r == 60 )     w = "temporal"

        else if ( r == 61 )     w = "fractured"

        else if ( r == 62 )     w = "dreamlike"

        else if ( r == 63 )     w = "imaginative"

        else if ( r == 64 )     w = "cantankerous"

        else if ( r == 65 )     w = "obsequious"

        else if ( r == 66 )     w = "twisted"

        else if ( r == 67 )     w = "load bearing"

        else if ( r == 68 )     w = "orbiting"

        else if ( r == 69 )     w = "radioactive"

        else if ( r == 70 )     w = "unstable"

        else if ( r == 71 )     w = "outer"

        else if ( r == 72 )     w = "nearest"

        else if ( r == 73 )     w = "most difficult"

        else if ( r == 74 )     w = "Eurasian"

        else if ( r == 75 )     w = "hairy"

        else if ( r == 76 )     w = "flabby"

        else if ( r == 77 )     w = "soggy"

        else if ( r == 78 )     w = "muddy"

        else if ( r == 79 )     w = "salty"

        else if ( r == 80 )     w = "highly paid"

        else if ( r == 81 )     w = "greasy"

        else if ( r == 82 )     w = "fried"

        else if ( r == 83 )     w = "frozen"

        else if ( r == 84 )     w = "boiled"

        else if ( r == 85 )     w = "incinerated"

        else if ( r == 86 )     w = "vaporized"

        else if ( r == 87 )     w = "nuclear"

        else if ( r == 88 )     w = "paternal"

        else if ( r == 89 )     w = "childlike"

        else if ( r == 90 )     w = "feline"

        else if ( r == 91 )     w = "fat"

        else if ( r == 92 )     w = "skinny"

        else if ( r == 93 )     w = "green"

        else if ( r == 94 )     w = "financial"

        else if ( r == 95 )     w = "frightened"

        else if ( r == 96 )     w = "fashionable"

        else if ( r == 97 )     w = "resplendent"

        else if ( r == 98 )     w = "flatulent"

        else if ( r == 99 )     w = "mitochondrial"

        else if ( r == 100 )    w = "overpriced"

        else if ( r == 101 )    w = "snooty"

        else if ( r == 102 )    w = "self-actualized"

        else if ( r == 103 )    w = "miserly"

        else if ( r == 104 )    w = "geosynchronous"



        if ( qrand(10) > 7 ) {

                w = GenAdverb() + " " + w

        }



        return w

}



// 'tense' is one of the following:

//      0 = infinitive

//      1 = present tense, third person singular

function GenTransitiveVerbPhrase(tense) {

        var n = 56

        var r = qrand(n)

        var s = ""

        if ( r == 0 )           s = "eat$"

        else if ( r == 1 )      s = "conquer$"

        else if ( r == 2 )      s = "figure$ out"

        else if ( r == 3 )      s = "know$"

        else if ( r == 4 )      s = "teach*"

        else if ( r == 5 )      s = "require$ assistance from"

        else if ( r == 6 )      s = "pour$ freezing cold water on"

        else if ( r == 7 )      s = "find$ lice on"

        else if ( r == 8 )      s = "seek$"

        else if ( r == 9 )      s = "ignore$"

        else if ( r == 10 )     s = "dance$ with"

        else if ( r == 11 )     s = "recognize$"

        else if ( r == 12 )     s = "compete$ with"

        else if ( r == 13 )     s = "reach* an understanding with"

        else if ( r == 14 )     s = "negotiate$ a prenuptial agreement with"

        else if ( r == 15 )     s = "assimilate$"

        else if ( r == 16 )     s = "bestow$ great honor upon"

        else if ( r == 17 )     s = "derive$ perverse satisfaction from"

        else if ( r == 18 )     s = "steal$ pencils from"

        else if ( r == 19 )     s = "tr& to seduce"

        else if ( r == 20 )     s = "go* deep sea fishing with"

        else if ( r == 21 )     s = "find$ subtle faults with"

        else if ( r == 22 )     s = "laugh$ and drink$ all night with"

        else if ( r == 23 )     s = "befriend$"

        else if ( r == 24 )     s = "make$ a truce with"

        else if ( r == 25 )     s = "give$ secret financial aid to"

        else if ( r == 26 )     s = "brainwash*"

        else if ( r == 27 )     s = "trade$ baseball cards with"

        else if ( r == 28 )     s = "sell$ " + GenNounPhrase(0) + " to"

        else if ( r == 29 )     s = "caricature$"

        else if ( r == 30 )     s = "sanitize$"

        else if ( r == 31 )     s = "satiate$"

        else if ( r == 32 )     s = "organize$"

        else if ( r == 33 )     s = "graduate$ from"

        else if ( r == 34 )     s = "give$ lectures on morality to"

        else if ( r == 35 )     s = "^ a change of heart about"

        else if ( r == 36 )     s = "play$ pinochle with"

        else if ( r == 37 )     s = "give$ a pink slip to"

        else if ( r == 38 )     s = "share$ a shower with"

        else if ( r == 39 )     s = "buy$ an expensive gift for"

        else if ( r == 40 )     s = "cook$ cheese grits for"

        else if ( r == 41 )     s = "take$ a peek at"

        else if ( r == 42 )     s = "pee$ on"

        else if ( r == 43 )     s = "write$ a love letter to"

        else if ( r == 44 )     s = "fall$ in love with"

        else if ( r == 45 )     s = "avoid$ contact with"

        else if ( r == 46 )     s = ") a big fan of"

        else if ( r == 47 )     s = "secretly admire$"

        else if ( r == 48 )     s = "borrow$ money from"

        else if ( r == 49 )     s = "operate$ a small fruit stand with"

        else if ( r == 50 )     s = "throw$ " + GenNounPhrase(0) + " at"

        else if ( r == 51 )     s = "bur&"

        else if ( r == 52 )     s = "can be kind to"

        else if ( r == 53 )     s = "learn$ a hard lesson from"

        else if ( r == 54 )     s = "plan$ an escape from " + GenNounPhrase(0)

        else if ( r == 55 )     s = "make$ love to"



        vt = "" 

        var i

        for (i=0; i<s.length; i++ ) {

                var c = s.substring(i,i+1)      

                var w = c

                if ( c == '$' ) {

                        if ( tense == 0 )               w = ""

                        else if ( tense == 1 )  w = "s"

                } 

                else if ( c == '*' ) {

                        if ( tense == 0 )               w = ""

                        else if ( tense == 1 )  w = "es"

                }

                else if ( c == ')' ) {

                        if ( tense == 0 )               w = "be"

                        else if ( tense == 1 )  w = "is"

                }

                else if ( c == '^' ) {

                        if ( tense == 0 )               w = "have"

                        else if ( tense == 1 )  w = "has"

                }

                else if ( c == '&' ) {

                        if ( tense == 0 )               w = "y"

                        else if ( tense == 1 )  w = "ies"

                }

                vt += w

        }



        if ( qrand(10) < 3 ) {

                vt = GenAdverb() + " " + vt

        }



        return vt

}





function GenIntransitiveVerbPhrase() {

        var n = 28

        var r = qrand(n)

        var s = ""

        if ( r == 0 )           s = "leaves"

        else if ( r == 1 )      s = "goes to sleep"

        else if ( r == 2 )      s = "takes a coffee break"

        else if ( r == 3 )      s = "hibernates"

        else if ( r == 4 )      s = "reads a magazine"

        else if ( r == 5 )      s = "self-flagellates"

        else if ( r == 6 )      s = "meditates"

        else if ( r == 7 )      s = "starts reminiscing about lost glory"

        else if ( r == 8 )      s = "flies into a rage"

        else if ( r == 9 )      s = "earns frequent flier miles"

        else if ( r == 10 )     s = "sweeps the floor"

        else if ( r == 11 )     s = "feels nagging remorse"

        else if ( r == 12 )     s = "returns home"

        else if ( r == 13 )     s = "rejoices"

        else if ( r == 14 )     s = "prays"

        else if ( r == 15 )     s = "procrastinates"

        else if ( r == 16 )     s = "daydreams"

        else if ( r == 17 )     s = "ceases to exist"

        else if ( r == 18 )     s = "hides"

        else if ( r == 19 )     s = "panics"

        else if ( r == 20 )     s = "beams with joy"

        else if ( r == 21 )     s = "laughs out loud"

        else if ( r == 22 )     s = "gets stinking drunk"

        else if ( r == 23 )     s = "wakes up"

        else if ( r == 24 )     s = "hesitates"

        else if ( r == 25 )     s = "trembles"

        else if ( r == 26 )     s = "ruminates"

        else if ( r == 27 )     s = "dies"

        return s

}





function GenConjunction() {

        var n = 4

        var r = qrand(n)

        var s = ""

        if ( r == 0 )           s = "and"

        else if ( r == 1 )      s = "or"

        else if ( r == 2 )      s = "but"

        else if ( r == 3 )      s = "because"

        return s

}





function CapFirst(s) {

        return s.substring(0,1).toUpperCase() + s.substring(1,s.length)

}





function GenRandomSentence() {

        var stemp = GenRandomSentenceTemplate()

        var i

        var s = ""

        for ( i=0; i<stemp.length; i++ ) {

                var c = stemp.substring(i,i+1)

                var w = ""

                if      ( c == '0' )    w = GenNoun()

                else if ( c == '1' )    w = GenNounPhrase(0)

                else if ( c == '2' )    w = GenTransitiveVerbPhrase(1)

                else if ( c == '3' )    w = GenConjunction()

                else if ( c == '4' )    w = GenIntransitiveVerbPhrase()

                else if ( c == '5' )    w = GenTransitiveVerbPhrase(0)

                else if ( c == '6' )    w = GenAdjective()

                else if ( c == '7' )    w = GenAdverb()

                else                            w = c

                s += w

        }

        return CapFirst(s)

}//Helper Functions
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
            requestSubtree(d.id, subtree_depth);
        } else {
            $("#line").val(d.line);
            submitForm();
        }
    }
}

function suggestLine() {
    //Suggest a random, or a hopefully contextual line
    var generators = [
        function() { return generate(); },
        function() { qinit(); return GenRandomSentence() },
    ]
    
    var s = generators[get_random(generators.length - 1)]()
    
    $("#line").val(s);
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
        if (branches != 0) {
            clickStory(branches[0])
        } 
        if (document.activeElement.name == 'line')
            $("#line").blur();
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
    
    $('#banner_nav')[0].innerHTML += "<div id='banner_register' class='words_link auth_button' onclick='location.href=\"/auth/register\"'><a class='auth_button'>NEW<a></div>";
    $('#banner_nav')[0].innerHTML += "<div id='banner_login' class='words_link auth_button' onclick='location.href=\"/auth/login\"'><a class='auth_button'>RETURN<a></div>";
    
    $('#banner_nav')[0].innerHTML += "<div id='next_button' class='nav_button' onclick='showBannerTip("+(i+1)+")'>NEXT\></div>";
    $('#banner_nav')[0].innerHTML += "<div id='start_button' class='regular_button'>LATER</div>";
    
    //$('#banner_nav')[0].innerHTML += "<div id='tip_nav_right' class='nav_button' onclick='showBannerTip("+(i+1)+")'>-></div>";
    //$('#banner_nav')[0].innerHTML += "<br><div id='banner_register' class='nav_link' onclick='location.href=\"/auth/register\"'>register</div>";
    //$('#banner_nav')[0].innerHTML += "<br><div id='banner_login' class='nav_link' onclick='location.href=\"/auth/login\"'>login</div>";
    //$('#banner_nav')[0].innerHTML += "<br><div id='close_tips' class='nav_button'>X</div>";
    
    if (getTipKey(intro_library, i+1) == undefined) {
        //$('#tip_nav_right')[0].style.visibility = 'hidden';
        //window.location.href = "/auth/register";
        $('#next_button')[0].style.display = 'none';
        //$('#banner_register')[0].style.display = 'none';
        $('#start_button')[0].style.display = 'none';
    } else {
        //$('#banner_register')[0].style.display = 'none';
        $('#start_button')[0].style.display = 'none';
    }
    $('#close_tips').on('click',hideBannerTip);
    $('#start_button').on('click',hideBannerTip);
    $('#disable_tips').remove();
}

function hideBannerTip() {
    $('#veil').css('display', 'none');
    set_cookie( "banner_enabled", false, 200 );
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
function drawAll() {
    drawStoryLine();
    drawBranches();
    drawStats();
    //drawBackground();
    if (enableTree) drawTree();
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

//js objects binding elements to their tip content
tip_library = {
    'default':{
        'title':'wrdcvlt',
        'content':"<div id='banner_register' class='words_link' onclick='location.href=\"/auth/register\"'><a class='big_button'>REGISTER<a></div><div id='disable_tips' class='regular_button' onclick='disableTips()'>Turn off Tips</div>"
    },
    '#story_line':{
        'title':'The Story',
        'content':'this is the past, the words you\'ve already read<br>\'SHIFT\' moves you back up the story<br>Hold \'SHIFT\'+\'UP\' to fast rewind'
    },
    '#branches':{
        'title':'The Branches',
        'content':'these are your options, the future, your posibilities<br>the top branch is the most popular<br>\'ENTER\' chooses the most popular branch<br>scroll for more options'
    },
    '.info':{
        'title':'Line Info',
        'content':'who wrote this'
    },
    '#line_form':{
        'title':'The Next Line...',
        'content':'is yours to write<br>\'ENTER\' to submit your words'
    },
    '#user_stats':{
        'title':'Literary Stats',
        'content':'experience // readership // oeuvre <br>experience: is earned whenever you do anything <br>readership: the number of lines read x the number of people who read them <br>oeuvre: the number of lines you\'ve written'
    },
    '#countdown':{
        'title':'Spread the cvlt',
        'content':'on kickstarter'
    },
    '#suggest_line_button':{
        'title':'Get a Suggestion',
        'content':'summon the forces of [the internet] to craft a line'
    },
}

intro_library = {
    'title':{
        'title':'wrdcvlt',
        'content':'[wurd-kuhlt] noun<br>i. a branching story tree<br>ii. an obsessive group that tends lovingly to said tree<br><div id="disable_tips" class="nav_button" onclick="disableTips()">Turn off Tips</div>'
    },
    'read':{
        'title':'Read',
        'content':'the story by choosing each line, <br>(it\'s like a choose your own adventure) <br>\'ENTER\' chooses the most popular branch'
    },
    'write':{
        'title':'Write',
        'content':'the story from any line,<br>growing a new branch'
    },
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
