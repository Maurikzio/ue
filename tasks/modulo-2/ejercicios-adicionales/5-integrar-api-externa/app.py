from fastapi import FastAPI

app = FastAPI()


@app.get('/')  # path operation decorator
def root():  # path operation function
    return {"message": "Hello there!"}


@app.get("/api/search/{book_title}")
def search_book(book_title: str):
    url = f"https://www.googleapis.com/books/v1/volumes?q={book_title}"
    # response = requests.get(url)
    # print(response)
    return {"message": "Hello world!"}
