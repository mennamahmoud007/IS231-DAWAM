from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .serializers import LogInSerializer

class LogInView(APIView):
    def post(self, request):
        serializer = LogInSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                request,
                username = serializer.validated_data['username'],
                password = serializer.validated_data['password']
            )

            if user is not None:
                login(request, user)
                return Response({
                    'success' : True,
                    'username': user.username,
                    'user_type': user.user_type,
                    'company_name': user.company_name
                }, status=status.HTTP_201_CREATED)
            return Response({
            'success': False,
            'errors': 'Incorrect username or password'
        }, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)