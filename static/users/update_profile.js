$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        method: 'GET',
        url : base_url + '/users/api/get_userDetails/'+id+ '/', 
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {

        },
        error: function(error) {
            console.log('Error in get', error);
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

//Modify Product Ajax
$('#profileUpdateForm').submit(function (event){
    event.preventDefault();
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();

    formData.append('first_name', $('#first_name').val());
    formData.append('last_name', $('#last_name').val());

    if( document.getElementById("avatar").files.length >= 1 ){
        formData.append('avatar', $('#avatar')[0].files[0]);
    }

    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/users/api/update_user/'+id+ '/', 

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {
                // Show the alert
                $("#profileUpdateSuccessAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#profileUpdateSuccessAlert").fadeOut("slow");
                }, 1000);

                setTimeout(function(){
                    window.location = base_url + '/users/profile/'+id+'/'
                }, 1000);

                console.log('profile modified!')

            },
            error: function() {

                // Show the alert
                $("#profileUpdateFailAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#profileUpdateFailAlert").fadeOut("slow");
                }, 1000);

                setTimeout(function(){
                    window.location = base_url + '/users/profile/'+id+'/'
                }, 1000);

                console.log('Error in modify profile');
            }
        });
    }
});