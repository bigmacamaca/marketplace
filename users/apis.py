from django.shortcuts import render
from rest_framework import viewsets, response, exceptions, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny

from users.models import CustomUser
from users.serializers import *
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate

class UsersViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    #Gets all user from database
    def get_userList(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #Registers a user
    def RegisterUser(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)

        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

        #login user
    def user_login(self, request, *args, **kwargs):

        email = request.data.get('email')
        password = request.data.get('password')

        
        user = authenticate(request, username=email, password=password)
        # import pdb; pdb.set_trace()
        
        if user is not None:
            # token = user.auth_token.key
            login(request, user)
            print("Logged In Successfuly")
            return Response(status = status.HTTP_200_OK)

        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
    
    # change password
    def change_pass(self, request, *args, **kwargs):
        
        serializer = ChangePasswordSerializer(data = self.request.data, request = self.request)
        import pdb; pdb.set_trace()
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = serializer.save()
            return Response(status=status.HTTP_200_OK)

    
    #logout user
    def user_logout(self, request, *args, **kwargs):
        logout(request)
        return Response('Logged Out Successfully.')

class LoggedUserViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated,]

    #Helper Method that loops through model to find book object with given id's
    def get_UserObject(self, user_id):
        # import pdb; pdb.set_trace()
        try:
            return CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return None


    #Uses helper method to get book specified and get its data
    def get_userDetails(self, request, user_id, *args, **kwargs):
        # import pdb; pdb.set_trace()
        user_instance = self.get_UserObject(user_id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        serializer = CustomUserSerializer(user_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def update_profile(self, request, pk=None , *args, **kwargs):
        import pdb; pdb.set_trace()
        user = self.request.user
        serializer = UpdateProfileSerializer(data = self.request.data, request = self.request, instance = user, partial=True)
        if self.request.user.id == self.kwargs.get('user_id'):
            if serializer.is_valid():
                user = serializer.save()
                return Response(status=status.HTTP_200_OK)      
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)