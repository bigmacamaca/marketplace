$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    $.ajax({
        method: 'GET',
        url : base_url + '/users/api/get_userDetails/'+id+ '/', 
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayUserDetails(data);
            $('#ProfileName').html(data.first_name + "'s Profile");
        },
        error: function(error) {
            console.log('Error in get user detail', error);
        }
    });
    $.ajax({
      method: 'GET',
      url : base_url + '/market/api/get_user_product/'+id+ '/', 
      beforeSend: function() {
          console.log('before get user product');
      },
      success: function(userProductsData) {
          displayUserProducts(userProductsData);
      },
      error: function(error) {
          console.log('Error in get user products', error);
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

var userid = $("#userID").text()
function displayUserDetails(data) {
    var base_url = window.location.origin
    let template = "";

    if (userid != data.id) {
      //Hide edit profile
      template += 
      "<div class='container py-5 h-100'>" +
      "<div class='row d-flex justify-content-center align-items-center h-100'>" +
        "<div class='col col-lg-9 col-xl-7'>" +
          "<div class='card'>" +
            "<div class='rounded-top text-white d-flex flex-row' style='background-color: #00bfa0; height:200px;'>" +
              "<div class='ms-4 mt-5 d-flex flex-column' style='width: 150px;'>" +
                "<img src="+ data.avatar +" class='img-fluid img-thumbnail mt-4 mb-2' style='width: 100%; height: 100%; object-fit: cover; z-index: 1'>" +
              "</div>" +
              "<div class='ms-3' style='margin-top: 130px;'>" +
                "<h5>" + data.first_name + " " + data.last_name + "</h5>" +
                "<p>Seller</p>" +
              "</div>" +
            "</div>" +
            "<div class='p-4 text-black' style='background-color: #f8f9fa;'>" +
              "<div class='d-flex justify-content-end text-center py-1'>" +
                "<div>" +
                  "<p class='mb-1 h5'></p>" +
                  "<p class='small text-muted mb-0'></p>" +
                "</div>" +
              "</div>" +
            "</div>" +
            "<div class='card-body p-4 text-black'>" +
              "<div class='d-flex justify-content-between align-items-center mb-4'>" +
                "<p class='lead fw-normal mb-0'>Products</p>" +
              "</div>" +
              "<div class='col'>" +
                    "<div id='userProductsList'>" +
                    "</div>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"

    }

    else {
      //show edit profile
      template += 
      "<div class='container py-5 h-100'>" +
      "<div class='row d-flex justify-content-center align-items-center h-100'>" +
        "<div class='col col-lg-9 col-xl-7'>" +
          "<div class='card'>" +
            "<div class='rounded-top text-white d-flex flex-row' style='background-color: #00bfa0; height:200px;'>" +
              "<div class='ms-4 mt-5 d-flex flex-column' style='width: 150px;'>" +
                "<img src="+ data.avatar +" class='img-fluid img-thumbnail mt-4 mb-2' style='width: 100%; height: 100%; object-fit: cover; z-index: 1'>" +
                "<a href="+base_url+"/users/update-profile/"+data.id+" class='btn btn-outline-dark' data-mdb-ripple-color='dark' style='z-index: 1;'> Edit profile </a>" +
              "</div>" +
              "<div class='ms-3' style='margin-top: 130px;'>" +
                "<h5>" + data.first_name + " " + data.last_name + "</h5>" +
                "<p>Seller</p>" +
              "</div>" +
            "</div>" +
            "<div class='p-4 text-black' style='background-color: #f8f9fa;'>" +
              "<div class='d-flex justify-content-end text-center py-1'>" +
                "<div>" +
                  "<p class='mb-1 h5'></p>" +
                  "<p class='small text-muted mb-0'></p>" +
                "</div>" +
              "</div>" +
            "</div>" +
            "<div class='card-body p-4 text-black'>" +
              "<div class='d-flex justify-content-between align-items-center mb-4'>" +
                "<p class='lead fw-normal mb-0'>Products</p>" +
              "</div>" +
              "<div class='col'>" +
                    "<div id='userProductsList'>" +
                    "</div>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
    }
    $('#profileDisplay').append(template)
}

function displayUserProducts(userProductsData) {
  var base_url = window.location.origin
  let template = "";
  $.each(userProductsData, function(index, value) {
      template += "<br>" +
                  "<div class='card mb-3' style='max-width: 540px;'>" +
                  "<div class='row no-gutters'>" +
                      "<div class='col-md-4'>" +
                          "<img src= "+ value.picture +" class='card-img'>" +
                      "</div>" +
                      "<div class='col-md-8'>" +
                          "<div class='card-body'>" +
                              "<h5 class='card-title'>"+ value.name +"</h5>" +
                              "<p class='card-text'>"+ value.description +"</p>" +
                              "<p class='card-text'>"+ value.productType +"</p>" +
                              "<p class='card-text'>₱"+ value.price +"</p>" +
                              "<a class='btn btn-primary' href="+base_url+"/market/productDetails/"+value.id+" role='button'>View</a>" +

                          "</div>" +
                      "</div>" +
                  "</div>" +
              "</div>"   

  });
  $('#userProductsList').prepend(template)
}
