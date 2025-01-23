import { Book } from "./Book";
import { User } from "./User";

interface Borrowable {
  book: Book;
  borrowDate: Date;
  dueDate: Date;
}

function LogOperation(operation: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const userId = args[0];
      const title = args[1];
      const result = originalMethod.apply(this, args);
      console.log(`[${new Date().toISOString()}] -  User: ${userId}, ${operation}, Book: "${title}", Sucess: ${result}`);
      return result;
    }
  }
}

class Library {
  private name: string;
  private books: Book[] = [];
  private borrowedBooks: Map<string, Borrowable[]> = new Map();
  private users: Map<string, User> = new Map();

  constructor(name: string) { this.name = name }

  addBook(book: Book) {
    this.books.push(book);
  }

  registerUser(name: string, lastName: string, id: string) {
    const newUser = new User(name, lastName, id)
    this.users.set(id, newUser);
  }

  findBookByTitle(title: string): Book | undefined {
    return this.books.find(book => book.getTitle() === title);
  }

  @LogOperation("BORROW")
  borrowBook(userId: string, title: string): boolean {
    if (!this.users.has(userId)) {
      throw new Error("User not registered");
    }

    const book = this.findBookByTitle(title);

    if (!book || !book?.isAvailable()) {
      throw new Error("Book is not available");
    }

    const userBorrowings = this.borrowedBooks.get(userId) || [];
    userBorrowings.push({
      book,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });

    this.borrowedBooks.set(userId, userBorrowings);
    book.decreaseAvailableCopies()
    return true;
  }

  @LogOperation("RETURN")
  returnBook(userId: string, title: string): boolean {
    const userBorrowings = this.borrowedBooks.get(userId);

    if (!userBorrowings) {
      return false;
    }

    const borrowingIndex = userBorrowings.findIndex(borrow => borrow.book.getTitle() === title);

    if (borrowingIndex === -1) {
      return false;
    }

    const borrowing = userBorrowings[borrowingIndex];
    borrowing.book.increaseAvailableCopeis();

    userBorrowings.splice(borrowingIndex, 1);
    if (userBorrowings.length === 0) {
      this.borrowedBooks.delete(userId)
    }

    return true;
  }

  printBooks() {
    console.log(`Library: ${this.name}`);
    console.log("**************** BOOKS ****************");
    console.log(JSON.stringify(this.books, null, 2))
  }

  printUsers() {
    console.log(`Library: ${this.name}`);
    console.log("**************** USERS ****************");
    this.users.forEach(user => console.log(JSON.stringify(user, null, 2)))
  }

  printBorrows() {
    console.log("**************** BORROWED BOOKS ****************");
    this.borrowedBooks.forEach((borrowings, userId) => {
      console.log('User: ', userId)
      console.log(JSON.stringify(borrowings, null, 2))
    })
  }
}

const myLibrary = new Library("ABC");
const seedBooks = [
  new Book("Don Quijote", "Miguel de Cervantes", 1605, "Classic", 5),
  new Book("1984", "George Orwell", 1949, "Science Fiction", 3),
  new Book("One Hundred Years of Solitude", "Gabriel García Márquez", 1967, "Magical Realism", 4),
  new Book("Pride and Prejudice", "Jane Austen", 1813, "Romance", 2),
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954, "Fantasy", 3)
];

const seedUsers = [
  { name: "Ana", lastName: "García", id: "AG01" },
  { name: "Carlos", lastName: "López", id: "CL02" },
  { name: "María", lastName: "Rodríguez", id: "MR03" },
];

seedBooks.forEach(book => myLibrary.addBook(book));
seedUsers.forEach(({ name, lastName, id }) => myLibrary.registerUser(name, lastName, id))

// myLibrary.borrowBook("Az01", "Don Quijote");
// myLibrary.borrowBook("AG01", "1984");
// myLibrary.printBorrows();
// myLibrary.returnBook("AZ01", "1984");
// myLibrary.printBorrows();

