from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from my_users.models import User
from .serializers import PreferenceSerializer
from rest_framework import status


class PreferencesList(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            serializer = PreferenceSerializer(user.preferences, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            data = request.data.copy()
            # data['user'] = user.id  # solo pasamos el id, equal to serializer.save(user=user)

            serializer = PreferenceSerializer(data=data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found!"}, status=status.HTTP_404_NOT_FOUND)

# From --> User
# user = User.objects.get(pk=1)
# user.preferences.create(preference_type="ARTIST", preference_value="David Guetta")

# From --> Preference
# Preference.objects.create(preference_type="GENRE", preference_value="Pop", user=user)
