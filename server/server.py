from flask import Flask
from flask_restful import Resource, Api
from db.nutrikit_db import *
from api.nutrikit import Categories, EditNutritionData, FoodsByCategory, AddFood, DeleteFood
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Categories, '/api/categories')
api.add_resource(EditNutritionData, '/api/foods')
api.add_resource(FoodsByCategory, '/api/foods/<string:category>')
api.add_resource(AddFood, '/api/foods')
api.add_resource(DeleteFood, '/api/foods')

if __name__ == '__main__':
    reset_db()
    app.run(debug=True)