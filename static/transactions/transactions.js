$(document).ready(function() {
    var base_url = window.location.origin
    console.log('get cart test')
    console.log(base_url)
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        method: 'GET',
        url: base_url + '/cart/api/get_cart_products/'+id+ '/',
        beforeSend: function() {
            console.log('before cart send');
        },
        success: function(data) {
            console.log('cart get successful');
            console.log(data)

            $.each(data, function(index, cart) {
                console.log(cart.buyer)
                console.log(cart.product)
                if(cart.buyer == id) {
                    $.ajax({
                        method: 'GET',
                        url : base_url + '/market/api/get_productDetails/'+cart.product+ '/', 
                        beforeSend: function() {
                            console.log('before send');
                        },
                        success: function(product) {
                            displayCart(product.data,cart);
                            console.log(product.data.name);
                
                        },
                        error: function(error) {
                            console.log('sum ting wong get product detail', error);
                        }
                    });
                }
            })

        },
        error: function() {
            console.log('sum ting wong get cart');
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