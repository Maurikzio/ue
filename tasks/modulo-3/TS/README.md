# Sistema de Gestión de Biblioteca

Una aplicación de consola simple en TypeScript para gestionar una biblioteca, incluyendo préstamos de libros, devoluciones y registro de usuarios.

## Características

- Sistema de registro de usuarios
- Catalogación de libros con múltiples géneros (incluyendo libros de Horror)
- Préstamo y devolución de libros
- Registro de todas las operaciones de la biblioteca
- Interfaz de usuario basada en consola

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/Maurikzio/ue.git
# usamos la rama modulo-3
cd /tasks/modulo-3/TS
```

2. Instala las dependencias:
```bash
npm install
```

3. Compila TypeScript:
```bash
npx tsc
```

## Uso

Ejecuta la aplicación:
```bash
node Library.js
```

### Opciones del Menú

La aplicación proporciona las siguientes funciones a través de un menú simple de consola:

1. **Registrar un Usuario**: Añade un nuevo usuario al sistema de la biblioteca
2. **Pedir un Libro**: Permite a un usuario registrado pedir prestado un libro disponible
3. **Devolver un Libro**: Procesa la devolución de un libro
4. **Eliminar un Libro**: Se elimina un libro de la libreria
5. **Ver Libros**: Muestra todos los libros en la biblioteca con sus detalles
6. **Ver Libros Prestados**: Muestra todos los préstamos actuales organizados por usuario
7. **Salir**: Cierra la aplicación

## Estructura del Proyecto

- `Book.ts`: Clase base para todos los tipos de libros
- `HorrorBook.ts`: Clase extendida para libros del género de horror
- `User.ts`: Clase de usuario para los clientes de la biblioteca
- `Library.ts`: Lógica principal de gestión de la biblioteca
- `Library.js`: UI de consola y punto de entrada de la aplicación

## Ejemplo

```typescript
// Creando una nueva biblioteca
const biblioteca = new Library("Biblioteca Central");

// Añadiendo libros
biblioteca.addBook(new Book("Orgullo y Prejuicio", "Jane Austen", 1813, "Romance", 2));
biblioteca.addBook(new HorrorBook("El Resplandor", "Stephen King", 1977, 3));

// Registrando un usuario
const idUsuario = biblioteca.registerUser("Juan", "Perez", "JP01");

// Pidiendo un libro
biblioteca.borrowBook(idUsuario, "El Resplandor");

// Devolviendo un libro
biblioteca.returnBook(idUsuario, "El Resplandor");
```

## Detalles Técnicos

- Construido con TypeScript
- Usa decoradores para registrar operaciones
- Implementa principios de POO incluyendo herencia y encapsulación

## Requisitos

- Node.js 14+
- TypeScript 4.3+
