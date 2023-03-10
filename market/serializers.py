from rest_framework import serializers
from .models import Product, Review, CustomUser

class ProductSerializer(serializers.ModelSerializer):
    # seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'
        # fields = (
        #     'name',
        #     'price',
        #     'productType',
        #     'description',
        #     'added',
        #     'seller',
        #     'picture',
        #     'averageRating',
        #     'id'
        # )

class ProductSellerSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        coverImage = serializers.ImageField(required=False)
        fields = (
            'name',
            'productType',
            'description',
            'picture',
            'price',
        )
