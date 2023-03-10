from django.urls import path
from cart import views
from cart import apis

app_name = "cart"

urlpatterns = [
    #API urls
    path('api/addto_cart/<int:product_id>/', apis.CartViewSet.as_view({'post':'addto_cart'})),
    path('api/get_cart_products/<int:user_id>/', apis.CartViewSet.as_view({'get':'get_cart_products'})),
    path('api/delete_cart_product/<int:product_id>/', apis.CartViewSet.as_view({'delete':'delete_cart_product'})),
    # path('api/test/', apis.CartViewSet.as_view({'get':'test'})),

    #Views urls
    path('cart/<int:user_id>/', views.CartView.as_view(), name="cart"),
    path('cart/deleteCartConfirm/<int:product_id>/', views.DeleteCartProductView.as_view(), name="deleteCartConfirm"),

]