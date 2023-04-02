$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        method: 'GET',
        url : base_url + '/market/api/get_productDetails/'+id+ '/', 
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayProduct(data);
            $('#ProductTitle').html(data.data.name);
            wishStatus = data.wishlisted;

        },
        error: function(error) {
            console.log('Error in get product detail', error);
        }
    });
    // //get comments
    // $.ajax({
    //     method: 'GET',
    //     url : base_url + '/market/api/get_book_comments/'+id+ '/', 
    //     // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
    //     beforeSend: function() {
    //         console.log('before get comments');
    //     },
    //     success: function(commentsData) {
    //         // let data = commentsData;
    //         displayComments(commentsData);
    //         console.log(commentsData);
    //     },
    //     error: function(error) {
    //         console.log('Error in get comments', error);
    //     }
    // });
});

var wishStatus = false; 

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
// $('#CommentForm').submit(function (event){
//     event.preventDefault();
//     console.log('test add Comment')
//     var base_url = window.location.origin
//     var urlid = window.location.pathname
//     var id = urlid.split("/")[3]

//     formData = new FormData();


//     formData.append('body', $('#body').val());

//     if (formData) {
//         $.ajax({
//             type: 'POST',
//             beforeSend: function(xhr, settings) {
//                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             },
//             url : base_url + '/books/api/add_comment/'+id+ '/', 
//             // url: 'http://127.0.0.1:8000/api/modify_book/<int:book_id>/',

//             data: formData,
//             processData: false,
//             contentType: false,

//             success: function(response) {
//                 // displayBooks(data);
//                 window.location = base_url + '/books/bookDetails/'+id+'/'
//                 console.log('Comment Added!')
//                 console.log(response);
//             },
//             error: function() {
//                 console.log('Error in add comment');
//             }
//         });
//     }
// });


// Delete Product
function deleteProduct(){
    event.preventDefault();
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        type: 'DELETE',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/market/api/delete_product/'+id+ '/', 

        success: function(response) {

            // Show the alert
            $("#deleteProdAlert").show();
            // Hide the alert after 2 seconds
            setTimeout(function(){
                $("#deleteProdAlert").fadeOut("slow");
            }, 1000);

            setTimeout(function(){
                window.location = base_url + '/users/home'
            }, 1000);

            console.log('product deleted!')

        },
        error: function() {
            console.log('Error in delete Product');
        }
    });
};

