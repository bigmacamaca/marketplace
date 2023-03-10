//For Logging out user
$('#logoutLink').click(function (){
    var base_url = window.location.origin
    console.log('Logout test')
    $.ajax({
        type: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url: base_url + '/users/api/logout/',
        data: {},
        success: function(response) {
            window.location = base_url + '/users/home'
            console.log("Logged Out successfully!");
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong logout');
        }
    });
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var csrftoken = getCookie('csrftoken');