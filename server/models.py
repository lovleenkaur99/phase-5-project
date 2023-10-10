from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, Session
from sqlalchemy.exc import NoResultFound
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


from config import db

# Models go here!

# ==============================================QUESTIONS==================================================

class Question(db.Model, SerializerMixin):

    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    question = db.Column(db.String)
    difficulty = db.Column(db.String)
    category = db.Column(db.String)

    answer = db.relationship('Answer', back_populates='question')

    serialize_rules = ('-answer', )

# ==============================================ANSWERS=====================================================

class Answer(db.Model, SerializerMixin):

    __tablename__ = "answers"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    answer_one = db.Column(db.String)
    answer_two = db.Column(db.String)
    answer_three = db.Column(db.String)
    correct_answer = db.Column(db.String)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))

    question = db.relationship('Question', back_populates='answer')

    serialize_rules = ('-question', )

# ===============================================PLAYERS=====================================================

class Player(db.Model, SerializerMixin):

    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String)
    password = db.Column(db.String)

    score = db.relationship('Score', back_populates='player')

    serialize_rules  = ('-score', )

# ===============================================SCORES======================================================

class Score(db.Model, SerializerMixin):

    __tablename__ = "scores"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    score = db.Column(db.Integer)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))

    player = db.relationship('Player', back_populates='score')

    serialize_rules = ('-player', )