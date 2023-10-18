#!/usr/bin/env python3

# Standard library imports
# NOTE: `html.unescape()` may be useful to decode HTML entity strings`
import html, requests

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
        print("\n\nStarting seeding process...\n")

        print('Deleting old seeds ...')
        Question.query.delete()
        Answer.query.delete()
        Player.query.delete()
        Score.query.delete()
        db.session.commit()

        """ Pinging API to Seed Questions to DB """
        # NOTE: API Capped at 50 Objects
        num_quizzes = 50
        CATEGORICAL_MAPPER = {
            # "General Knowledge": 9,
            # "Science: Gadgets": 30, # TODO: Check why not populating.
            "Entertainment: Japanese Anime & Manga": 31
        }
        for category, code in CATEGORICAL_MAPPER.items():
            api_url = f"https://opentdb.com/api.php?amount={num_quizzes}&category={code}&type=multiple"
            api_response = requests.get(api_url)

            print(f"\nObtaining {num_quizzes} objects from the API. (Category: `{category}`)\n")
            if api_response.status_code == 200:
                data = api_response.json()
                # print(data["results"])
                FEATURES = {
                    "questions":  ["question", "difficulty", "category"],
                    "answers": ["incorrect_answers", "correct_answer"]
                    }
                questions_to_add_to_db, answers_to_add_to_db = [], []
                for index, quiz in enumerate(data["results"]):
                    # Iteratively creates question DB models using our mapper
                    questions_to_add_to_db.append(Question(
                        question = quiz[FEATURES["questions"][0]],
                        difficulty = quiz[FEATURES["questions"][1]],
                        category = quiz[FEATURES["questions"][2]]
                    ))
                    # Iteratively creates answer DB models using our mapper
                    answers_to_add_to_db.append(Answer(
                        answer1 = quiz[FEATURES["answers"][0]][0],
                        answer2 = quiz[FEATURES["answers"][0]][1],
                        answer3 = quiz[FEATURES["answers"][0]][2],
                        answer4 = quiz[FEATURES["answers"][1]],
                        correct = quiz[FEATURES["answers"][1]],
                        question = questions_to_add_to_db[index]
                    ))
                print(f"\nCommitting structured objects to SQLite database. (Category: `{category}`\n")
                db.session.add_all(questions_to_add_to_db)
                db.session.add_all(answers_to_add_to_db)
                db.session.commit()
            else:
                raise RuntimeError(f"API request failed with status code: {api_response.status_code}")

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

        print("\nSeeding complete.\n\n")


