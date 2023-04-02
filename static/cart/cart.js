$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    $.ajax({
        method: 'GET',
        url: base_url + '/cart/api/get_cart_products/'+id+ '/',
        beforeSend: function() {
            console.log('before cart send');
        },
        success: function(data) {
            displayCart(data);
            console.log('cart get successful');
        },
        error: function() {
            data = "";
            displayCart(data);
            console.log('Error in get cart');
        }
    });
});




// Delete Cart Product
$("#deleteCartProduct").click(function(event){
    prodID = $('#deleteCartProduct').val();
    event.preventDefault();
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        type: 'DELETE',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/cart/api/delete_cart_product/'+id+'/', 

        success: function(response) {
            // Show the alert
            $("#deleteCartProdAlert").show();
            // Hide the alert after 2 seconds
            setTimeout(function(){
                $("#deleteCartProdAlert").fadeOut("slow");
            }, 1000);

            setTimeout(function(){
                window.location = base_url + '/cart/view-cart/'+userID+'/'
            }, 1000);
        },
        error: function() {
            console.log('Error in delete cart product');
        }
    });
});

// Checkout
$("#checkoutButton").click(function(event){
    userID = $('#checkoutButton').val();
    event.preventDefault();
    var base_url = window.location.origin
    var urlid = window.location.pathname
    $.ajax({
        method: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/transaction/api/create_transaction/'+userID+'/', 

        success: function(response) {

            // Show the alert
            $("#checkoutAlert").show();
            // Hide the alert after 2 seconds
            setTimeout(function(){
                $("#checkoutAlert").fadeOut("slow");
            }, 1000);

            setTimeout(function(){
                window.location = base_url + '/cart/view-cart/'+userID+'/'
            }, 1000);

            console.log('Cart Checkout Successful!')
        },
        error: function() {
            console.log('Error in checkout product');
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

var finalPrice = 0;



//append cart products to html
function displayCart(data) {

    productID = data.id
    var base_url = window.location.origin
    let template = "";

    if (data == null || data == "") {
        console.log("Cart is empty!")
        template += "<h3>Cart is empty! Add products to cart!</h3>"
        $("#checkoutButton").hide();
    }

    $.each(data, function(index, value) {

            template += 

            "<div class='card mb-3' style='max-width: 540px;'>" +
            "<div class='row no-gutters'>" +
                "<div class='col-md-4'>" +
                    "<img src= "+ value.cartP_image +" class='card-img'>" +
                "</div>" +
                "<div class='col-md-8'>" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>"+ value.cartP_name +"</h5>" +
                        "<p class='card-text'><small class='text-muted'>"+ value.cartP_seller +"</small></p>" +
                        "<p class='card-text'>"+ value.cartP_desc +"</p>" +
                        "<p class='card-text'>₱"+ value.cartP_price +"</p>" +
                        "<p class='card-text'>Quantity: "+ value.cart_quantity +"</p>" +
                        "<p class='card-text'>Total Price: ₱"+ value.cartP_price * value.cart_quantity +"</p>" +
                        "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.cartP_id+" role='button'>View</a>" +
                        //CONTAINS THE DELETE BUTTON
                        "<a class='btn btn-danger' href="+base_url+"/cart/view-cart/delete-cart-prod-confirm/"+value.cartP_id+"/ role='button'>Delete</a>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>"       
        
    });


    $('#cartProductDisplay').append(template)
}