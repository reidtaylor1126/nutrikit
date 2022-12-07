from http import HTTPStatus
from functools import wraps
import flask_restful
from flask_restful import Resource, request, reqparse
from flask import Response
from db.nutrikit_db import get_categories, get_nutrition_data, add_food, update_nutrition_data, delete_food

class Categories(Resource):
    def get(self):
        return get_categories()

class FoodsByCategory(Resource):
    def get(self, category):
        return get_nutrition_data(category)

class EditNutritionData(Resource):
    def put(self):
        print(request.headers)
        print("body", request.get_json())
        id = request.args.get('id')
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('category', type=str)
        parser.add_argument('calories', type=int)
        parser.add_argument('totalfat', type=float)
        parser.add_argument('saturatedfat', type=float)
        parser.add_argument('transfat', type=float)
        parser.add_argument('protein', type=float)
        parser.add_argument('carbohydrate', type=float)
        args = parser.parse_args()
        print(args)

        result = update_nutrition_data(id, args)

        if result == None:
            return Response(f'Food with id \'{id}\' does not exist.', 404)
        
        return result

class AddFood(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('category', type=str)
        parser.add_argument('calories', type=int)
        parser.add_argument('totalfat', type=float)
        parser.add_argument('saturatedfat', type=float)
        parser.add_argument('transfat', type=float)
        parser.add_argument('protein', type=float)
        parser.add_argument('carbohydrate', type=float)
        args = parser.parse_args()

        result = add_food(args['name'], args['category'], args['calories'], args['totalfat'], args['saturatedfat'], args['transfat'], args['protein'], args['carbohydrate'])
        return result     

class DeleteFood(Resource):
    def delete(self):
        id = int(request.args.get('id'))

        return delete_food(id)