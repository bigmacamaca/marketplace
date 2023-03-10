$(document).ready(function() {
    var base_url = window.location.origin
    $('#changePasswordForm').submit(function (event){
        event.preventDefault();
        console.log('changePasswordTest')
        formData = new FormData();

        formData.append('old_password', $('#oldPassword').val());
        formData.append('new_password1', $('#newPassword1').val());
        formData.append('new_password2', $('#newPassword2').val());
    

        if (formData) {
                $.ajax({
                    type: 'POST',
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    url: base_url + '/users/api/change_pass/',
                    
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function(response) {
                        window.location = base_url + '/users/home'
                        console.log('changed password successfully!');
                        console.log(response.token);
                        // console.log(response);
                    },
                    error: function() {
                        console.log('sum ting wong change password');
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