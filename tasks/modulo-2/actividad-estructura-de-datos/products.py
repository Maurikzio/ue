class Product:
    def __init__(self, id, name, price, stock):
        self.id = id
        self.name = name
        self.price = price
        self.stock = stock

    def __str__(self):
        return f"Product(id={self.id}, name={self.name}, price=${self.price}, stock={self.stock})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "stock": self.stock
        }


class ProductNode:
    def __init__(self, product):
        self.product = product
        self.left = None
        self.right = None


class ProductsTree:
    def __init__(self):
        self.root = None

    def insert(self, product):
        if self.root is None:
            self.root = ProductNode(product)
            return True

        return self._insert(self.root, product)

    def _insert(self, node, product):
        if product.id == node.product.id:
            print(f"Product {product.id} already in the list")
            return False
        elif product.id < node.product.id:
            if node.left is None:
                node.left = ProductNode(product)
                return True
            return self._insert(node.left, product)
        else:
            if node.right is None:
                node.right = ProductNode(product)
                return True
            return self._insert(node.right, product)

    def search_by_id(self, id):
        return self._search(self.root, id)

    def _search(self, node, id):
        if node is None:
            return None

        if node.product.id == id:
            # retornamos solo el producto y no el nodo completo para el purpouse de la API
            return node.product
        elif id < node.product.id:
            return self._search(node.left, id)
        else:
            return self._search(node.right, id)
