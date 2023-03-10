$(document).ready(function() {
    var base_url = window.location.origin
    $('#registerProductForm').submit(function (event){
        event.preventDefault();
        console.log('test register product')
        formData = new FormData();

        formData.append('name', $('#name').val());
        formData.append('productType', $('#productType').val());
        formData.append('availability', $('#availability').val());
        formData.append('quantity', $('#quantity').val());
        formData.append('description', $('#description').val())
        formData.append('price', $('#price').val())
        formData.append('picture', $('#picture')[0].files[0]);

        if (formData) {
                $.ajax({
                    type: 'POST',
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    url: base_url + '/market/api/register_product/',
                    
                    data: formData,
                    processData: false,
                    contentType: false,

                    success: function(response) {
                        window.location = base_url + '/users/home'
                        console.log('product registered!');
                        console.log(response);
                    },
                    error: function() {
                        console.log('sum ting wong register product');
                    }
            });
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
