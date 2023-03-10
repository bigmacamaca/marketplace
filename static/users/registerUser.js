$(document).ready(function() {
    var base_url = window.location.origin
    $('#registerUserForm').submit(function (event){
        event.preventDefault();
        console.log('test register user')
        formData = new FormData();

        formData.append('email', $('#email').val());
        formData.append('password', $('#password').val());
        formData.append('password2', $('#password2').val());
        formData.append('first_name', $('#first_name').val());
        formData.append('last_name', $('#last_name').val());
        formData.append('avatar', $('#avatar')[0].files[0]);

        if (formData) {
                $.ajax({
                    type: 'POST',
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    url: base_url + '/users/api/registerUser/',
                    
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function(response) {
                        window.location = base_url + '/users/home'
                        console.log('User created!');
                        console.log(response);
                    },
                    error: function() {
                        console.log('sum ting wong register user');
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

