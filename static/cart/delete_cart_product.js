$(document).ready(function() {
    // Delete Cart Product
    $("#deleteCartProduct").click(function(event){
        // prodID = $('#deleteCartProduct').val();
        event.preventDefault();
        console.log('Delete Cart Product test')
        // console.log(prodID)
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
                window.location = base_url + '/users/home/'
                console.log('cart product deleted!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong delete cart product');
            }
        });
    });
});