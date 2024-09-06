document.addEventListener('DOMContentLoaded', function () {
    // 1. Countries offering more job opportunities
    fetch('/countries-data')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('countriesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Job Opportunities',
                        data: Object.values(data),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

    // 2. Salary expectation data (Box Plot)
    fetch('/salary-data')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('salaryChart').getContext('2d');
            new Chart(ctx, {
                type: 'boxplot',
                data: {
                    labels: ['Salary'],
                    datasets: [{
                        label: 'Salary Distribution',
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

    // 3. Entry-level job opportunities by companies
    fetch('/entry-level-data')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('entryLevelChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Entry-Level Jobs',
                        data: Object.values(data),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

    // 4. Yearly trends (Line Chart)
    fetch('/yearly-trends-data')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('yearlyTrendsChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: 'Average Salary',
                        data: data.salaries,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Job Count',
                        data: data.job_counts,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});