var userid = $("#userID").text()
function displayProduct(data) {
    var base_url = window.location.origin;
    seller = data.data.seller;
    availability = data.data.availability;
    wish = data.wishlisted;

    let template = "";
    //If user owner of product
    if (userid == seller && userid != "None" && wish == false && availability == "Available") {
        //template: add to wishlist button, update product, show add cart
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +

                                //Edit Product button
                                "<a href="+base_url+"/market/modify_product/"+data.data.id+" class='btn btn-primary btn-rounded me-2'>Update Product</a>" +

                                //Delete Product Button
                                "<button type='button'  onclick='deleteProduct()', class='btn btn-danger btn-rounded me-2' id='deleteButton'>Delete Product</button>" +

                                //add to wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-primary btn-rounded me-2'>Wishlist</button>" +

                                //add to cart button
                                "<button type='button' class='btn btn-primary btn-rounded me-2' data-bs-toggle='modal' data-bs-target='#addCartModal'>Add to Cart</button>" +

                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: ₱"+data.data.price+" </li>" +
                                    "<li>In Stock: "+data.data.quantity+" </li>" +
                                    "<li>Status: "+availability+" </li>" +
                            "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    }

    if (userid == seller && userid != "None" && wish == false && availability == "Unavailable") {
        //template: add to wishlist button, update product, disable add cart
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +

                                //Edit Product button
                                "<a href="+base_url+"/market/modify_product/"+data.data.id+" class='btn btn-primary btn-rounded me-2'>Update Product</a>" +

                                //Delete Product Button
                                "<button type='button'  onclick='deleteProduct()', class='btn btn-danger btn-rounded me-2' id='deleteButton'>Delete Product</button>" +

                                //add to wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-primary btn-rounded me-2'>Wishlist</button>" +

                                //add to cart button
                                "<button type='button' class='btn btn-primary btn-rounded me-2' disabled>Add to Cart</button>" +

                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: ₱"+data.data.price+" </li>" +
                                    "<li>In Stock: "+data.data.quantity+" </li>" +
                                    "<li>Status: "+availability+" </li>" +
                            "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    }

    if (userid == seller && userid != "None" && wish == true && availability == "Available") {
        //remove from wishlist button
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +

                                //Update Product
                                "<a href="+base_url+"/market/modify_product/"+data.data.id+" class='btn btn-primary btn-rounded me-2'>Update Product</a>" +

                                //Delete Product Button
                                "<button type='button'  onclick='deleteProduct()', class='btn btn-danger btn-rounded me-2' id='deleteButton'>Delete Product</button>" +

                                //remove from wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-danger btn-rounded me-2'>Remove from Wishlist</button>" +

                                //add to cart button
                                "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#addCartModal'>Add to Cart</button>" +
                                
                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: ₱"+data.data.price+" </li>" +
                                    "<li>In Stock: "+data.data.quantity+" </li>" +
                                    "<li>Status: "+availability+" </li>" +
                            "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    }

    if (userid == seller && userid != "None" && wish == true && availability == "Unavailable") {
        //remove from wishlist button
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +

                                //Update Product
                                "<a href="+base_url+"/market/modify_product/"+data.data.id+" class='btn btn-primary btn-rounded me-2'>Update Product</a>" +

                                //Delete Product Button
                                "<button type='button'  onclick='deleteProduct()', class='btn btn-danger btn-rounded me-2' id='deleteButton'>Delete Product</button>" +

                                //remove from wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-danger btn-rounded me-2'>Remove from Wishlist</button>" +

                                //add to cart button
                                "<button type='button' class='btn btn-primary btn-rounded me-2' disabled>Add to Cart</button>" +
                                
                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: ₱"+data.data.price+" </li>" +
                                    "<li>In Stock: "+data.data.quantity+" </li>" +
                                    "<li>Status: "+availability+" </li>" +
                            "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    }

    //If user not owner of product
    if (userid != seller && userid != "None" && wish == false && availability == "Available") {
        //remove from update product button
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +

                                //add to wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-primary btn-rounded me-2'>Wishlist</button>" +

                                //add to cart button
                                "<button type='button' class='btn btn-primary btn-rounded me-2' data-bs-toggle='modal' data-bs-target='#addCartModal'>Add to Cart</button>" +

                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: ₱"+data.data.price+" </li>" +
                                    "<li>In Stock: "+data.data.quantity+" </li>" +
                                    "<li>Status: "+availability+" </li>" +
                            "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    }
    
    if (userid != seller && userid != "None" && wish == false && availability == "Unavailable") {
        //remove from update product button
        template += 
                "<div class='card'>" +
                    "<div class='card-body'>" +
                        "<div class='row'>" +
                            "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                            "</div>" +
                            "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                "<p>"+ data.data.description +"</p>" +

                                //add to wishlist button
                                "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-primary btn-rounded me-2'>Wishlist</button>" +

                                //add to cart button
                                "<button type='button' class='btn btn-primary btn-rounded me-2' disabled>Add to Cart</button>" +

                                "<h3 class='box-title mt-5'>Specifics</h3>" +
                                "<ul class='list-unstyled'>" +
                                    "<li>Product Type: "+data.data.productType+" </li>" +
                                    "<li>Price: ₱"+data.data.price+" </li>" +
                                    "<li>In Stock: "+data.data.quantity+" </li>" +
                                    "<li>Status: "+availability+" </li>" +
                            "</ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
    }
    
    if (userid != seller && userid != "None" && wish == true && availability == "Available") {
        //remove from update product button
            template += 
                    "<div class='card'>" +
                        "<div class='card-body'>" +
                            "<div class='row'>" +
                                "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                    "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                                "</div>" +
                                "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                    "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                    "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                    "<p>"+ data.data.description +"</p>" +

                                    //remove from wishlist button
                                    "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-danger btn-rounded me-2'>Remove from Wishlist</button>" +

                                    //add to cart button
                                    "<button type='button' class='btn btn-primary btn-rounded me-2' data-bs-toggle='modal' data-bs-target='#addCartModal'>Add to Cart</button>" +

                                    "<h3 class='box-title mt-5'>Specifics</h3>" +
                                    "<ul class='list-unstyled'>" +
                                        "<li>Product Type: "+data.data.productType+" </li>" +
                                        "<li>Price: ₱"+data.data.price+" </li>" +
                                        "<li>In Stock: "+data.data.quantity+" </li>" +
                                        "<li>Status: "+availability+" </li>" +
                                "</ul>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>"
    }
    if (userid != seller && userid != "None" && wish == true && availability == "Unavailable") {
        //remove from update product button
            template += 
                    "<div class='card'>" +
                        "<div class='card-body'>" +
                            "<div class='row'>" +
                                "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                    "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                                "</div>" +
                                "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                    "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                    "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                    "<p>"+ data.data.description +"</p>" +

                                    //remove from wishlist button
                                    "<button type='button', onclick='wishlist()', value='{{product.id}}', class ='btn btn-danger btn-rounded me-2'>Remove from Wishlist</button>" +

                                    //add to cart button
                                    "<button type='button' class='btn btn-primary btn-rounded me-2' disabled>Add to Cart</button>" +

                                    "<h3 class='box-title mt-5'>Specifics</h3>" +
                                    "<ul class='list-unstyled'>" +
                                        "<li>Product Type: "+data.data.productType+" </li>" +
                                        "<li>Price: ₱"+data.data.price+" </li>" +
                                        "<li>In Stock: "+data.data.quantity+" </li>" +
                                        "<li>Status: "+availability+" </li>" +
                                "</ul>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>"
    }

    if (userid == "None") {
        //remove buttons if the user is not logged in
            template += 
                    "<div class='card'>" +
                        "<div class='card-body'>" +
                            "<div class='row'>" +
                                "<div class='col-lg-5 col-md-5 col-sm-6'>" +
                                    "<div class='white-box text-center'><img src="+ data.data.picture +" class='card-img'></div>" +
                                "</div>" +
                                "<div class='col-lg-7 col-md-7 col-sm-6'>" +
                                    "<h4 class='box-title mt-5'>"+ data.data.name +"</h4>" +
                                    "<p class='card-text'><small class='text-muted'> "+ data.data.sName +" </small></p>" +
                                    "<p>"+ data.data.description +"</p>" +

                                    "<h3 class='box-title mt-5'>Specifics</h3>" +
                                    "<ul class='list-unstyled'>" +
                                        "<li>Product Type: "+data.data.productType+" </li>" +
                                        "<li>Price: ₱"+data.data.price+" </li>" +
                                        "<li>In Stock: "+data.data.quantity+" </li>" +
                                "</ul>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>"
    }

    $('#productDetailDisplay').append(template)

}

// Wishlist Product
function wishlist(){
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        type: 'POST',
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        url : base_url + '/market/api/wishlist_product/'+id+ '/', 

        success: function(data) {

            if (wishStatus == false) {
                // Show the alert
                $("#wishSuccessAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#wishSuccessAlert").fadeOut("slow");
                }, 1000);

                setTimeout(function(){
                    window.location = base_url + '/market/productDetails/'+id+'/'
                }, 1000);
            }

            if (wishStatus == true) {
                console.log("Removed from wishlist!")
                // Show the alert
                $("#unwishSuccessAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#unwishSuccessAlert").fadeOut("slow");
                }, 1000);

                setTimeout(function(){
                    window.location = base_url + '/market/productDetails/'+id+'/'
                }, 1000);
            }


        },
        error: function() {
            console.log('Error in wishlist product');
        }
    });
};


