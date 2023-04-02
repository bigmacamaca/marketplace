$(document).ready(function() {
    // Delete Cart Product
    $("#deleteCartProduct").click(function(event){
        event.preventDefault();
        var base_url = window.location.origin
        var urlid = window.location.pathname
        var id = urlid.split("/")[4]
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
                    window.location = base_url + '/users/home/'
                }, 1000);

                
                console.log('cart product deleted!')
            },
            error: function() {
                console.log('Error in delete cart product');
            }
        });
    });
});