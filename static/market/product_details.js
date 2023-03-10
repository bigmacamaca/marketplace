$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    console.log('get product detail')
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
            console.log('sum ting wong get product detail', error);
        }
    });
    $.ajax({
        method: 'GET',
        url : base_url + '/market/api/get_book_comments/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
        beforeSend: function() {
            console.log('before get comments');
        },
        success: function(commentsData) {
            // let data = commentsData;
            displayComments(commentsData);
            console.log(commentsData);
        },
        error: function(error) {
            console.log('sum ting wong get comments', error);
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


//Add Comment
$('#CommentForm').submit(function (event){
    event.preventDefault();
    console.log('test add Comment')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();


    formData.append('body', $('#body').val());

    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/books/api/add_comment/'+id+ '/', 
            // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {
                // displayBooks(data);
                window.location = base_url + '/books/bookDetails/'+id+'/'
                console.log('Comment Added!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong add comment');
            }
        });
    }
});



// Delete Product
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
        url : base_url + '/market/api/delete_product/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

        success: function(response) {
            window.location = base_url + '/users/home'
            console.log('product deleted!')
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong delete Product');
        }
    });
});


function displayProduct(data) {
    var base_url = window.location.origin
    wish = data.wishlisted
    console.log(wish)
    //template: add to wishlist button
    let template = "";
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.seller +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +
                                "<a href="+base_url+"/market/modify_product/"+data.data.id+" class='btn btn-primary btn-rounded'>Update Product</a>" +
                                //add to wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-primary btn-sm'>Wishlist</button>" +
                                //add to cart button
                                "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#addCartModal'>Add to Cart</button>" +
                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: "+data.data.price+" </li>" +
                               "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    //template 2: remove from wishlist button
    let template2 = "";
        template2 += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.seller +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +
                                "<a href="+base_url+"/market/modify_product/"+data.data.id+" class='btn btn-primary btn-rounded'>Update Product</a>" +
                                //remove from wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-danger btn-sm'>Remove from Wishlist</button>" +
                                //add to cart button
                                "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#addCartModal'>Add to Cart</button>" +
                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: "+data.data.price+" </li>" +
                               "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    
    if (wish == true)
        $('#productDetailDisplay').append(template2)
    else
        $('#productDetailDisplay').append(template)
    console.log(template)
}

// Wishlist Product
function wishlist(){
    console.log('wishlist test')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        type: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/market/api/wishlist_product/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

        success: function(response) {
            window.location = base_url + '/market/productDetails/'+id+'/'
            console.log('product wishlisted!')
            console.log(response);
        },
        error: function() {
            console.log('sum ting wong wishlist product');
        }
    });
};

// var userid = $("#userID").text()
// console.log(userid)
// var total_quantity
// $('#addCartForm').submit(function (event){
//     event.preventDefault()

//     // var base_url = window.location.origin
//     // var urlid = window.location.pathname

//     var cart
//     var user_cart


//     var add_qty = $("#quantity").val()

//     $.ajax({
//         method: 'GET',
//         url: base_url + '/cart/api/get_cart_products/'+userid+ '/',
//         beforeSend: function() {
//             console.log('before cart get');
//         },
//         success: function(data) {
//             // displayCartList(data);
//             console.log('cart get successful');
//             console.log(data)

//             $.each(data, function(index, cart) {
//                 cartId = cart.id
//                 console.log(cart.buyer)
//                 console.log(cart.product)
//                 if(cart.buyer == id) {
//                     $.ajax({
//                         method: 'GET',
//                         url : base_url + '/market/api/get_productDetails/'+cart.product+ '/', 
//                         // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
//                         beforeSend: function() {
//                             console.log('before send');
//                         },
//                         success: function(data) {
//                             addToCart(data);            
//                         },
//                         error: function(error) {
//                             console.log('sum ting wong get product detail', error);
//                         }
//                     });
//                 }
//             })

//         },
//         error: function() {
//             console.log('sum ting wong get cart');
//         }
//     });
// });

// function addToCart(data) {
//     // var cartId = data.cart.id
//     // total_quantity = cart.cart_quantity + add_qty




// }

// Add to cart Product
$('#addCartForm').submit(function (event){
    console.log('cart test')
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    event.preventDefault();
    formData = new FormData();

    formData.append('cart_quantity', $('#cart_quantity').val());
    formData.append('product', id);

    if(formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/cart/api/addto_cart/'+id+ '/', 
            // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

            data: formData,
            processData: false,
            contentType: false,
            
            success: function(response) {
                window.location = base_url + '/market/productDetails/'+id+'/'
                console.log('product added to cart!')
                console.log(response);
            },
            error: function() {
                console.log('sum ting wong add to cart');
            }
        });
    }
});

function displayComments(commentsData) {
    var base_url = window.location.origin
    let template = "";
    $.each(commentsData, function(index, value) {
        template += 

        "<article class='media'>" +
        "<div class='media-content'>" +
            "<div class='content'>" +
                "<p>" +
                    "<strong>"+ value.author + " </strong> <small>"+ value.date_added +"</small>" +
                    "<br>" +
                    "<p>"+ value.body +"</p>" +
                "</p>" +
            "</div>" +
        "</div>" +
    "</article>"
    });      
    $('#commentsDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}


{/* <div class="modal fade" id="addcartmodal" tabindex="-1" role="dialog" aria-labelledby="AddToCartModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add to Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Quantity:</label>
                <input type="number" class="form-control" id="quantity"></input>
            </div>
            </form>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Add to Cart</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
</div> */}