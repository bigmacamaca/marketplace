from rest_framework import serializers
from .models import Product, Cart

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartDisplaySerializer(serializers.ModelSerializer):
    cartP_id = serializers.IntegerField(source='product.id')
    cartP_name = serializers.CharField(source='product.name')
    cartP_price = serializers.FloatField(source='product.price')
    cartP_desc = serializers.CharField(source='product.description')
    cartP_image = serializers.ImageField(source='product.picture')
    cartP_seller = serializers.CharField(source='product.seller.get_full_name')
    
    class Meta:
        model = Cart
        fields = ('cartP_name', 'cartP_desc', 
                  'cartP_image', 'cartP_seller', 
                  'date_added', 'cart_quantity',
                  'cartP_price', 'cartP_id',
                  'product','buyer','is_sold',
                  'date_added','cart_quantity')

class CartUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['cart_quantity']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductSellerSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'