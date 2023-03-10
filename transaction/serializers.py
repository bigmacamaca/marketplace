from rest_framework import serializers
from cart.serializers import CartSerializer
from .models import Product, CustomUser, Cart, Transaction

class TransactionSerializer(serializers.ModelSerializer):
    cartItem = CartSerializer(many=True)
    class Meta:
        model = Transaction
        fields = '__all__'

class ProductSellerSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'