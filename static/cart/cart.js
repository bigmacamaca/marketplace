$(document).ready(function() {
    var base_url = window.location.origin
    console.log('get cart test')
    console.log(base_url)
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    var total = 0

    $.ajax({
        method: 'GET',
        url: base_url + '/cart/api/get_cart_products/'+id+ '/',
        beforeSend: function() {
            console.log('before cart send');
        },
        success: function(data) {
            console.log('cart get successful');
            console.log(data)
            var totalPrice = 0;

            $.each(data, function(index, cart) {
                if(cart.buyer == id) {
                    console.count("each")
                    $.ajax({
                        method: 'GET',
                        url : base_url + '/market/api/get_productDetails/'+cart.product+ '/', 
                        beforeSend: function() {
                            console.log('before send');
                        },
                        success: function(product) {
                            console.log("monke")
                            totalPrice += parseFloat(product.data.price) * parseInt(cart.cart_quantity)
                            console.log(totalPrice)
                            displayCart(product.data,cart);
                            $('#totalPriceDisplay').html("TOTAL PRICE: ₱" + totalPrice)
                            
                        },
                        error: function(error) {
                            console.log('sum ting wong get product detail', error);
                        }
                    })
                }
            })
        },
        error: function() {
            console.log('sum ting wong get cart');
        }
    });
});


// Delete Cart Product
$("#deleteCartProduct").click(function(event){
    prodID = $('#deleteCartProduct').val();
    event.preventDefault();
    console.log('Delete Cart Product test')
    console.log(prodID)
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
            window.location = base_url + '/users/home/'
            console.log('cart product deleted!')
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong delete cart product');
        }
    });
});

// Checkout
$("#checkoutButton").click(function(event){
    userID = $('#checkoutButton').val();
    event.preventDefault();
    console.log('Checkout Product test')
    console.log(userID)
    var base_url = window.location.origin
    var urlid = window.location.pathname
    $.ajax({
        method: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/transaction/api/create_transaction/'+userID+'/', 

        success: function(response) {
            window.location = base_url + '/users/home/'
            console.log('Cart Checkout Successful!')
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong checkout product');
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
function displayCart(data,cart) {
    // console.log(data)
    totalPrice = 0;

    // totalPrice += parseFloat(data.price) * parseInt(cart.cart_quantity)
    // finalPrice += totalPrice
    // console.log(finalPrice)
    productID = data.id
    var base_url = window.location.origin
    let template = "";


        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ data.picture +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ data.name +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.seller +"</small></p>" +
                    "<p class='card-text'>"+ data.description +"</p>" +
                    "<p class='card-text'>₱"+ data.price +"</p>" +
                    "<p class='card-text'>Quantity: "+ cart.cart_quantity +"</p>" +
                    "<p class='card-text'>Total Price: ₱"+ data.price * cart.cart_quantity +"</p>" +
                    "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+data.id+" role='button'>View</a>" +
                    //CONTAINS THE DELETE BUTTON
                    // href="+base_url+"/cart/api/delete_cart_product/"+data.id+"
                    // "<a class='btn btn-danger' id='deleteCartProduct' href="+base_url+"/cart/api/delete_this_shit/"+data.id+" role='button' value="+data.id+">Delete</a>" +
                    // "<a class='btn btn-danger' id='deleteCartProduct' href="+base_url+"/cart/api/delete_cart_product/"+data.id+" role='button' value="+data.id+">Delete</a>" +
                    "<a class='btn btn-danger' href="+base_url+"/cart/cart/deleteCartConfirm/"+data.id+"/ role='button'>Delete</a>" +
                    // "<button type='button' class='btn btn-danger' id='deleteCartProduct' role='button' value="+data.id+">Delete</a>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"       
        



    $('#cartProductDisplay').append(template)
}