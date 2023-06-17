from dotenv import load_dotenv
import os
import mysql.connector
from flask import Flask, request, redirect, render_template

# Load environment variables from .env file
load_dotenv()

# Access the database credentials from the environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_database = os.getenv("DB_DATABASE")

# Connect to the database
conn = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database
)

# Create the Flask application object
app = Flask(__name__)
visitors = 0

# Define your routes and other Flask configurations below
# ...

@app.route('/register', methods=['POST'])
def register():
    # Get the form data
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm-password']

    # Check if the password and confirm password match
    if password == confirm_password:
        # Perform validation, hashing passwords, etc.
        # Save the user details to the database using the connection object

        # Create a cursor object from the connection
        cursor = conn.cursor()

        # Prepare the SQL statement
        sql = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        values = (username, email, password)

        # Execute the SQL statement using the cursor
        cursor.execute(sql, values)

        # Commit the changes to the database
        conn.commit()

        # Close the cursor
        cursor.close()

        # Return success message
        return 'User registration successful'

        # Redirect to the movies page
        return redirect('/movies')
    else:
        # Passwords do not match, return an error message
        return 'Passwords do not match'

# ...

# Render login.html page
@app.route('/login', methods=['GET'])
def render_login():
    return render_template('login.html')

# Handle login form submission
@app.route('/login', methods=['POST'])
def handle_login():
    username = request.form.get('username')
    password = request.form.get('password')

    # Perform login validation and database checks here
    # Create a cursor object from the connection
    cursor = conn.cursor()

    # Prepare the SQL statement
    sql = "SELECT * FROM users WHERE username = %s AND password = %s"
    values = (username, password)

    # Execute the SQL statement using the cursor
    cursor.execute(sql, values)

    # Fetch the first row from the result set
    user = cursor.fetchone()

    # Close the cursor
    cursor.close()

    if user:
        # Login is successful, redirect to movies.html
        return redirect('/movies')
    else:
        # Login fails, return an error message to the user
        error_message = "Incorrect username or password."
        return render_template('login.html', error=error_message)

# Define other view functions for other pages



@app.route('/submit_review', methods=['POST'])
def submit_review():
    movie_id = request.form.get('movie_id')
    username = request.form.get('username')
    review = request.form.get('review')
    rating = request.form.get('rating')

    # Create a cursor object from the connection
    cursor = conn.cursor()

    # Check if the username exists in the database
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        # Concatenate the username with the review
        review_with_username = f"{username}: {review}"

        # Update the existing user's review and rating for the movie
        query = "UPDATE users SET reviews = %s, rating = %s WHERE movie_id = %s"
        cursor.execute(query, (review_with_username, rating, movie_id))
    else:
        # Return an error response indicating an incorrect username
        return "Incorrect username"

    # Commit the changes to the database
    conn.commit()

    # Retrieve the updated reviews and rating for the referring movie ID
    query = "SELECT reviews, rating FROM users WHERE movie_id = %s"
    cursor.execute(query, (movie_id,))
    updated_row = cursor.fetchone()

    # Redirect the user back to the referring page and pass the updated data
    return redirect(f'/movie-detail.html?id={movie_id}&reviews={review_with_username}&rating={rating}')



# Define other view functions for other pages

@app.route('/')
def index():
    global visitors
    visitors += 1
    return render_template('index.html', visitor_count=visitors)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/registration')
def registration():
    return render_template('registration.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/movies')
def movies():
    return render_template('movies.html')

@app.route('/movie-detail')
def movie_detail():
    return render_template('movie-detail.html')

@app.route('/home-movie-detail')
def home_movie_detail():
    return render_template('home-movie-detail.html')

@app.route('/watchlist')
def watchlist():
    return render_template('watchlist.html')

if __name__ == '__main__':
    app.run()

