$(document).ready(function() {
    var base_url = window.location.origin
    console.log('test')
    console.log(base_url)
    $.ajax({
        method: 'GET',
        url: base_url + '/market/api/get_products/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayProducts(data);
            console.log('Data get successful');
        },
        error: function() {
            console.log('sum ting wong get');
        }
    });
});

$("#search_products").submit(function(event){
    event.preventDefault();
    $('#dataDisplay').hide()
    var base_url = window.location.origin
    var query = $('#keyword').val(); 
    var searchType = $('#searchType').val();

    $.ajax({
        url: base_url + '/market/api/get_searchResult/',
        data: { keyterm: query, productType: searchType},
        success: function(data){
            console.log(data)
            // $("#search-results").empty();
            // $('#resultHeader').empty();
            if(data.length == 0) {
                $("#search-results").empty();
                $('#resultHeader').html('No product found!');
            }
            else {
                $("#search-results").empty();
                displaySearchResults(data);
                $('#resultHeader').html('Search Results');
            }

        },
        error: function() {
            console.log("sum ting wong get search results")
        }
    })

});

function displaySearchResults(data) {
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {

    
        console.log("search result" +value.name)
        template += 

        // "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>" +
        //     "<div class='box card'>" +
        //         "<div class='box cardImg'>" +
        //             "<img src="+ value.picture +">" +
        //         "</div>" +
        //         "<div class='info'>" +
        //             "<h3>"+ value.name +"</h3>" +
        //             "<p><span>₱</span>"+ value.price +"</p>" +
        //             "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
        //         "</div>" +
        //     "</div>" +
        // "</div>"

        "<div class='card mb-3' style='max-width: 540px;'>" +
        "<div class='row no-gutters'>" +
            "<div class='col-md-4'>" +
                "<img src= "+ value.picture +" class='card-img'>" +
            "</div>" +
            "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>"+ value.name +"</h5>" +
                    "<p class='card-text'><small class='text-muted'>"+ value.seller +"</small></p>" +
                    "<p class='card-text'>"+ value.description +"</p>" +
                    "<p class='card-text'>"+ value.productType +"</p>" +
                    "<p class='card-text'>"+ value.availability +"</p>" +
                    "<p class='card-text'>₱"+ value.price +"</p>" +
                    "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +

                "</div>" +
            "</div>" +
        "</div>" +
    "</div>"
    
        

        
    });
    $('#search-results').append(template)
    // console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
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

// //For Logging out user
// $('#logoutLlink').click(function (){
//     var base_url = window.location.origin
//     console.log('Logout test')
//     $.ajax({
//         type: 'POST',
//         beforeSend: function(xhr, settings) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         },
//         url: base_url + '/users/api/logout/',
//         data: {},
//         success: function(response) {
//             window.location = base_url + '/books/home'
//             console.log("Logged Out successfully!");
//             console.log(response);
//         },
//         error: function() {
//             console.log('sum ting wong logout');
//         }
//     });
// });



function displayProducts(data) {
    var base_url = window.location.origin
    let template = "";
    let unavailable = "";
    $.each(data, function(index, value) {
        is_available = value.availability
        console.log(is_available)
        console.log(value)

        if (value.availability == "Available")
            template += 

            "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>" +
                "<div class='box card'>" +
                    "<div class='box cardImg'>" +
                        "<img src="+ value.picture +">" +
                    "</div>" +
                    "<div class='info'>" +
                        "<h4>"+ value.name +"</h4>" +
                        "<h6>"+ value.productType +"</h6>" +
                        "<h7>"+ value.availability +"<h7>" +
                        "<p><span>₱</span>"+ value.price +"</p>" +
                        "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
                    "</div>" +
                "</div>" +
            "</div>"

        else
            // Product unavailable, card fades out
            template +=
            
            "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>" +
                "<div class='box card opacity-50'>" +
                    "<div class='box cardImg'>" +
                        "<img src="+ value.picture +">" +
                    "</div>" +
                    "<div class='info'>" +
                        "<h4>"+ value.name +"</h4>" +
                        "<h6>"+ value.productType +"</h6>" +
                        "<h7>"+ value.availability +"<h7>" +
                        "<p><span>₱</span>"+ value.price +"</p>" +
                        "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
                    "</div>" +
                "</div>" +
            "</div>"

    //     "<div class='card mb-3' style='max-width: 540px;'>" +
    //     "<div class='row no-gutters'>" +
    //         "<div class='col-md-4'>" +
    //             "<img src= "+ value.picture +" class='card-img'>" +
    //         "</div>" +
    //         "<div class='col-md-8'>" +
    //             "<div class='card-body'>" +
    //                 "<h5 class='card-title'>"+ value.name +"</h5>" +
    //                 "<p class='card-text'><small class='text-muted'>"+ value.seller +"</small></p>" +
    //                 "<p class='card-text'>"+ value.description +"</p>" +
    //                 "<p class='card-text'>₱"+ value.price +"</p>" +
    //                 "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +

    //             "</div>" +
    //         "</div>" +
    //     "</div>" +
    // "</div>"
    
        

        
    });
    $('#dataDisplay').append(template)


    // console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}

{/* <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="box card">
        <div class="box cardImg">
            <img src="+ value.picture +">
        </div>
        <div class="info">
            <h3>"+ value.name +"</h3>
            <p><span>P</span>"+ value.price +"</p>
            <a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>
        </div>
    </div>
</div> */}

// "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>" +
// "<div class='box card'>" +
//     "<div class='box cardImg'>"
//         "<img src="+ value.picture +">" +
//     "</div>" +
//     "<div class='info'>"
//         "<h3>"+ value.name +"</h3>" +
//         "<p><span>₱</span>"+ value.price +"</p>" +
//         "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
//     "</div>" +
// "</div>" +
// "</div>" +