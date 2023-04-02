$(document).ready(function() {
    var base_url = window.location.origin
    $('#loginForm').submit(function (event){
        event.preventDefault();
        formData = new FormData();

        formData.append('email', $('#email').val());
        formData.append('password', $('#password').val());

        // Check if any form fields are empty
        var emptyFields = false;
        var invalidFields = false;

        // Regex for email validation
        var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
        var email = $("#email").val();

        
        if (!regex.test(email) && email !="") {
            console.log("Invalid email address!");
            $('#invalidEmailAlert').show();
            invalidFields = true;
        }

        $('#loginForm input, #loginForm select').each(function() {
            // Checks each field if its empty, display error
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
                    url: base_url + '/users/api/loginUser/',
                    
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function(response) {

                        // Show the alert
                        $("#loginSuccessAlert").show();
                        // Hide the alert after 2 seconds
                        setTimeout(function(){
                            $("#loginSuccessAlert").fadeOut("slow");
                        }, 1000);

                        //Waits for 1 second, since changing pages wont display the alert at all
                        setTimeout(function(){
                            window.location = base_url + '/users/home'
                        }, 1000);

                        
                        console.log('user logged in!');
                    },
                    error: function() {

                        // Show the alert
                        $("#loginFailAlert").show();
                        // Hide the alert after 2 seconds
                        setTimeout(function(){
                            $("#loginFailAlert").fadeOut("slow");
                        }, 1000);

                        console.log('Error in login');
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