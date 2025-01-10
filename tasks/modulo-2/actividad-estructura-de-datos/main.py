from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from products import Product, ProductsTree
from enum import Enum
from orders import OrderLinkedList, Order
import json

PRODUCTS_PATH = 'products.json'
ORDERS_PATH = 'orders.json'
products_tree = ProductsTree()  # almacenaremos aqui los productos
orders_list = OrderLinkedList()  # almacenaremos aqui las ordenes


class ProductSchema(BaseModel):
    id: int
    name: str
    price: float
    stock: int


class StatusType(str, Enum):
    PENDING = "pending"
    SHIPPED = 'shipped'
    CANCELED = "canceled"


class OrderSchema(BaseModel):
    id: int
    product_id: int
    quantity: int
    status: StatusType | None = None


class SupportedUpdateFieldsSchema(BaseModel):
    quantity: int | None = Field(None, gt=0)
    status: StatusType | None = None


async def lifespan(app: FastAPI):
    try:
        with open(PRODUCTS_PATH, "r") as file:
            initial_products = json.load(file)
            products_loaded = 0
            for item in initial_products:
                validated_product = ProductSchema(**item)
                product = Product(
                    id=validated_product.id,
                    name=validated_product.name,
                    price=validated_product.price,
                    stock=validated_product.stock,
                )
                if products_tree.insert(product):
                    products_loaded += 1
            print(f"{products_loaded} products loaded successfully")
    except FileNotFoundError:
        print("File not found, starting with empty products list")
    except Exception as e:
        print(f"Error loading products: {str(e)}")

    try:
        with open(ORDERS_PATH, "r") as file:
            initial_orders = json.load(file)
            for item in initial_orders:
                valid_order = OrderSchema(**item)
                if not products_tree.search_by_id(valid_order.product_id):
                    print(f"""WARNING: Order {
                          valid_order.id} skipped - Product {valid_order.product_id} not found""")
                    continue
                order = Order(
                    id=valid_order.id,
                    product_id=valid_order.product_id,
                    quantity=valid_order.quantity,
                    status=valid_order.status.value if valid_order.status else StatusType.PENDING.value
                )
                orders_list.add(order.id, order)
            print(f"{orders_list.length} orders loaded successfully")
    except FileNotFoundError:
        print("File not found, starting with empty orders list")
    except Exception as e:
        print(f"Error loading orders: {str(e)}")

    yield


app = FastAPI(title='Products API', lifespan=lifespan)


@app.get("/")
def root():
    return {"message": "Hello world!"}


# Create products
@app.post("/api/products")
def create_product(product: ProductSchema):
    new_product = Product(
        id=product.id,
        name=product.name,
        price=product.price,
        stock=product.stock
    )
    if not products_tree.insert(new_product):
        raise HTTPException(
            status_code=400,
            detail="Product already exists"
        )
    return {"message": f"Product {new_product.id} created"}


# Read product
@app.get('/api/products/{product_id}')
def read_product(product_id: int):
    product_found = products_tree.search_by_id(product_id)
    print('product_found', product_found)
    if not product_found:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product_found.to_dict()


# Create order
@app.post("/api/orders")
def create_order(order: OrderSchema):
    products_exists = products_tree.search_by_id(order.product_id)

    if not products_exists:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    new_order = Order(
        order.id,
        order.product_id,
        order.quantity,
        order.status
    )

    if not orders_list.add(new_order.id, new_order):
        raise HTTPException(
            status_code=400,
            detail="Order already exists"
        )

    return {"message": f"Order {new_order.id} created"}


# Get order by id
@app.get("/api/orders/{order_id}")
def get_order(order_id: int):
    order_found = orders_list.find(order_id)
    if not order_found:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )
    product_data = products_tree.search_by_id(order_found.product_id)
    print(product_data)
    return {**order_found.to_dict(), "product": product_data.to_dict()}


# Update order
@app.put("/api/orders/{order_id}")
def update_order(order_id: int, update_fields: SupportedUpdateFieldsSchema):

    current_order = orders_list.find(order_id)
    if not current_order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    # Solo permitiremos cambios si la orden esta PENDING
    if current_order.status != StatusType.PENDING:
        raise HTTPException(
            status_code=400,
            detail="Orders with only 'pending' status can be updated"
        )

    # Solo actualizaremos quantity y status para mantener consistencia de ids
    if update_fields.quantity is not None:
        current_order.quantity = update_fields.quantity
    if update_fields.status is not None:
        current_order.status = update_fields.status.value

    if not orders_list.update(current_order.id, current_order):
        raise HTTPException(
            status_code=500,
            detail="Error updating order"
        )
    return {
        "message": f"Order {current_order.id} updated",
        "order": current_order.to_dict()
    }


# Delete order
@app.delete("/api/orders/{order_id}", status_code=204)
def delete_order(order_id: int):
    order_to_delete = orders_list.find(order_id)

    if not order_to_delete:
        raise HTTPException(
            status_code=400,
            detail="Order not found"
        )

    if not orders_list.delete(order_id):
        raise HTTPException(
            status_code=500,
            detail="Error deleting order"
        )

    return None


# List all orders
@app.get("/api/orders")
def get_all_orders():
    orders = orders_list.get_all()
    return {
        "total": len(orders),
        "orders": orders
    }
