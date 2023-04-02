//For Logging out user
$('#logoutLink').click(function (){
    var base_url = window.location.origin
    $.ajax({
        type: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url: base_url + '/users/api/logout/',
        data: {},
        success: function(response) {

            // Show the alert
            $("#logoutAlert").show();
            // Hide the alert after 2 seconds
            setTimeout(function(){
                $("#logoutAlert").fadeOut("slow");
            }, 1000);

            setTimeout(function(){
                window.location = base_url + '/users/home'
            }, 1000);

            
            console.log("Logged Out successfully!");
        },
        error: function() {
            console.log('Error in logout');
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