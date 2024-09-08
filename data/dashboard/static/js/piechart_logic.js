document.addEventListener('DOMContentLoaded', () => {
    const companySizeBtn = document.getElementById('companySizeBtn');
    const workSettingBtn = document.getElementById('workSettingBtn');
    const yearSelect = document.getElementById('yearSelect');
    const ctx = document.getElementById('pieChart').getContext('2d');
    let myPieChart;

    let lastSelectedCriteria = 'company_size'; // Default to company size

    // Function to fetch data and render the pie chart
    function fetchDataAndRenderChart(criteria, selectedYear = 'all') {
        if (myPieChart) {
            myPieChart.destroy(); // Destroy the existing chart before rendering a new one
        }

        let endpoint = (criteria === 'company_size') ? '/us-entry-level-data' : '/us-work-setting-data';

        fetch(`${endpoint}?year=${selectedYear}`)
            .then(response => response.json())
            .then(data => {
                let chartData;
                if (criteria === 'company_size') {
                    chartData = processCompanySizeData(data);
                } else if (criteria === 'work_setting') {
                    chartData = processWorkSettingData(data);
                }

                // Render the pie chart
                renderChart(chartData);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }

    // Function to process company size data
    function processCompanySizeData(data) {
        const companySizeFull = {
            'S': 'Small',
            'M': 'Medium',
            'L': 'Large'
        };

        const companySizeData = {
            Small: 0,
            Medium: 0,
            Large: 0
        };

        for (const [key, value] of Object.entries(data)) {
            const fullKey = companySizeFull[key] || key;
            companySizeData[fullKey] = value;
        }

        return {
            labels: Object.keys(companySizeData),
            datasets: [{
                data: Object.values(companySizeData),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors
                hoverOffset: 10
            }]
        };
    }

    // Function to process work setting data (Remote, Hybrid, Onsite)
    function processWorkSettingData(data) {
        return {
            labels: ['Remote', 'Hybrid', 'Onsite'],
            datasets: [{
                data: [data.Remote, data.Hybrid, data.Onsite],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors
                hoverOffset: 10
            }]
        };
    }

    // Function to render the pie chart
    function renderChart(chartData) {
        myPieChart = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Entry-level hires distribution',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    // Event listeners for buttons and dropdown
    companySizeBtn.addEventListener('click', () => {
        lastSelectedCriteria = 'company_size';
        fetchDataAndRenderChart(lastSelectedCriteria, yearSelect.value);
    });

    workSettingBtn.addEventListener('click', () => {
        lastSelectedCriteria = 'work_setting';
        fetchDataAndRenderChart(lastSelectedCriteria, yearSelect.value);
    });

    yearSelect.addEventListener('change', () => {
        fetchDataAndRenderChart(lastSelectedCriteria, yearSelect.value);
    });

    // Initial chart load
    fetchDataAndRenderChart(lastSelectedCriteria, yearSelect.value);
});
