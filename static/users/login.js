$(document).ready(function() {
    var base_url = window.location.origin
    $('#loginForm').submit(function (event){
        event.preventDefault();
        console.log('loginUser')
        formData = new FormData();

        formData.append('email', $('#email').val());
        formData.append('password', $('#password').val());
    

        if (formData) {
                $.ajax({
                    type: 'POST',
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    url: base_url + '/users/api/loginUser/',
                    
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function(response) {
                        window.location = base_url + '/users/home'
                        console.log('user logged in!');
                        console.log(response.token);
                        // console.log(response);
                    },
                    error: function() {
                        console.log('sum ting wong login');
                    }
            });
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