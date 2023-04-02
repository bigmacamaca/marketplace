$(document).ready(function() {
    var base_url = window.location.origin
    $.ajax({
        method: 'GET',
        url: base_url + '/market/api/get_products/',
        beforeSend: function() {
        },
        success: function(data) {
            displayProducts(data);
            console.log('Data get successful');
        },
        error: function() {
            console.log('Error in get');
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
            console.log("Error in get search results")
        }
    })

});

function displaySearchResults(data) {
    var base_url = window.location.origin
    let template = "";
    $.each(data, function(index, value) {

    
        template += 

        "<div class='col-md-3'>" +
        "<div class='card h-100'>" +
            "<div class='card-header'>"+ value.productType +"</div>" +
            "<img src="+ value.picture +" class='card-img-top' style='height: 200px; object-fit: cover;'>" +
            "<div class='card-body flex-grow-1'>" +
                "<h5 class='card-title text-truncate'>"+ value.name +"</h5>" +
                "<p class='card-text'>₱"+ value.price +"</p>" +
                "<a class='btn btn-primary mt-auto' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
            "</div>" +
            "<div class='card-footer'>" +
                "<small class='text-body-secondary'>"+ value.availability +"</small>" +
            "</div>" +
        "</div>" +
    "</div>"
    
        

        
    });
    $('#search-results').append(template)

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

function displayProducts(data) {
    var base_url = window.location.origin
    let template = "";
    let unavailable = "";
    $.each(data, function(index, value) {
        is_available = value.availability

        if (value.availability == "Available")
            template += 

            "<div class='col-md-3'>" +
                "<div class='card h-100'>" +
                    "<div class='card-header'>"+ value.productType +"</div>" +
                    "<img src="+ value.picture +" class='card-img-top' style='height: 200px; object-fit: cover;'>" +
                    "<div class='card-body flex-grow-1'>" +
                        "<h5 class='card-title text-truncate'>"+ value.name +"</h5>" +
                        "<p class='card-text'>₱"+ value.price +"</p>" +
                        "<a class='btn btn-primary mt-auto' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                        "<small class='text-body-secondary'>"+ value.availability +"</small>" +
                    "</div>" +
                "</div>" +
            "</div>"
            

        else
            // Product unavailable, card fades out
            template +=

            "<div class='col-md-3'>" +
            "<div class='card h-100 opacity-50'>" +
                "<div class='card-header'>"+ value.productType +"</div>" +
                "<img src="+ value.picture +" class='card-img-top' style='height: 200px; object-fit: cover;'>" +
                "<div class='card-body flex-grow-1'>" +
                    "<h5 class='card-title text-truncate'>"+ value.name +"</h5>" +
                    "<p class='card-text'>₱"+ value.price +"</p>" +
                    "<a class='btn btn-primary mt-auto' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +
                "</div>" +
                "<div class='card-footer'>" +
                    "<small class='text-body-secondary'>"+ value.availability +"</small>" +
                "</div>" +
            "</div>" +
        "</div>"

        
    });
    $('#dataDisplay').append(template)

}
