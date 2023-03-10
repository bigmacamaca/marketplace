$(document).ready(function() {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var id = urlid.split("/")[3]
    console.log('get user detail')
    console.log('url', base_url + '/users/api/get_userDetails/'+id)
    $.ajax({
        method: 'GET',
        url : base_url + '/users/api/get_userDetails/'+id+ '/', 
        // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
        beforeSend: function() {
            console.log('before send');
        },
        success: function(data) {
            displayUserDetails(data);
            console.log(data);
        },
        error: function(error) {
            console.log('sum ting wong get user detail', error);
        }
    });
    $.ajax({
      method: 'GET',
      url : base_url + '/market/api/get_user_product/'+id+ '/', 
      // url: 'http://127.0.0.1:8000/api/books/get_bookDetails/<int:book_id>/',
      beforeSend: function() {
          console.log('before get user books');
      },
      success: function(userProductsData) {
          displayUserProducts(userProductsData);
          console.log(userProductsData);
      },
      error: function(error) {
          console.log('sum ting wong get user books', error);
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

function displayUserDetails(data) {
    var base_url = window.location.origin
    let template = "";
        template += 
        "<div class='container py-5 h-100'>" +
        "<div class='row d-flex justify-content-center align-items-center h-100'>" +
          "<div class='col col-lg-9 col-xl-7'>" +
            "<div class='card'>" +
              "<div class='rounded-top text-white d-flex flex-row' style='background-color: #00bfa0; height:200px;'>" +
                "<div class='ms-4 mt-5 d-flex flex-column' style='width: 150px;'>" +
                  "<img src="+ data.avatar +" class='img-fluid img-thumbnail mt-4 mb-2' style='width: 150px; z-index: 1'>" +
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
                    "<p class='mb-1 h5'>TBD</p>" +
                    "<p class='small text-muted mb-0'>Followers</p>" +
                  "</div>" +
                "</div>" +
              "</div>" +
              "<div class='card-body p-4 text-black'>" +
                "<div class='mb-5'>" +
                  "<p class='lead fw-normal mb-1'>About</p>" +
                  "<div class='p-4' style='background-color: #f8f9fa;'>" +
                    "<p class='font-italic mb-1'>"+ data.bio +"</p>" +
                  "</div>" +
                "</div>" +
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


    $('#profileDisplay').append(template)
    console.log(template)
    // document.getElementById('dataDisplay').innerHTML = template
}

function displayUserProducts(userProductsData) {
  var base_url = window.location.origin
  let template = "";
  $.each(userProductsData, function(index, value) {
      console.log(value)
      console.log(value.id)
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
  console.log(template)
  // document.getElementById('dataDisplay').innerHTML = template
}
