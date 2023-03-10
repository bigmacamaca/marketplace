from rest_framework.response import Response
from rest_framework import status, viewsets
from cart.models import Cart
from rest_framework import permissions
from cart.serializers import CartSerializer, CartUpdateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

class CartViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def get_cartObject(self, buyer_id):
        # import pdb; pdb.set_trace()
        try:
            return Cart.objects.get(id=buyer_id)
        except Cart.DoesNotExist:
            return None

    # Function for adding products to user cart
    def addto_cart(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()

        cartProduct = Cart.objects.filter(buyer = request.user.id)
        filtered = cartProduct.filter(product = self.kwargs.get("product_id")).first()
        print(request.user.id)

        # Check if added cart product is a duplicate
        if cartProduct.filter(product = self.kwargs.get("product_id")).exists():
            print("Cart Product is a Duplicate!")
            serializerUpdate = CartUpdateSerializer(filtered, data=request.data, partial=True)
            #Only updates cart quantity
            if serializerUpdate.is_valid():
                addedQty = serializerUpdate.validated_data['cart_quantity']
                total = filtered.cart_quantity + addedQty
                serializerUpdate.save(cart_quantity = total)
                return Response(serializerUpdate.data, status = status.HTTP_200_OK)

        else:
            serializer = CartSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(buyer=request.user)
                # serializer2.data.quantity()
                return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    #Gets cart products
    def get_cart_products(self, request, *args, **kwargs):
        cartProduct = Cart.objects.all()      
        if cartProduct:
            cartSerializer = CartSerializer(cartProduct, many=True)
            return Response(cartSerializer.data, status=status.HTTP_200_OK)
        else:
            return Response(cartSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Deletes selected cart product if it exists
    def delete_cart_product(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        print('delete cart product accessed')
        cart_instance = Cart.objects.filter(buyer_id = request.user.id)
        cart = Cart.objects.filter(product = self.kwargs.get("product_id"), buyer_id = request.user.id).first()
        print(cart_instance)
        print(cart)
        print(request.user.is_authenticated)
        print(request.user.id)
        cartProduct_instance = cart_instance.filter(product = self.kwargs.get("product_id")).first()

        if cart.buyer.id != request.user.id:
            return Response(
                {"res": "You are not the owner of the cart!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        cartProduct_instance.delete()
        return Response(
            {"res": "Cart Product Deleted!"},
            status = status.HTTP_200_OK
        )
