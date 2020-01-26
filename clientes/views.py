from django.shortcuts import render, redirect
from .models import Cliente
from .forms import ClienteForm
from .serializers import ClienteSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status



def list_clientes(request):
    clientes = Cliente.objects.all()
    return render(request, 'clientes.html', {'clientes': clientes})


def create_cliente(request):
    form = ClienteForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('list_clientes')
    return render(request, 'cliente-form.html', {'form': form})


def update_cliente(request, id):
    cliente = Cliente.objects.get(id=id)
    form = ClienteForm(request.POST or None, instance=cliente)

    if form.is_valid():
        form.save()
        return redirect('list_clientes')

    return render(request, 'cliente-form.html', {'form': form, 'cliente': cliente})


def delete_cliente(request, id):
    cliente = Cliente.objects.get(id=id)

    if request.method == 'POST':
        cliente.delete()
        return redirect('list_clientes')

    return render(request, 'cliente-delete-confirm.html', {'cliente': cliente})


class ClienteView(APIView):
    serializer_class = ClienteSerializer

    def get(self, request, format=None):
        serializer = self.serializer_class(Cliente.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "403 Forbidden"}, status=status.HTTP_409_CONFLICT)

    def delete(self, request):
        queryset = Cliente.objects.get(id = request.data['id'])
        queryset.delete()
        return Response(data='Deletado', status=status.HTTP_410_GONE)

    def put(self, request):
        cliente = Cliente.objects.get(id = request.data['id'])
        serializer = ClienteSerializer(cliente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)