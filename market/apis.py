from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status, viewsets
from market.models import Product, Review
from users.models import CustomUser
from market.serializers import ProductSerializer, ReviewSerializer, UpdateProductSerializer, ProductSellerSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated


class ProductViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    
    #Get all registered books
    def get_products(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        products = Product.objects.all()
        if products:
            serialized = ProductSellerSerializer(products, many=True)
            return Response(serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


    #Add/Register New Product
    def register_product(self, request, *args, **kwargs):
        import pdb; pdb.set_trace()
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Get products sold by specific user
    def get_user_product(self, request, product_id, format=None):
        
        products = Product.objects.filter(seller_id=product_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #Helper Method that loops through model to find product object with given id's
    def get_productObject(self, product_id):
        # import pdb; pdb.set_trace()
        try:
            return Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return None
    
    #for product search
    def get_searchResult(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        search_query = request.GET.get('keyterm', '')
        search_type = request.GET.get('productType', '')

        if search_type == 'product' and search_query != '':
            result = Product.objects.filter(name__icontains=search_query)
            serializer = ProductSellerSerializer(result, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if search_type == 'category' and search_query != '':
            result = Product.objects.filter(productType__icontains=search_query)
            print('Category:', search_query, 'Products:', result)
            serializer = ProductSellerSerializer(result, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else:
            serializer = ""
            return Response(serializer, status=status.HTTP_200_OK)




    #Uses helper method to get book specified and get its data
    def get_productDetails(self, request, product_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        wishlisted = False
        product_instance = self.get_productObject(product_id)
        if not product_instance:
            return Response(
                {"res": "Object with book id does not exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )

        if product_instance.users_wishlist.filter(id=request.user.id).exists():
            wishlisted = True

        print(product_instance.users_wishlist.filter(id=request.user.id).exists())
        serializer = ProductSellerSerializer(product_instance)
        return JsonResponse({'data' : serializer.data, 'wishlisted' : wishlisted}, status=status.HTTP_200_OK)

    #Modifies book selected if it exists
    def modify_product(self, request, product_id):
        # import pdb; pdb.set_trace()
        products = Product.objects.get(id=product_id)

        if products.seller_id == request.user.id:
            serializer = UpdateProductSerializer(products, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)      
    

    #Deletes selected book if it exists
    def delete_product(self, request, product_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        product_instance = self.get_productObject(product_id)

        if product_instance.seller_id != request.user.id:
            return Response(
                {"res": "You are not the owner of the product!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        product_instance.delete()
        return Response(
            {"res": "Product Deleted!"},
            status = status.HTTP_200_OK
        )

    #Function for wishlisting products per user
    def wishlist_product(self, request, *args, **kwargs):
        product_instance =  self.get_productObject(self.kwargs.get("product_id"))

        if product_instance.users_wishlist.filter(id=request.user.id).exists():
                product_instance.users_wishlist.remove(request.user)
        else:
            product_instance.users_wishlist.add(request.user)
        return Response(status = status.HTTP_200_OK)

    #Get user wishlisted products
    def get_wishlisted_products(self, request, *args, **kwargs):
        products = Product.objects.filter(users_wishlist = request.user.id)
        if products:
            serialized = ProductSellerSerializer(products, many=True)
            return Response(serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class CartViewSet(viewsets.ViewSet):

#     def get_productObject(self, product_id):
#         # import pdb; pdb.set_trace()
#         try:
#             return Product.objects.get(id=product_id)
#         except Product.DoesNotExist:
#             return None

#     #Function for adding products to user cart
#     def addto_cart(self, request, *args, **kwargs):
#         product_instance = self.get_productObject(self.kwargs.get("product_id"))
#         product = Product.objects.filter(id = self.kwargs.get("product_id"))

#         print(product_instance)
#         if product_instance.user_cart.filter(id=request.user.id).exists():
#                 # serializer.data.get("cart_quantity").add(1)
#                 # data =  [
#                 #     "cart_quantity" : 1
#                 # ]
#                 product_instance.cart_quantity += 1
#                 product_instance.total_price += product_instance.price * float(product_instance.cart_quantity)
#                 product_instance.save()
#                 # Monkeserializer = CartSerializer(product, many=False)
#                 # import pdb; pdb.set_trace()
#                 # if Monkeserializer.is_valid():
#                 #     Monkeserializer.save()
#                 # product_instance.cart_quantity.add()
#                 # serializer.data.add(product_instance.price * product_instance.cart_quantity)
#                 print(product_instance.cart_quantity)
#                 pass
#         else:
#             product_instance.user_cart.add(request.user)
#             # product_instance.cart_quantity.add(1)
#             # product_instance.total_price = product_instance.price * product_instance.cart_quantity
#         return Response(status = status.HTTP_200_OK)

#     #Get user cart products
#     def get_cart_products(self, request, *args, **kwargs):
#         products = Product.objects.filter(user_cart = request.user.id)
#         if products:
#             serialized = ProductSellerSerializer(products, many=True)
#             return Response(serialized.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    
class ReviewViewSet(viewsets.ViewSet):
    #Helper Method that loops through model to find comments in a product
    def get_comment_Object(self, product_id):
        # import pdb; pdb.set_trace()
        try:
            return Review.objects.filter(product_id = product_id)
        except Review.DoesNotExist:
            return None
    
    #Uses helper method to get comments data in a book
    def get_product_comments(self,request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        comment_instance = self.get_comment_Object(self.kwargs.get('product_id'))
        if not comment_instance:
            return Response(
                {"res": "Comment Object does not Exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        serializer = ReviewSerializer(comment_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Comments Function
    def add_comment(self, request, *args, **kwargs):
        data = {
            'comment': request.data.get('comment'),
            'author': request.user.id
        }
        serializer = ReviewSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    