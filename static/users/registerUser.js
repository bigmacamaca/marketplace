$(document).ready(function() {
    var base_url = window.location.origin
    $('#registerUserForm').submit(function (event){
        event.preventDefault();
        formData = new FormData();

        formData.append('email', $('#email').val());
        formData.append('password', $('#password').val());
        formData.append('password2', $('#password2').val());
        formData.append('first_name', $('#first_name').val());
        formData.append('last_name', $('#last_name').val());

        //<---------FORM VALIDATIONS---------->

        // Check if any form fields are empty
        var emptyFields = false;
        var invalidFields = false;

        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Regex for email validation
        var nameRegex = /^[a-zA-Z. ]*$/; // Regex for name validation
        var email = $("#email").val();
        var fName = $("#first_name").val();
        var lName = $("#last_name").val();
        var avatar = $("#avatar").val();

        if ($('#password').val() != $('#password2').val()) {
            console.log("Passwords does not match!");
            $('#password1Error').html("Passwords does not match!");
            $('#password2Error').html("Passwords does not match!");
            var invalidFields = true;
        }

        if ($('#password').val().length < 8 && $('#password').val() != "") {
            console.log("Password is less than 8 characters!");
            $('#password1Error').html("Password is less than 8 characters!");
            invalidFields = true;
        }

        if ($('#password2').val().length < 8 && $('#password2').val() != "") {
            console.log("Password is less than 8 characters!");
            $('#password2Error').html("Password is less than 8 characters!");
            invalidFields = true;
        }

        if (!nameRegex.test(fName) && fName != "") {
            console.log("Invalid first name! Numbers or Special Characters are not allowed.");
            $('#fnameError').html("Invalid first name! Numbers or Special Characters are not allowed.");
            invalidFields = true;
        }

        if (!nameRegex.test(lName) && lName != "") {
            console.log("Invalid last name! Numbers or Special Characters are not allowed.");
            $('#lnameError').html("Invalid last name! Numbers or Special Characters are not allowed.");
            invalidFields = true;
        }

        if (!emailRegex.test(email) && email !="") {
            console.log("Invalid email address!");
            $('#emailError').html("Invalid Email!");
            invalidFields = true;
        }

        //If avatar has file, appends it, else it returns blank and use default
        // avatar picture instead.
        if (avatar) {
            formData.append('avatar', $('#avatar')[0].files[0]);
        }

        $('#registerUserForm input, #registerUserForm select').each(function() {
            if ($(this).attr('name') == 'avatar') {
                return true;
            }        
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

        //<---------AJAX CALL---------->

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
                        // Show the alert
                        $("#registerUserAlert").show();
                        // Hide the alert after 2 seconds
                        setTimeout(function(){
                            $("#registerUserAlert").fadeOut("slow");
                        }, 2000);

                        setTimeout(function(){
                            window.location = base_url + '/users/home'
                        }, 2000);

                        console.log('User created!');

                    },
                    error: function() {
                        // Show the alert
                        $("#registerUserFailAlert").show();
                        // Hide the alert after 2 seconds
                        setTimeout(function(){
                            $("#registerUserFailAlert").fadeOut("slow");
                        }, 2000);
                        console.log('Error in register user');
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

