from flask import Blueprint, request, jsonify
from models.user import User
import sqlite3

bp = Blueprint('auth', __name__)

ADMIN_CREDENTIALS = {
    'username': 'admin_username',
    'password': 'admin_password'
}

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    conn = sqlite3.connect('real_estate.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username=?', (username,))
    user = cursor.fetchone()
    conn.close()

    is_admin = username == ADMIN_CREDENTIALS['username'] and password == ADMIN_CREDENTIALS['password']

    if user and User(user[0], user[1], user[2], user[3]).check_password(password):
        return jsonify({'token': 'dummy_token', 'is_admin': is_admin}), 200
    elif is_admin:
        return jsonify({'token': 'dummy_token', 'is_admin': True}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']
    user = User(None, username, password, email)
    conn = sqlite3.connect('real_estate.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
                   (username, user.password, email))
    conn.commit()
    conn.close()
    return jsonify({'message': 'User created successfully'}), 201

@bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data['email']
    conn = sqlite3.connect('real_estate.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email=?', (email,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        # Here, you would normally send an email with the password reset link
        # For this example, we'll just return a success message
        return jsonify({'message': 'Password reset link sent to your email'}), 200
    return jsonify({'message': 'Email not found'}), 404
