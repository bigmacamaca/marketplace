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
        },
        error: function(error) {
            console.log('Error in get', error);
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

//Modify Product Ajax
$('#updateProductForm').submit(function (event){
    event.preventDefault();
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]

    formData = new FormData();

    invalidFields = false;

    if ($('#quantity').val() != "" && $('#quantity').val() <= 0) {
        console.log("quantity invalid!")
        $('#quantityError').html('Invalid Number! Minimum quantity should be atleast 1.');
        invalidFields = true;
    }

    if ($('#price').val() != "" && $('#price').val() <= 0) {
        console.log("price invalid!")
        $('#priceError').html('Invalid Number! Price should be greater than 0.');
        invalidFields = true;
    }

    //If has value, appends data, else returns empty    
    if(document.getElementById("name").value != '' ){
        formData.append('name', $('#name').val());
    }

    if(document.getElementById("description").value != '' ){
        formData.append('description', $('#description').val());
    }

    if(document.getElementById("picture").files.length >= 1 ){
        formData.append('picture', $('#picture')[0].files[0]);
    }

    if(document.getElementById("price").value != '' ){
        formData.append('price', $('#price').val());
    }

    if(document.getElementById("quantity").value != '' ){
        formData.append('quantity', $('#quantity').val());
    }

    if(document.getElementById("productType").value != '' ){
        formData.append('productType', $('#productType').val());
    }

    if(document.getElementById("availability").value != '' ){
        formData.append('availability', $('#availability').val());
    }

    if (invalidFields == true) {
        return false;
    }

    if (formData) {
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url : base_url + '/market/api/modify_product/'+id+ '/', 

            data: formData,
            processData: false,
            contentType: false,

            success: function(response) {

                // Show the alert
                $("#updateProdAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#updateProdAlert").fadeOut("slow");
                }, 1000);

                setTimeout(function(){
                    window.location = base_url + '/market/productDetails/'+id+'/'
                }, 1000);

                console.log('product modified!')
            },
            error: function() {

                // Show the alert
                $("#updateProdErrorAlert").show();
                // Hide the alert after 2 seconds
                setTimeout(function(){
                    $("#updateProdErrorAlert").fadeOut("slow");
                }, 1000);

                console.log('Error in modify product');
            }
        });
    }
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
                    "<p class='card-text'><small class='text-muted'>"+ data.data.sName +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>Type: "+ data.data.productType +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>"+ data.data.description +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>In Stock: "+ data.data.quantity +"</small></p>" +
                    "<p class='card-text'><small class='text-muted'>Status: "+ data.data.availability +"</small></p>" +
                    "<p class='card-text'>₱"+ data.data.price +"</p>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"

    $('#productDetailDisplay').append(template)
}
