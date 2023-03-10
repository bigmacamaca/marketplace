$(document).ready(function() {
    var base_url = window.location.origin
    console.log('test')
    console.log(base_url)
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        method: 'GET',
        url: base_url + '/market/api/get_wishlisted_products/'+id+ '/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayWishlist(data);
            console.log('Data get successful');
        },
        error: function() {
            console.log('sum ting wong get');
        }
    });
});

function displayWishlist(data) {
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {
        console.log(value)
        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ value.picture +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ value.name +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ value.seller +"</small></p>" +
                    "<p class='card-text'>"+ value.description +"</p>" +
                    "<p class='card-text'>₱"+ value.price +"</p>" +
                    "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +

                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"       
        

        
    });
    $('#wishlistDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}