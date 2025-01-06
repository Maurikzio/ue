from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/bienvenida", methods=["GET"])
def welcome():
  return jsonify({"message": "“¡Bienvenidos a nuestra API!”"})

if __name__ == "__main__":
  app.run()