from flask import Flask, jsonify, render_template, request
import pandas as pd
import os
import random

app = Flask(__name__)

# Helper function to get the full absolute path to the salaries_cleaned.csv file
def get_csv_path():
    base_dir = os.path.abspath(os.path.dirname(__file__))
    csv_path = os.path.join(base_dir, 'static', 'data', 'salaries_cleaned.csv')
    return csv_path

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/countries-data')
def countries_data():
    try:
        csv_path = get_csv_path()
        df = pd.read_csv(csv_path)

        # Count job postings per country
        countries = df['employee_residence'].value_counts().to_dict()
        return jsonify(countries)

    except Exception as e:
        print(f"Error loading countries data: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Updated route to handle Job Category, Experience Level, and Job Title
@app.route('/salary-data')
def salary_data():
    try:
        csv_path = get_csv_path()
        df = pd.read_csv(csv_path)

        # Determine the category to filter by (jobCategory, experienceLevel, or jobTitle)
        category = request.args.get('category', 'jobTitle')

        if category == 'jobTitle':
            # Group by job title and calculate average salary
            grouped_data = df.groupby('job_title').agg(average_salary=('salary_in_usd', 'mean')).reset_index()
            labels = grouped_data['job_title'].tolist()
            salaries = grouped_data['average_salary'].tolist()

        elif category == 'experienceLevel':
            # Group by experience level and calculate average salary
            grouped_data = df.groupby('experience_level').agg(average_salary=('salary_in_usd', 'mean')).reset_index()
            labels = grouped_data['experience_level'].tolist()
            salaries = grouped_data['average_salary'].tolist()

        elif category == 'jobCategory':
            # Group by employment type (or other job category) and calculate average salary
            grouped_data = df.groupby('employment_type').agg(average_salary=('salary_in_usd', 'mean')).reset_index()

            # Replace abbreviations (FT, PT, CT) with full forms
            employment_type_full = {
                'FT': 'Full-Time',
                'PT': 'Part-Time',
                'CT': 'Contract',
                'FL': 'Freelance'
            }
            grouped_data['employment_type'] = grouped_data['employment_type'].replace(employment_type_full)

            labels = grouped_data['employment_type'].tolist()
            salaries = grouped_data['average_salary'].tolist()

        else:
            return jsonify({'error': 'Invalid category'}), 400

        return jsonify({
            'labels': labels,
            'salaries': salaries
        })

    except Exception as e:
        print(f"Error loading salary data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/us-entry-level-data')
def us_entry_level_data():
    try:
        # Load the CSV file
        csv_path = get_csv_path()
        df = pd.read_csv(csv_path)

        # Filter for US ('US') and entry-level employees
        df_filtered = df[(df['company_location'] == 'US') & (df['experience_level'] == 'Entry-level/Junior')]

        # Check if the filtered data is empty
        if df_filtered.empty:
            print(f"No data found for US and Entry-level employees.")
            return jsonify({"message": "No data available for the selected criteria"}), 200

        # Filter by year if provided
        year = request.args.get('year', 'all')
        if year != 'all':
            df_filtered = df_filtered[df_filtered['work_year'] == int(year)]
            print(f"Filtered Data for Year {year}: \n{df_filtered.head()}")

        # Map 'L', 'M', 'S' to full forms 'Large', 'Medium', 'Small' using .loc to avoid the warning
        size_mapping = {'L': 'Large', 'M': 'Medium', 'S': 'Small'}
        df_filtered.loc[:, 'company_size'] = df_filtered['company_size'].replace(size_mapping)

        # Count hires per company size (now with full names)
        companies = df_filtered['company_size'].value_counts().to_dict()

        return jsonify(companies)

    except Exception as e:
        # Log the error for easier debugging
        print(f"Error loading US entry-level data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/us-work-setting-data')
def us_work_setting_data():
    try:
        # Load the CSV file
        csv_path = get_csv_path()
        df = pd.read_csv(csv_path)

        # Filter for US ('US') and entry-level employees
        df_filtered = df[(df['company_location'] == 'US') & (df['experience_level'] == 'Entry-level/Junior')]

        # Check if the filtered data is empty
        if df_filtered.empty:
            print(f"No data found for US and Entry-level employees.")
            return jsonify({"message": "No data available for the selected criteria"}), 200

        # Filter by year if provided
        year = request.args.get('year', 'all')
        if year != 'all':
            df_filtered = df_filtered[df_filtered['work_year'] == int(year)]
            print(f"Filtered Data for Year {year}: \n{df_filtered.head()}")

        # Process work setting data based on remote_ratio
        work_setting_data = {
            'Remote': int((df_filtered['remote_ratio'] == 100).sum()),  # Convert int64 to int
            'Hybrid': int(((df_filtered['remote_ratio'] > 0) & (df_filtered['remote_ratio'] < 100)).sum()),  # Convert int64 to int
            'Onsite': int((df_filtered['remote_ratio'] == 0).sum())  # Convert int64 to int
        }

        return jsonify(work_setting_data)

    except Exception as e:
        # Log the error for easier debugging
        print(f"Error loading US work setting data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/yearly-trends-data')
def yearly_trends_data():
    try:
        csv_path = get_csv_path()
        df = pd.read_csv(csv_path)

        # Group data by year and aggregate salary and job count
        yearly_data = df.groupby('work_year').agg(
            average_salary=('salary_in_usd', 'mean'),
            job_count=('work_year', 'count')
        ).reset_index()

        # Prepare the response
        return jsonify({
            'years': yearly_data['work_year'].tolist(),
            'salaries': yearly_data['average_salary'].tolist(),
            'job_counts': yearly_data['job_count'].tolist()
        })

    except Exception as e:
        print(f"Error loading yearly trends data: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
