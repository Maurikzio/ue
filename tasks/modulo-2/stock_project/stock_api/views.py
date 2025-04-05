from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Symbol
from .serializers import SymbolSerializer
from .services import StockService


@api_view(['GET'])
def symbol_price(request, symbol_name):
    symbol_data = StockService.get_symbol_price(symbol_name)
    print("symbol_data", symbol_data)
    if not symbol_data:
        return Response({"error": "Symbol not found"}, status=status.HTTP_404_NOT_FOUND)
    return Response(symbol_data)
