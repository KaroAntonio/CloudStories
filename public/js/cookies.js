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
