document.addEventListener('DOMContentLoaded', function () {
    loadJobMap();
    loadSalaryChart();
    loadUSEntryLevelChart();
    loadYearlyTrendsChart();
});

// Function to load the map with job opportunities by country
function loadJobMap() {
    fetch('/countries-data')
        .then(response => response.json())
        .then(data => {
            const map = L.map('jobMap').setView([20, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            for (const country in data) {
                getLatLonFromNominatim(country).then(latLon => {
                    if (latLon) {
                        L.marker(latLon).addTo(map)
                            .bindPopup(`${country}: ${data[country]} job opportunities`);
                    }
                }).catch(err => {
                    console.error(`Error fetching coordinates from Nominatim for ${country}:`, err);
                });
            }
        })
        .catch(err => console.error('Error loading job map:', err));
}

// Function to get latitude and longitude from Nominatim API
function getLatLonFromNominatim(countryCode) {
    const url = `https://nominatim.openstreetmap.org/search?country=${countryCode}&format=json&limit=1`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
            return null;
        })
        .catch(err => {
            console.error(`Error fetching coordinates from Nominatim for ${countryCode}:`, err);
            return null;
        });
}

// Salary chart: Average salary by job title and experience level
function loadSalaryChart() {
    const experienceLevel = document.getElementById('experienceLevelSelect').value;
    fetch(`/salary-data?experience_level=${experienceLevel}`)
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('salaryChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.job_titles,
                    datasets: [{
                        label: 'Average Salary',
                        data: data.average_salaries,
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
        })
        .catch(err => console.error('Error loading salary chart:', err));
}

// US entry-level job chart
function loadUSEntryLevelChart() {
    const year = document.getElementById('yearSelect').value;
    fetch(`/us-entry-level-data?year=${year}`)
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('entryLevelChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'US Entry-Level Jobs',
                        data: Object.values(data),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                    }]
                }
            });
        })
        .catch(err => console.error('Error loading US entry-level chart:', err));
}

// Yearly trends chart
function loadYearlyTrendsChart() {
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
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    }, {
                        label: 'Job Count',
                        data: data.job_counts,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        fill: false
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
        })
        .catch(err => console.error('Error loading yearly trends chart:', err));
}
