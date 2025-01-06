from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ValidationError
import json

app = FastAPI()
JSON_PATH = "books.json"

class Book(BaseModel):
  title: str
  author: str
  publication_year: int

@app.post('/books')
def save_book(book: Book):
  new_book = book.dict()

  try:
    with open(JSON_PATH, "r") as file:
      saved_books = json.load(file)
  except FileNotFoundError:
    saved_books = []

  saved_books.append(new_book)

  with open(JSON_PATH, "w") as file:
    json.dump(saved_books, file, indent=4)

  return {"message": "Book created", "book": new_book}

