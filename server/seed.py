#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import random

# Local imports
from app import app
from models import db, Question, Answer, Player, Score

if __name__ == '__main__':
    faker = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here

        print('Deleting old seeds ...')

        Question.query.delete()

        Answer.query.delete()

        Player.query.delete()

        Score.query.delete()

        print('Creating new questions ...')

        questions_list = []

        for _ in range(5):

            category_list = ['science', 'math', 'english', 'art', 'geography']
            
            new_questions = Question(question = faker.sentence(), difficulty=faker.word(), category=random.choice(category_list))
            
            questions_list.append(new_questions)
            
            db.session.add_all(questions_list)
            db.session.commit()

        print('Creating new answers ...')

        answers_list = []

        for _ in range(5):
            new_answers = Answer(
                answer_one = faker.name(), 
                answer_two = faker.name(),
                answer_three = faker.name(),
                correct_answer = faker.first_name(),
                question = random.choice(questions_list)
                )
            
            answers_list.append(new_answers)
            db.session.add_all(answers_list)
            db.session.commit()

        print('Creating new players ...')

        players_list = []

        for _ in range(2):
            new_player = Player(username = faker.name(), password = faker.word())
            
            players_list.append(new_player)
            db.session.add_all(players_list)
            db.session.commit()


        print('Creating new scores ...')

        scores_list = []

        for _ in range(2):
            new_score = Score(score = random.randint(1,20), player = random.choice(players_list))

            scores_list.append(new_score)
            db.session.add_all(scores_list)
            db.session.commit()


