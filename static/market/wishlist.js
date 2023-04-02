$(document).ready(function() {
    var base_url = window.location.origin
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
            data = "";
            displayWishlist(data);
            console.log('Error in get wishlist');
        }
    });
});

function displayWishlist(data) {
    var base_url = window.location.origin
    let template = "";

    if (data == null || data == "") {
        console.log("Wishlist is empty!")
        template += "<h3>Wishlist is empty! Add products to wishlist first!</h3>"
    }

    $.each(data, function(index, value) {
        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ value.picture +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ value.name +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ value.sName +"</small></p>" +
                    "<p class='card-text'>"+ value.description +"</p>" +
                    "<p class='card-text'>₱"+ value.price +"</p>" +
                    "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +

                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"       
        

        
    });
    $('#wishlistDisplay').append(template)
}