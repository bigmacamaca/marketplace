$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    console.log('get user detail')
    console.log('url', base_url + '/users/api/get_userDetails/'+id)
    $.ajax({
        method: 'GET',
        url : base_url + '/users/api/get_userDetails/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            // displayBooks(data);
            console.log(data);
        },
        error: function(error) {
            console.log('sum ting wong get', error);
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
    console.log('test update Profile')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();

    formData.append('first_name', $('#first_name').val());
    formData.append('last_name', $('#last_name').val());

    if( document.getElementById("avatar").files.length >= 1 ){
        // console.log("no files selected");
        // formData.append('coverImage', $('#coverImage')[0].files[0]);
        formData.append('avatar', $('#avatar')[0].files[0]);
    }

    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/users/api/update_user/'+id+ '/', 
            // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {
                // displayBooks(data);
                window.location = base_url + '/users/home'
                console.log('profile modified!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong modify profile');
            }
        });
    }
});