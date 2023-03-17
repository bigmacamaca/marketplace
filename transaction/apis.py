from rest_framework.response import Response
from rest_framework import status, viewsets
from django.db.models import Max
from . models import Cart, Transaction, Product
import datetime
from rest_framework import permissions
from cart.serializers import CartSerializer, CartUpdateSerializer
from transaction.serializers import TransactionSerializer, TransactionDisplaySerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

class TransactionViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def get_all_transaction(self, request, *args, **kwargs):
        # allTransactions = Transaction.objects.get(buyer_id = request.user.id)

        return

    def get_transaction(self, request, user_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        if user_id != request.user.id:
            print("You are not authorized to view other transactions!")
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        transaction_items = Transaction.objects.filter(transaction_buyer = user_id)

        if transaction_items and user_id == request.user.id:
            transactionSerializer = TransactionDisplaySerializer(transaction_items, many=True)
            # print("product: ", transactionSerializer.product_name)
            return Response(transactionSerializer.data, status = status.HTTP_200_OK)
        
        if transaction_items == '' and user_id == request.user.id:
            print("You don't have any transactions yet!")
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def create_transaction(self, request, user_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        print("user id is", user_id)
        # cart_items = Cart.objects.filter(buyer_id=user_id)
        product_item = Product.objects.filter
        cart_items = Cart.objects.filter(buyer_id=user_id, is_sold=False)
        print(cart_items)
        # numberQuery = Transaction.objects.filter(transaction_buyer=request.user).count()
        # print("number query", numberQuery)
        transaction_data = None
        
        if user_id != request.user.id:
            print("user adding transaction is not correct")
            if not cart_items:
                print("cart is empty!")

        checkout_date = datetime.datetime.now()
        transaction_items = []
        import pdb; pdb.set_trace()
        for item in cart_items:
            new_product_q = item.product.quantity - item.cart_quantity
            # item.product.quantity = new_product_q

            if new_product_q < 0:
                print("Error, you cannot order more of this item: " +item.product.name+ " than it has in stock." )
                return Response("One or more products will return negative quantity.", status=status.HTTP_400_BAD_REQUEST)
                # pass

            if new_product_q >= 0:
                item.product.quantity = new_product_q
                item.product.save()
                item.product.availability_check()

                transaction_items.append(Transaction(
                    transaction_item = item,
                    transaction_buyer = request.user,
                    transaction_quantity = item.cart_quantity,
                    subtotal = item.product.price * item.cart_quantity,
                    # checkout_date = checkout_date,
                ))


        if transaction_items:
            max_number_identifier = Transaction.objects.aggregate(max_number=Max('number_identifier'))['max_number'] or 0
            number_identifier = max_number_identifier + 1

            # Set the same number_identifier for all the transaction items
            for transaction_item in transaction_items:
                transaction_item.number_identifier = number_identifier
                # transaction_item.checkout_date = checkout_date
                transaction_item.save()
            
            #If True, checked out cart_items wont be visible to user cart again
            cart_items.update(is_sold=True)

            serializer = TransactionSerializer(transaction_items, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response("No cart items found.", status=status.HTTP_400_BAD_REQUEST)


    # def create_transaction(self, request, user_id, *args, **kwargs):
    #     # import pdb; pdb.set_trace()
    #     print("user id is", user_id)
    #     cart_items = Cart.objects.filter(buyer_id=user_id)
    #     print(cart_items)
    #     # numberQuery = Transaction.objects.filter(transaction_buyer=request.user).count()
    #     # print("number query", numberQuery)
    #     transaction_data = None
        
    #     if user_id != request.user.id:
    #         print("user adding transaction is not correct")
    #         if not cart_items:
    #             print("cart is empty!")

    #     checkout_date = datetime.datetime.now()
        
    #     for item in cart_items:
    #         transaction_data = Transaction.objects.create(
    #             transaction_item = item,
    #             transaction_buyer = request.user,
    #             transaction_quantity = item.cart_quantity,
    #             subtotal = item.product.price * item.cart_quantity,
    #             # checkout_date = checkout_date,
    #         )

    #     if transaction_data is not None:
    #         serializer = TransactionSerializer(data=transaction_data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             # cart_items.delete()
    #         return Response(serializer.data, status = status.HTTP_201_CREATED)
    #     else:
    #         return Response("No cart items found.", status = status.HTTP_400_BAD_REQUEST)

