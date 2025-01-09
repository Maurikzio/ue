class Order:
    def __init__(self, id, product_id, quantity, status=None):
        self.id = id
        self.product_id = product_id
        self.quantity = quantity
        self.status = status if status is not None else "pending"

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "status": self.status
        }


class OrderNode:
    def __init__(self, id, data):
        self.id = id  # will be the id of Order
        self.data = data  # data will be Order
        self.next = None


class OrderLinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def add(self, id, data):
        if self.find(id):
            return False

        new_node = OrderNode(id, data)
        if self.head is None:
            self.head = new_node
            self.length += 1
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
            self.length += 1
        return True

    def find(self, id):
        current = self.head
        while current:
            if current.id == id:
                return current.data
            current = current.next
        return None

    def delete(self, id):
        if self.head is None:
            return False

        if self.head.id == id:
            self.head = self.head.next
            self.length -= 1
            return True

        current = self.head
        while current.next:
            if current.next.id == id:
                current.next = current.next.next
                self.length -= 1
                return True
            current = current.next

        return False

    def update(self, id, data):
        if self.head is None:
            return False
        # hacemos de nuevo la lectura de todos ya que find() regresa nodo.data y no solo el nodo
        current = self.head
        while current:
            if current.id == id:
                current.data = data
                return True
            current = current.next

        return False

    def display(self):
        current = self.head
        elements = []
        while current:
            elements.append(current.id)
            current = current.next
        print("->".join(map(str, elements)))

    def get_all(self):
        current = self.head
        all_nodes = []
        while current:
            all_nodes.append(current.data.to_dict())
            current = current.next
        return all_nodes
