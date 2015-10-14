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
