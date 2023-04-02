from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductSellerSerializer(serializers.ModelSerializer):
    sName = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        # fields = '__all__'
        fields = (
            'name',
            'price',
            'productType',
            'description',
            'added',
            'seller',
            'sName',
            'picture',
            'averageRating',
            'availability',
            'quantity',
            'id'
        )

# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = '__all__'

class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        coverImage = serializers.ImageField(required=False)
        fields = (
            'name',
            'productType',
            'description',
            'picture',
            'quantity',
            'availability',
            'price',
        )
