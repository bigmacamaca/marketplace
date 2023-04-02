$(document).ready(function() {
    var base_url = window.location.origin
    $('#changePasswordForm').submit(function (event){
        event.preventDefault();
        formData = new FormData();

        formData.append('old_password', $('#oldPassword').val());
        formData.append('new_password1', $('#newPassword1').val());
        formData.append('new_password2', $('#newPassword2').val());

        // Check if any form fields are empty
        var emptyFields = false;
        var invalidFields = false;

        if ($('#newPassword1').val().length < 8 && $('#newPassword1').val() != "") {
            console.log("Password is less than 8 characters!");
            $('#newPass1Error').html("Password is less than 8 characters!");
            invalidFields = true;
        }

        if ($('#newPassword2').val().length < 8 && $('#newPassword2').val() != "") {
            console.log("Password is less than 8 characters!");
            $('#newPass2Error').html("Password is less than 8 characters!");
            invalidFields = true;
        }

        if ($('#newPassword1').val() != $('#newPassword2').val()) {
            console.log("New passwords does not match!")
            $('#newPass1Error').html('New passwords does not match!');
            $('#newPass2Error').html('New passwords does not match!');
            invalidFields = true;
        }

        $('#changePasswordForm input, #changePasswordForm select').each(function() {
            if ($(this).val() == '') {
                $(this).addClass('is-invalid');
                $(this).next('.invalid-feedback').show();
                emptyFields = true;
            } else {
                $(this).removeClass('is-invalid');
                $(this).next('.invalid-feedback').hide();
            }
        });

        if (emptyFields || invalidFields) {
            return false;  // Prevent form submission if any fields are empty
        }

    

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
                        // Show the alert
                        $("#passwordSuccessAlert").show();
                        // Hide the alert after 2 seconds
                        setTimeout(function(){
                            $("#passwordSuccessAlert").fadeOut("slow");
                        }, 2000);

                        setTimeout(function(){
                            window.location = base_url + '/users/home'
                        }, 2000);

                    },
                    error: function() {
                        // Show the alert
                        $("#passwordFailAlert").show();
                        // Hide the alert after 2 seconds
                        setTimeout(function(){
                            $("#passwordFailAlert").fadeOut("slow");
                        }, 1000);
                        console.log('Error in change password');
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