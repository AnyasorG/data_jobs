fetch('/salary-data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('salaryChart').getContext('2d');
        new Chart(ctx, {
            type: 'boxplot',
            data: {
                labels: ['Salary Distribution'],
                datasets: [{
                    label: 'Salary in USD',
                    data: data,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            }
        });
    });
