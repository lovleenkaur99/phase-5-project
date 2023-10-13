#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, session
from flask_restful import Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from json import loads as unstringify_json


# Local imports
from config import app, db, api
from models import Question, Answer, Player, Score 
# Add your model imports

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3001", "methods": ["GET"]}})

bcrypt = Bcrypt(app)

migrate = Migrate(app, db)

db.init_app(app)

URL_PREFIX = '/api/v1'

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# # ===========================================FETCHING DATA================================================

# @app.route('/', methods=['GET'])
# def get_data_from_api():
    
#     try: 
#         response1 = request.get("https://opentdb.com/api.php?amount=10&category=31&type=multiple")
#         response2 = request.get("https://opentdb.com/api.php?amount=10&category=32&type=multiple")
#         response3 = request.get("https://opentdb.com/api.php?amount=10&category=9&type=multiple")

#         if response1.status_code == 200 and response2.status_code == 200 and response3.status_code == 200:
#             data1 = response1.json()
#             data2 = response2.json()
#             data3 = response3.json()

#             combine_data = { 
#                 "data_from_api1": data1,
#                 "data_from_api2": data2,
#                 "data_from_api3": data3
#             }

#             return jsonify(combine_data)
#         else: 
#             return jsonify({"error": "Failed to fetch from one or more api"}), 500
#     except Exception as e: 
#         return jsonify({ "error" : str(e)}), 500


# ============================================QUESTIONS===================================================

@app.get(URL_PREFIX + '/questions')
def get_questions():
    
    questions = Question.query.all()
    return [ question.to_dict() for question in questions ], 200

@app.get(URL_PREFIX + '/questions/<int:id>')
def get_question_by_id(id):
    try:
        question = Question.query.filter(Question.id == id).first()
        return question.to_dict(), 200
    except: 
        return {"error": "question not found"}, 404

# ===========================================ANSWERS======================================================

@app.get(URL_PREFIX + '/answers')
def get_answers():
    
    answers = Answer.query.all()
    return [answer.to_dict() for answer in answers], 200

@app.get(URL_PREFIX + '/answers/<int:id>')
def get_answers_by_id(id):
    
    try: 
        answer = Answer.query.filter(Answer.id == id).first()
        return answer.to_dict(), 200
    except: 
        return { "error": "answer not found"}, 404

# ===========================================PLAYERS=======================================================

@app.get(URL_PREFIX + '/players')
def get_players():

    players = Player.query.all()
    return [player.to_dict() for player in players], 200

@app.get(URL_PREFIX + '/players/<int:id>')
def get_players_by_id(id):
    try:
        player = Player.query.filter(Player.id ==id).first()
        return player.to_dict(), 200
    except: 
        return {"error": "player not found"}

@app.post(URL_PREFIX + '/players')
def create_player():

    try:

        print(request.data)

        data = unstringify_json(request.data)
        
        
        pw_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        player = Player(username = data['username'], password = pw_hash)

        db.session.add(player)
        db.session.commit()
        session['player_id'] = player.id 

        print(player.to_dict())
        return player.to_dict(), 201
    except: 
        return {"error": "player not found"}
    
# @app.post(URL_PREFIX + '/login')
# def login():
    
#     json_data = request.json

#     player= Player.Query.filter(Player.username == json_data['username']).first()
#     if player and bcrypt.check_password_hash(Player.password_hash, json_data['password']): 
#         session['player_id'] = player.id 
#         return jsonify(player.to_dict()), 202
#     else: 
#         return jsonify({"message": "Invalid Username or password "}), 401
# print("i just wanna see if this works")

# ===========================================SCORES========================================================

@app.post(URL_PREFIX + '/scores')
def create_scores():
    try:
        data = request.json

        score = Score(score = data['score'], player_id= data['player_id'] )

        db.session.add(score)
        db.session.commit()

        return score.to_dict(), 201
    
    except: 
        return {"errors": "score not found"}, 404

@app.patch(URL_PREFIX + '/scores/<int:id>')
def update_score(id):
    
    data = request.json
    
    Score.query.filter(Score.id == id).update(data)
    score = Score.query.filter(Score.id == id).first()
    
    db.session.add(score)
    db.session.commit()
    return score.to_dict(), 200

@app.get(URL_PREFIX + '/scores')
def get_scores():

    scores = Score.query.all()
    return [score.to_dict() for score in scores], 200

    
@app.get(URL_PREFIX + '/scores/<int:id>')
def get_scores_by_id(id):
    try: 
        score = Score.query.filter(Score.id == id).first()
        return score.to_dict(), 200
    except: 
        return {"error": "score not found"}

if __name__ == '__main__':
    app.run(port=5555, debug=True)

