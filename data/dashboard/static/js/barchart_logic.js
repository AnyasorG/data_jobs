// This event listener ensures the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {

    let currentCategory = 'jobTitle'; // Default category set to 'Job Title' for the bar chart

    // Initial load of the bar chart with the default category
    loadBarChart(currentCategory);

    // Event listener for 'Job Category' button click
    document.getElementById('jobCategoryBtn').addEventListener('click', function () {
        currentCategory = 'jobCategory'; // Set category to 'Job Category'
        toggleActiveButton('jobCategoryBtn'); // Highlight the clicked button as active
        loadBarChart(currentCategory); // Load the chart for the selected category
    });

    // Event listener for 'Experience Level' button click
    document.getElementById('experienceLevelBtn').addEventListener('click', function () {
        currentCategory = 'experienceLevel'; // Set category to 'Experience Level'
        toggleActiveButton('experienceLevelBtn'); // Highlight the clicked button as active
        loadBarChart(currentCategory); // Load the chart for the selected category
    });

    // Event listener for 'Job Title' button click
    document.getElementById('jobTitleBtn').addEventListener('click', function () {
        currentCategory = 'jobTitle'; // Set category to 'Job Title'
        toggleActiveButton('jobTitleBtn'); // Highlight the clicked button as active
        loadBarChart(currentCategory); // Load the chart for the selected category
    });

    // Function to highlight the active button and remove highlight from others
    function toggleActiveButton(activeButtonId) {
        // Remove the 'active' class from all buttons
        document.getElementById('jobCategoryBtn').classList.remove('active');
        document.getElementById('experienceLevelBtn').classList.remove('active');
        document.getElementById('jobTitleBtn').classList.remove('active');
        // Add the 'active' class to the clicked button
        document.getElementById(activeButtonId).classList.add('active');
    }

    // Function to load the bar chart based on the selected category
    function loadBarChart(category) {
        // API endpoint to fetch data for the selected category
        let endpoint = `/salary-data?category=${category}`;

        // Fetch the salary data from the server based on the category
        fetch(endpoint)
            .then(response => response.json()) // Convert the response to JSON format
            .then(function (data) {
                const labels = data.labels; // Extract labels (job titles, categories, or experience levels)
                const salaries = data.salaries; // Extract salary data

                // Get the canvas context for the chart
                const ctx = document.getElementById('DataJobChart').getContext('2d');

                // If there is an existing chart, destroy it to avoid overlapping
                if (window.barChart) {
                    window.barChart.destroy();
                }

                // Create a new bar chart using Chart.js
                window.barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels, // X-axis labels
                        datasets: [{
                            label: 'Average Salary (USD)', // Dataset label
                            data: salaries, // Y-axis data (salaries)
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                            borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
                            borderWidth: 1 // Border width of bars
                        }]
                    },
                    options: {
                        responsive: true, // Make the chart responsive to screen size
                        scales: {
                            y: {
                                beginAtZero: true, // Y-axis starts from zero
                                title: {
                                    display: true, // Display title for Y-axis
                                    text: 'Average Salary (USD)' // Y-axis title text
                                }
                            },
                            x: {
                                title: {
                                    display: true, // Display title for X-axis
                                    text: category === 'jobCategory' ? 'Job Categories' :
                                        category === 'experienceLevel' ? 'Experience Levels' :
                                            'Job Titles' // Change title based on the selected category
                                }
                            }
                        }
                    }
                });
            })
            .catch(err => console.error("Error loading bar chart data:", err)); // Log any errors
    }
});
