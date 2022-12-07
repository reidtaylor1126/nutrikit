import hashlib, secrets, binascii
from datetime import timedelta
from psycopg2.extensions import AsIs
from db.swen_344_db_utils import *

def reset_db():
    return exec_sql_file('server/config/setup_db.sql')

def get_categories():
    sql = 'SELECT category FROM nutrikit_categories'
    result = exec_get_all(sql)
    cat_list = []
    for row in result:
        cat_list.append(row[0])
    return cat_list

def get_nutrition_data(category):
    sql = 'SELECT json_agg(t) FROM (SELECT nutrikit_foods.id, name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate \
            FROM nutrikit_foods JOIN nutrikit_categories ON nutrikit_foods.fk_category_id = nutrikit_categories.id \
            WHERE category = %s) t'
    return exec_get_one(sql, (category,))[0]

def delete_food(id):
    print(type(id))
    sql = 'DELETE FROM nutrikit_foods WHERE id = %s RETURNING *'
    result = exec_commit(sql, (id,))
    print(result)
    return result

def update_nutrition_data(id, data):
    sql = 'SELECT name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate, fk_category_id \
            FROM nutrikit_foods JOIN nutrikit_categories ON nutrikit_foods.fk_category_id = nutrikit_categories.id \
            WHERE nutrikit_foods.id = %s'
    
    old_data_raw = exec_get_one(sql, (id,))
    print(old_data_raw)

    if len(old_data_raw) == 0:
        return None

    old_data = {
        'name': old_data_raw[0],
        'calories': old_data_raw[1],
        'totalFat': old_data_raw[2],
        'saturatedFat': old_data_raw[3],
        'transFat': old_data_raw[4],
        'protein': old_data_raw[5],
        'carbohydrate': old_data_raw[6],
        'fk_category_id': old_data_raw[7]
    }

    for key in old_data.keys():
        if key in data.keys():
            if(data[key] != None):
                old_data[key] = data[key]

    if('category') in data.keys():
        category = data['category']
        print(category)
        sql = 'SELECT id FROM nutrikit_categories WHERE category = %s'
        cat_id = exec_get_one(sql, (category,))
        if cat_id != None and len(cat_id) != 0:
            old_data['fk_category_id'] = cat_id[0]

    sql = 'UPDATE nutrikit_foods SET name = %s, calories = %s, totalFat = %s, saturatedFat = %s, transFat = %s, protein = %s, carbohydrate = %s WHERE id = %s RETURNING id'

    result = exec_commit(sql, (old_data['name'], old_data['calories'], old_data['totalFat'], old_data['saturatedFat'], old_data['transFat'], old_data['protein'], old_data['carbohydrate'], id))
    
    return id


def add_food(name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate):
    sql = 'SELECT id FROM nutrikit_categories WHERE category = %s'
    cat_id = exec_get_one(sql, (category,))
    sql = 'INSERT INTO nutrikit_foods (\
                name, \
                fk_category_id, \
                calories, \
                totalFat, \
                saturatedFat, \
                transFat, \
                protein, \
                carbohydrate \
            ) VALUES \
            (%s, %s, %s, %s, %s, %s, %s, %s) \
            RETURNING id'
    new_id = exec_commit(sql, (name, cat_id, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate))

    sql = 'SELECT name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate \
            FROM nutrikit_foods JOIN nutrikit_categories ON nutrikit_categories.id = nutrikit_foods.fk_category_id \
            WHERE nutrikit_foods.id = %s'

    return exec_get_one(sql, (new_id,))
