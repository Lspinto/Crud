from django.urls import path, include
from .views import list_clientes, create_cliente, update_cliente, delete_cliente
from .views import ClienteView, ClienteidView


urlpatterns = [
    path('', list_clientes, name='list_clientes'),
    path('new', create_cliente, name='create_cliente'),
    path('update/<int:id>/', update_cliente, name='update_cliente'),
    path('delete/<int:id>/', delete_cliente, name='delete_cliente'),
    path('clienteviews/', ClienteView.as_view(), name='clienteviews'),
    path('clienteviews/<id>/', ClienteidView.as_view(), name='ClienteidView')

]
