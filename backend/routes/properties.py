from flask import Blueprint, request, jsonify
import sqlite3

bp = Blueprint('properties', __name__)

@bp.route('/api/properties', methods=['GET'])
def get_properties():
    conn = sqlite3.connect('real_estate.db')
    cursor = conn.cursor()

    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 10, type=int)
    offset = (page - 1) * page_size

    cursor.execute('SELECT COUNT(*) FROM properties')
    total_properties = cursor.fetchone()[0]

    cursor.execute('SELECT * FROM properties LIMIT ? OFFSET ?', (page_size, offset))
    properties = cursor.fetchall()
    conn.close()

    properties_dict = [
        {
            'id': row[0],
            'address': row[1],
            'price': row[2],
            'bedrooms': row[3],
            'bathrooms': row[4],
            'parking_spaces': row[5],
            'image_url': row[6],
            'description': row[7]
        }
        for row in properties
    ]

    response = {
        'properties': properties_dict,
        'total_properties': total_properties,
        'page': page,
        'page_size': page_size
    }

    return jsonify(response)

@bp.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    conn = sqlite3.connect('real_estate.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM properties WHERE id = ?', (id,))
    property = cursor.fetchone()
    conn.close()

    if property is None:
        return jsonify({'error': 'Property not found'}), 404

    property_dict = {
        'id': property[0],
        'address': property[1],
        'price': property[2],
        'bedrooms': property[3],
        'bathrooms': property[4],
        'parking_spaces': property[5],
        'image_url': property[6],
        'description': property[7]
    }

    return jsonify(property_dict)