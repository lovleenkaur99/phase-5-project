#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Question, Answer, Player, Score 
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# ===========================================FETCHING DATA================================================

@app.route('/', methods=['GET'])
def get_data_from_api():
    pass

# ============================================QUESTIONS===================================================

@app.get('/questions')
def get_questions():
    
    questions = Question.query.all()
    return [ question.to_dict() for question in questions ], 200

@app.get('/questions/<int:id>')
def get_question_by_id(id):
    try:
        question = Question.query.filter(Question.id == id).first()
        return question.to_dict(), 200
    except: 
        return {"error": "question not found"}, 404

# ===========================================ANSWERS======================================================

@app.get('/answers')
def get_answers():
    
    answers = Answer.query.all()
    return [answer.to_dict() for answer in answers], 200

@app.get('/answers/<int:id>')
def get_answers_by_id(id):
    
    try: 
        answer = Answer.query.filter(Answer.id == id).first()
        return answer.to_dict(), 200
    except: 
        return { "error": "answer not found"}, 404

# ===========================================PLAYERS=======================================================

@app.get('/players')
def get_players():

    players = Player.query.all()
    return [player.to_dict() for player in players], 200

@app.get('/players/<int:id>')
def get_players_by_id(id):
    try:
        player = Player.query.filter(Player.id ==id).first()
        return player.to_dict(), 200
    except: 
        return {"error": "player not found"}

@app.post('/players')
def create_player():
    try:
        data = request.json

        players = Player(username = data['username'], password = data['password'])

        db.session.add(players)
        db.session.commit()

        return players.to_dict(), 201
    except: 
        return {"error": "player not found"}

# ===========================================SCORES========================================================

@app.post('/scores')
def create_scores():
    try:
        data = request.json

        score = Score(score = data['score'], player_id= data['player_id'] )

        db.session.add(score)
        db.session.commit()

        return score.to_dict(), 201
    
    except: 
        return {"errors": "score not found"}, 404

@app.patch('/scores/<int:id>')
def update_score(id):
    
    data = request.json
    
    Score.query.filter(Score.id == id).update(data)
    score = Score.query.filter(Score.id == id).first()
    
    db.session.add(score)
    db.session.commit()
    return score.to_dict(), 200

@app.get('/scores')
def get_scores():

    scores = Score.query.all()
    return [score.to_dict() for score in scores], 200

    
@app.get('/scores/<int:id>')
def get_scores_by_id(id):
    try: 
        score = Score.query.filter(Score.id == id).first()
        return score.to_dict(), 200
    except: 
        return {"error": "score not found"}

if __name__ == '__main__':
    app.run(port=5555, debug=True)

