<p align="center">
  <strong><h1>Data Science Salary Analysis Dashboard</h1></strong>
</p>

<p align="center">
  <h2>Which countries offer more job opportunities?</h2>
</p>

<p align="center">
  <img src="https://github.com/AnyasorG/data_jobs/blob/main/images/datasalaryMap.gif" height="75%" width="75%">
</p>

<p align="center">
  <img src="https://github.com/AnyasorG/data_jobs/blob/main/images/datasalaryBarchart.gif" height="75%" width="75%">
</p>

<p align="center">
  <img src="https://github.com/AnyasorG/data_jobs/blob/main/images/datasalaryPiechart.gif" height="75%" width="75%">
</p>

<p align="center">
  <img src="https://github.com/AnyasorG/data_jobs/blob/main/images/datasalaryLinechart.gif" height="75%" width="75%">
</p>

# Data Science Salary Analysis Dashboard

## Project Description

This project is an in-depth analysis of data science salaries based on various factors such as job title, experience level, employment type, company size, remote work ratio, and geographical location. The data comes from the Kaggle dataset titled **Data Science Salary Landscape**, and the goal of the project is to extract key insights and create visualizations to provide actionable information for both professionals and employers in the data science field.

The dashboard provides detailed insights into:

- Salary distribution by job title
- Impact of experience level on salary
- Differences in salaries based on employment type
- Effect of remote work on compensation
- Geographical differences in salaries
- Company size and its influence on salary
- Year-on-year salary growth trends

## Key Insights

### 1. Salary Distribution by Job Title
Senior positions like Data Scientist, Machine Learning Engineer, and Data Engineer command significantly higher salaries compared to more entry-level positions such as Data Analyst.

### 2. Experience Level vs Salary
A positive correlation between experience level and salary was observed, with senior positions receiving higher compensation.

### 3. Employment Type Analysis
Full-time roles tend to offer more stable salary structures, while freelancers and contractors have more variability in their earnings.

### 4. Remote Work and Salaries
Fully remote positions offer competitive salaries, especially in regions with higher living costs.

### 5. Geographical Differences
Countries like the US and the UK offer higher average salaries compared to regions like Eastern Europe or Asia.

### 6. Impact of Company Size
Larger companies typically offer higher salaries than small or medium-sized enterprises (SMEs).

### 7. Year-on-Year Salary Growth
The analysis showed year-on-year growth, particularly for specialized technical roles.

## Dataset

The dataset used in this project was sourced from Kaggle:

- **Dataset**: [Data Science Salary Landscape](https://www.kaggle.com/datasets/lainguyn123/data-science-salary-landscape)
- **Size**: ~5,000 entries
- **Features**: Job title, experience level, company size, location, salary, remote work ratio, and more

### Data Cleaning
- Removed unnecessary columns such as `salary_currency`.
- Handled missing values.
- Mapped company size abbreviations (`L`, `M`, `S`) to full names (Large, Medium, Small).
- Filtered dataset by country, experience level, and remote ratio for specific insights.

## Installation and Setup

### Prerequisites
To run this project locally, you'll need:

- **Python 3.x**
- **Flask**: For serving the dashboard
- **Pandas**: For data manipulation
- **Chart.js and Plotly**: For visualizations
- **D3.js**: For handling data and rendering visualizations
- **AnyChart**: For interactive maps

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/YourUsername/your-repository.git
    ```

2. Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Run the Flask server:
    ```bash
    flask run
    ```

4. Open the browser and navigate to `http://127.0.0.1:5000/` to view the dashboard.

## Visualizations

- **Bar Charts**: Display average salaries by job category, experience level, and job title.
- **Pie Charts**: Breakdown of company size and work settings for entry-level roles in the US.
- **Line Charts**: Trends over time, including salary and job count growth.
- **Maps**: Job opportunities visualized across countries using interactive maps.

## Key Features

- **Interactive Dashboards**: Users can filter by year, job title, experience level, and other parameters to see how salaries and job trends change.
- **Comprehensive Salary Insights**: The project gives detailed insights on salary variations across different parameters such as location, job role, and experience level.
- **Data Cleaning & Preprocessing**: Ensures clean and usable data to generate accurate visualizations.

## Usage

- **For Job Seekers**: Get insights into which roles and locations offer the highest salaries, and target your job search accordingly.
- **For Employers**: Understand market trends to offer competitive salaries based on location, experience, and job type.
- **For HR & Recruiters**: Identify which experience levels and job types are most in-demand and adjust recruitment strategies accordingly.

### Ethical Considerations
We used a publicly available dataset. The dataset contains no personal information or information that could cause any harm to individuals. The source has been duly credited. Our visualizations are original. The code used for the project is publicly available on this repository, promoting transparency in our data handling.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- Name: Godswill Anyasor
- Email: anyasorgodswill@gmail.com
- GitHub: [https://github.com/AnyasorG/data_jobs.git](https://github.com/AnyasorG/data_jobs.git)
