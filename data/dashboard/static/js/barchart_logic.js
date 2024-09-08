document.addEventListener('DOMContentLoaded', function () {
    let currentCategory = 'jobTitle'; // Default to 'Job Title'

    loadBarChart(currentCategory);

    document.getElementById('jobCategoryBtn').addEventListener('click', function () {
        currentCategory = 'jobCategory';
        toggleActiveButton('jobCategoryBtn');
        loadBarChart(currentCategory);
    });

    document.getElementById('experienceLevelBtn').addEventListener('click', function () {
        currentCategory = 'experienceLevel';
        toggleActiveButton('experienceLevelBtn');
        loadBarChart(currentCategory);
    });

    document.getElementById('jobTitleBtn').addEventListener('click', function () {
        currentCategory = 'jobTitle';
        toggleActiveButton('jobTitleBtn');
        loadBarChart(currentCategory);
    });

    function toggleActiveButton(activeButtonId) {
        document.getElementById('jobCategoryBtn').classList.remove('active');
        document.getElementById('experienceLevelBtn').classList.remove('active');
        document.getElementById('jobTitleBtn').classList.remove('active');
        document.getElementById(activeButtonId).classList.add('active');
    }

    function loadBarChart(category) {
        let endpoint = `/salary-data?category=${category}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(function (data) {
                const labels = data.labels;
                const salaries = data.salaries;

                const ctx = document.getElementById('DataJobChart').getContext('2d');

                if (window.barChart) {
                    window.barChart.destroy();
                }

                window.barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Average Salary (USD)',
                            data: salaries,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Average Salary (USD)'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: category === 'jobCategory' ? 'Job Categories' : category === 'experienceLevel' ? 'Experience Levels' : 'Job Titles'
                                }
                            }
                        }
                    }
                });
            })
            .catch(err => console.error("Error loading bar chart data:", err));
    }
});
