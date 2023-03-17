$(document).ready(function() {
    var base_url = window.location.origin
    console.log('get cart test')
    console.log(base_url)
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        method: 'GET',
        url: base_url + '/transaction/api/get_transaction/'+id+ '/',
        beforeSend: function() {
            console.log('before get transaction');
        },
        success: function(data) {
            displayTransactions(data);
            console.log('transaction get successful');
            console.log(data);


            // $.each(data, function(index, trs) {
            //     console.log(trs.transaction_buyer)
            //     console.log(trs.transaction_item)
            //     if(trs.transaction_buyer == id) {
            //         $.ajax({
            //             method: 'GET',
            //             url : base_url + '/market/api/get_productDetails/'+trs.transaction_item+ '/', 
            //             beforeSend: function() {
            //                 console.log('before send');
            //             },
            //             success: function(trs) {
            //                 console.log(trs)
            //                 displayCart(trs.data);
                
            //             },
            //             error: function(error) {
            //                 console.log('sum ting wong get trs product detail', error);
            //             }
            //         });
            //     }
            // })

        },
        error: function() {
            console.log('sum ting wong get cart');
        }
    });
});

function displayTransactions(data) {
    console.log("displayed")
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {

        template += 

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ value.product_image +" class='card-img' style='height: 250px; width: 180px; object-fit: cover;'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ value.product_name +"</h5>" +
                    "<p class='card-text'>"+ value.seller_name +"</p>" +
                    "<p class='card-text'>₱"+ value.subtotal +"</p>" +
                    "<p class='card-text'>Quantity: "+ value.transaction_quantity +"</p>" +
                    "<p class='card-text'>Date of Purchase: "+ value.checkout_date +"</p>" +
                    // "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+data.id+" role='button'>View</a>" +
                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"       
        


    });
    $('#transactionDisplay').append(template)
}

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