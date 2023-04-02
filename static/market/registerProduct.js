$(document).ready(function() {
    var base_url = window.location.origin
    $('#registerProductForm').submit(function (event){
        event.preventDefault();
        formData = new FormData();

        formData.append('name', $('#name').val());
        formData.append('quantity', $('#quantity').val());
        formData.append('description', $('#description').val());
        formData.append('price', $('#price').val());

        
        // Check if any form fields are empty
        var emptyFields = false;
        var invalidFields = false;

        var picture = $("#picture").val();

        // Check if productType field is empty
        if ($("#productType").val() == null) {
            // If true, set the value to an empty string
            formData.append('productType', "");
        } else {
            // If false, append the value to the form data
            formData.append('productType', $('#productType').val());
        }

        // Check if productType field is empty
        if ($("#availability").val() == null) {
            // If true, set the default value
            formData.append('availability', "Available");
        } else {
            // If false, append the value to the form data
            formData.append('availability', $('#availability').val());
        }

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

        //If picture has value, append to form to be sent to backend
        if (picture) {
            formData.append('picture', $('#picture')[0].files[0]);
        }

        $('#registerProductForm input, #registerProductForm select').each(function() {
            //If picture and description is empty, prevent error throw
            //This sends these fields as blank/null to the backend, which will then use its default value
            if ($(this).attr('name') == 'picture' || $(this).attr('name') == 'description') {
                return true;
            }

            //If productType and availability is empty, prevent error throw
            //This sends these fields as blank/null to the backend, which will then use its default value
            if ($(this).attr('name') == 'productType' || $(this).attr('name') == 'availability') {
                return true;
            }
            
            if ($(this).val() == '') {
                $(this).addClass('is-invalid');
                $(this).next('.invalid-feedback').show();
                emptyFields = true;
            } else {
                $(this).removeClass('is-invalid');
                $(this).next('.invalid-feedback').hide();
            }
        });

        if (emptyFields || invalidFields) {
            return false;  // Prevent form submission if any fields are empty
        }
        

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

                    },
                    error: function() {
                        console.log('Error in register product');
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
