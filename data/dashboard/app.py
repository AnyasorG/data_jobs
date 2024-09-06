from flask import Flask, jsonify, render_template
import pandas as pd
import os

app = Flask(__name__)

# Home route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Helper function to get the full absolute path to the salaries_cleaned.csv file
def get_csv_path():
    # Use the absolute path to the data file
    base_dir = os.path.abspath(os.path.dirname(__file__))
    csv_path = os.path.join(base_dir, '..', 'salaries_cleaned.csv')  # Adjusted this line
    return csv_path

# Route for job opportunities by country
@app.route('/countries-data')
def countries_data():
    csv_path = get_csv_path()
    df = pd.read_csv(csv_path)

    # Count job postings per country
    countries = df['employee_residence'].value_counts().to_dict()
    
    return jsonify(countries)

# Route for salary expectation data
@app.route('/salary-data')
def salary_data():
    csv_path = get_csv_path()
    df = pd.read_csv(csv_path)

    # Return list of salaries for box plot
    salary_distribution = df['salary_in_usd'].tolist()
    
    return jsonify(salary_distribution)

# Route for entry-level hiring data
@app.route('/entry-level-data')
def entry_level_data():
    csv_path = get_csv_path()
    df = pd.read_csv(csv_path)

    # Filter by entry-level employees
    entry_level = df[df['experience_level'] == 'Entry-level/Junior']

    # Count hires per company
    companies = entry_level['company_location'].value_counts().to_dict()
    
    return jsonify(companies)

# Route for yearly trends data
@app.route('/yearly-trends-data')
def yearly_trends_data():
    csv_path = get_csv_path()
    df = pd.read_csv(csv_path)

    # Group by year to get trends
    yearly_data = df.groupby('work_year').agg(
        average_salary=('salary_in_usd', 'mean'),
        job_count=('work_year', 'count')
    ).reset_index()

    return jsonify({
        'years': yearly_data['work_year'].tolist(),
        'salaries': yearly_data['average_salary'].tolist(),
        'job_counts': yearly_data['job_count'].tolist()
    })

if __name__ == '__main__':
    app.run(debug=True)
