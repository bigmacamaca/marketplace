$(document).ready(function() {
    var base_url = window.location.origin
    $.ajax({
        method: 'GET',
        url: base_url + '/users/api/list_sellers/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displaySellers(data);
            console.log('seller list get successful');
        },
        error: function() {
            console.log('Error in get seller list');
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

function displaySellers(data) {
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {
        template += 
        "<div class='col-md-6 mb-4'>" +
        "<div class='card h-100'>" + 
            "<div class='card-body'>" + 
                "<div class='d-flex align-items-center'>" +
                    "<div class='image'>" +
                        "<img src=" + value.avatar + " class='rounded img-fluid' width='155'></img>" +
                    "</div>" +
    
                    "<div class='ms-3 w-100'>" + 
                        "<h4 class='mb-0 mt-0'>" + value.first_name + " " + value.last_name +"</h4>"+
                        "<div class='mt-2 d-flex flex-row align-items-center'>" +
                            "<a href="+base_url+"/users/profile/"+value.id+" class='btn btn-sm btn-outline-primary'>View Profile</a>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>";
     


    });
    $('#SellerListDisplay').prepend(template)
}