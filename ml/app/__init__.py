import logging
import traceback

from celery import Celery, Task
from flask import Flask, jsonify
from flask_cors import CORS

from app.config.config import ApplicationConfig
from app.routes import routes
from app.utils.exceptions import AppError

logger = logging.getLogger()

celery = None


def create_app(config_class=ApplicationConfig):
    app = Flask(__name__)
    CORS(app, origins=["*"], supports_credentials=True)
    app.config.from_object(config_class)

    app.register_blueprint(routes)

    global celery
    celery = make_celery(app)

    # Custom app-level error (controlled)
    @app.errorhandler(AppError)
    def handle_app_error(e):
        logger.warning(f"AppError: {e.message}")
        return jsonify(error=e.message), e.status_code

    # Catch-all unhandled exception (500)
    @app.errorhandler(Exception)
    def handle_exception(e):
        trace = traceback.format_exc()
        logger.error(f"Unhandled Exception: {str(e)}\n{trace}")
        return jsonify(error="Internal Server Error"), 500

    return app


def make_celery(app):
    class ContextTask(Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery = Celery(
        app.name,
        broker=app.config["CELERY_BROKER_URL"],
        backend=app.config["CELERY_RESULT_BACKEND"],
        task_cls=ContextTask,
    )
    celery.set_default()
    app.extensions["celery"] = celery
    celery.autodiscover_tasks(["app"])

    return celery


app = create_app()
celery = make_celery(app)
