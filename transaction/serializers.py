from rest_framework import serializers
from cart.serializers import CartSerializer
from .models import Product, CustomUser, Cart, Transaction

class TransactionSerializer(serializers.ModelSerializer):
    # cartItem = CartSerializer(many=True)
    class Meta:
        model = Transaction
        fields = '__all__'

class TransactionDisplaySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='transaction_item.product')
    product_image = serializers.ImageField(source='transaction_item.product.picture')
    buyer_name = serializers.CharField(source='transaction_buyer.username')
    seller_name = serializers.CharField(source='transaction_item.product.seller.get_full_name')

    class Meta:
        model = Transaction
        fields = ('number_identifier', 'product_name', 
                  'product_image', 'seller_name', 
                  'transaction_quantity', 'subtotal', 
                  'buyer_name', 'checkout_date')


class ProductSellerSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'