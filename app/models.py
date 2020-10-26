from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login

wordlist_word = db.Table(
    "wordlists_words",
    db.Column("wordlist_id", db.Integer, db.ForeignKey("wordlist.id")),
    db.Column("word_id", db.Integer, db.ForeignKey("word.id")),
)

class User(UserMixin, db.Model):
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(64), index=True, unique=True)
    email=db.Column(db.String(120), index=True, unique=True)
    password_hash=db.Column(db.String(128))
    wordlists=db.relationship('Wordlist', backref='learner', lazy='dynamic')

    def __repr__(self):
        return self.username
    
    def set_password(self, password):
        self.password_hash=generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Wordlist(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(64), index=True, unique=True)
    timestamp=db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    

    def __repr__(self):
        return 'Wordlist title: {}'.format(self.title)

class Word(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(64), unique=True)
    part=db.Column(db.String(64))
    definition=db.Column(db.String(128))
    wordlists = db.relationship('Wordlist', secondary=wordlist_word, backref='words', lazy= 'dynamic')

    def __repr__(self):
        return 'Word name is: {}'.format(self.name)

@login.user_loader
def load_user(id):
    return User.query.get(int(id))