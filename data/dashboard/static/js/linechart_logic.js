document.addEventListener('DOMContentLoaded', function () {
    let chartInstance; // Global variable to store the active chart instance

    // Add event listeners to radio buttons to switch between charts
    document.querySelectorAll('input[name="chartType"]').forEach(radio => {
        radio.addEventListener("change", switchChart);
    });

    // Function to switch chart data without changing the canvas
    function switchChart() {
        let selectedChart = document.querySelector('input[name="chartType"]:checked').value;

        // Load and render the line chart with the selected data
        loadLineChart(selectedChart);
    }

    // Function to load the line chart with dynamic datasets
    function loadLineChart(chartType) {
        fetch("/yearly-trends-data")
            .then(response => response.json())
            .then(function (data) {
                let years = data.years;
                let chartData;

                // Select the appropriate dataset based on the chart type
                if (chartType === "salaryTrendChart") {
                    chartData = data.salaries;
                } else if (chartType === "jobCountTrendChart") {
                    chartData = data.job_counts;
                }

                // Get the canvas context for the line chart (single canvas used for both)
                let ctx = document.getElementById('lineChart').getContext('2d');

                // Destroy the previous chart instance if it exists
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Create the new chart instance
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: years,
                        datasets: [{
                            label: chartType === "salaryTrendChart" ? 'Average Salary (USD)' : 'Job Count',
                            data: chartData,
                            borderColor: chartType === "salaryTrendChart" ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
                            backgroundColor: chartType === "salaryTrendChart" ? 'rgba(75, 192, 192, 0.2)' : 'rgba(153, 102, 255, 0.2)', // Light fill color
                            fill: true, // Enable fill below the line
                            tension: 0.4 // Smooth lines
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true
                            },
                            title: {
                                display: true,
                                text: chartType === "salaryTrendChart" ? 'Salary Trends Over the Years' : 'Job Count Trends Over the Years',
                                font: {
                                    size: 18,
                                    weight: 'bold'
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Year',
                                    font: {
                                        size: 16
                                    }
                                }
                            },
                            y: {
                                beginAtZero: chartType === "jobCountTrendChart", // Start at zero for job counts
                                title: {
                                    display: true,
                                    text: chartType === "salaryTrendChart" ? 'Average Salary (USD)' : 'Job Count',
                                    font: {
                                        size: 16
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(err => console.error("Error loading line chart:", err));
    }

    // Initial chart load on page load
    loadLineChart('salaryTrendChart'); // Load the salary trend chart by default
});
