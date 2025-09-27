from flask import Blueprint

from .images import images_bp

routes = Blueprint("routes", __name__)

routes.register_blueprint(images_bp, url_prefix="/images")