// Add to cart Product
$('#addCartForm').submit(function (event){
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    event.preventDefault();
    formData = new FormData();

    formData.append('cart_quantity', $('#cart_quantity').val());
    formData.append('product', id);

    if ($('#cart_quantity').val() <= 0) {
        console.log('Invalid Number! Minimum should be 1.')
        $('#cartError').html('Invalid Number! Minimum should be 1.');
        return false;
    }

    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);

            },
            url : base_url + '/cart/api/addto_cart/'+id+ '/', 

            data: formData,
            processData: false,
            contentType: false,
            
            success: function(response) {
                $('#addCartModal').modal('hide');

                // Show the alert
                $("#cartAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#cartAlert").fadeOut("slow");
                }, 1000);

                setTimeout(function(){
                    window.location = base_url + '/market/productDetails/'+id+'/'
                }, 1000);

                
                console.log('product added to cart!')

            },
            error: function() {
                $('#cartError').html('You cannot add more than the product has in stock!');

                console.log('Error in add to cart');
            }
        });
    }
});

// function displayComments(commentsData) {
//     var base_url = window.location.origin
//     let template = "";
//     $.each(commentsData, function(index, value) {
//         template += 

//         "<article class='media'>" +
//         "<div class='media-content'>" +
//             "<div class='content'>" +
//                 "<p>" +
//                     "<strong>"+ value.author + " </strong> <small>"+ value.date_added +"</small>" +
//                     "<br>" +
//                     "<p>"+ value.body +"</p>" +
//                 "</p>" +
//             "</div>" +
//         "</div>" +
//     "</article>"
//     });      
//     $('#commentsDisplay').append(template)
//     console.log(template)
//     // document.getElementById('dataDisplay').innerHTML = template
// }