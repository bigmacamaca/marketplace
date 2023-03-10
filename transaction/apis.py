from rest_framework.response import Response
from rest_framework import status, viewsets
from . models import Cart, Transaction
from rest_framework import permissions
from cart.serializers import CartSerializer, CartUpdateSerializer
from transaction.serializers import TransactionSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

class TransactionViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def get_all_transaction(self, request, *args, **kwargs):
        # allTransactions = Transaction.objects.get(buyer_id = request.user.id)

        return

    def get_transaction(self, request, *args, **kwargs):

        return

    def create_transaction(self, request, user_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        print("user id is", user_id)
        cart_items = Cart.objects.filter(buyer_id=user_id)
        print(cart_items)
        numberQuery = Transaction.objects.filter(transaction_buyer=request.user).count()
        print("number query", numberQuery)
        transaction_data = None
        
        if user_id != request.user.id:
            print("user adding transaction is not correct")
            if not cart_items:
                print("cart is empty!")

        for item in cart_items:
            transaction_data = Transaction.objects.create(
                number_identifier = numberQuery,
                transaction_item = item,
                transaction_buyer = request.user,
                transaction_quantity = item.cart_quantity,
                subtotal = item.product.price * item.cart_quantity,
            )

        if transaction_data is not None:
            serializer = TransactionSerializer(data=transaction_data)
            if serializer.is_valid():
                serializer.save()
                # cart_items.delete()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response("No cart items found.", status = status.HTTP_400_BAD_REQUEST)

