from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)
db=SQLAlchemy(app)
migrate=Migrate(app, db)
login = LoginManager(app)
from app import routes, models

login.login_view='login'

if __name__ == '__main__':
    app.run(debug=True)

#sqlite does not support dropping or altering columns: www.sqlite.org/lang_altertable.html
with app.app_context():
    if db.engine.url.drivername == 'sqlite':
        migrate.init_app(app, db, render_as_batch=True)
    else:
        migrate.init_app(app, db)