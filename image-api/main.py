from app import app
from app.config.constants import PORT

if __name__ == "__main__":
    app.run(debug=True, port=PORT)
