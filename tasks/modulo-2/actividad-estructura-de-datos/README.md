# API de Gestión de Productos y Pedidos con FastAPI

Una API REST desarrollada con FastAPI que implementa estructuras de datos personalizadas (Árbol Binario y Lista Enlazada) para la gestión de productos y pedidos.

## Características

- Implementación de productos usando Árbol Binario para búsquedas eficientes
- Gestión de pedidos mediante Lista Enlazada
- Validación de datos usando Pydantic schemas
- Manejo de datos iniciales con FastAPI lifespan
- Persistencia de datos en archivos JSON
- Operaciones CRUD completas para pedidos
- Sistema de estados para pedidos (pending, shipped, canceled)

## Estructuras de Datos

- **Árbol Binario**: Utilizado para almacenar y buscar productos eficientemente
- **Lista Enlazada**: Implementada para la gestión de pedidos

## Endpoints

### Productos
- `POST /api/products`
    - Descripcion: Crear nuevo producto
    - Response:
      ```json
        {
          "message": "Product {id} created"
        }
      ```
- `GET /api/products/{product_id}`
    - Descripcion: Obtener producto por ID
    - Response:
      ```json
        {
          "id": 201,
          "name": "Libro",
          "price": 10.99,
          "stock": 1000
        }
      ```

### Pedidos
- `POST /api/orders`
  - Descripcion: Crear nuevo pedido
  - Response:
    ```json
      {
        "message": "Order 4 created"
      }
      ```
- `GET /api/orders`
  - Descripcion: Listar todos los pedidos
  - Response:
    ```json
      {
        "total": 4,
        "orders": [
          {
            "id": 1,
            "product_id": 100,
            "quantity": 8,
            "status": "pending"
          },
          {
            "id": 2,
            "product_id": 100,
            "quantity": 10,
            "status": "pending"
          },
          {
            "id": 3,
            "product_id": 200,
            "quantity": 20,
            "status": "pending"
          },
          {
            "id": 4,
            "product_id": 200,
            "quantity": 10,
            "status": "pending"
          }
        ]
      }
      ```
- `GET /api/orders/{order_id}`
  - Descripcion: Obtener pedido por ID
  - Response:
    ```json
      {
        "id": 4,
        "product_id": 200,
        "quantity": 10,
        "status": "pending",
        "product": {
          "id": 200,
          "name": "Agua",
          "price": 8.5,
          "stock": 5000
        }
      }
      ```
- `PUT /api/orders/{order_id}`
  - Descripcion: Actualizar pedido
  - Response:
    ```json
      {
        "message": "Order 4 updated",
        "order": {
          "id": 4,
          "product_id": 200,
          "quantity": 10,
          "status": "shipped"
        }
      }
      ```
- `DELETE /api/orders/{order_id}`:
  - Descripcion: Eliminar pedido
  - Response Status: 204 No Content

## Configuración y Ejecución

1. Instalar dependencias:
```bash
pip install fastapi uvicorn pydantic
```

2. Ejecutar el servidor:
```bash
uvicorn main:app --reload
```

3. Acceder a la documentación:
```
http://localhost:8000/docs
```

## Validación de Datos

Se utilizan Pydantic schemas para garantizar la integridad de los datos:
- `ProductSchema`: Validación de productos
- `OrderSchema`: Validación de pedidos
- `SupportedUpdateFieldsSchema`: Validación de actualizaciones de pedidos