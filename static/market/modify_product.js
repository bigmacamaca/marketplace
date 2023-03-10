$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    console.log('get book detail')
    console.log('url', base_url + '/books/api/get_bookDetails/'+id)
    $.ajax({
        method: 'GET',
        url : base_url + '/market/api/get_productDetails/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayProduct(data);
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

//Modify Book Ajax
$('#updateProductForm').submit(function (event){
    event.preventDefault();
    console.log('test update product')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();

    
    if(document.getElementById("name").value != '' ){
        // console.log("no name detected");
        formData.append('name', $('#name').val());
    }

    if(document.getElementById("description").value != '' ){
        // console.log("no description detected");
        formData.append('description', $('#description').val());
    }

    if(document.getElementById("picture").files.length >= 1 ){
        // console.log("no files selected");
        formData.append('picture', $('#picture')[0].files[0]);
    }

    if(document.getElementById("price").value != '' ){
        // console.log("no price detected");
        formData.append('price', $('#price').val());
    }

    if(document.getElementById("quantity").value != '' ){
        // console.log("no name detected");
        formData.append('quantity', $('#quantity').val());
    }

    if(document.getElementById("productType").value != '' ){
        // console.log("no productType selected");
        formData.append('productType', $('#productType').val());
    }

    if(document.getElementById("availabilty").value != '' ){
        console.log("no availability selected");
        formData.append('availabilty', $('#availabilty').val());
    }



    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/market/api/modify_product/'+id+ '/', 
            // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {
                // displayBooks(data);
                window.location = base_url + '/users/home'
                console.log('product modified!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong modify product');
            }
        });
    }
});

$("#deleteButton").click(function(event){
    event.preventDefault();
    console.log('Delete test')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        type: 'DELETE',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/books/api/delete_book/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

        success: function(response) {
            window.location = base_url + '/books/home'
            console.log('book deleted!')
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong delete book');
        }
    });
});

function displayProduct(data) {
    var base_url = window.location.origin
    let template = "";
        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ data.data.picture +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ data.data.name +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.data.seller +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.data.productType +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.data.description +"</small></p>" +
                    "<p class='card-text'>"+ data.data.price +"</p>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"

    $('#productDetailDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}
