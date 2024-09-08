anychart.onDocumentReady(function () {
    fetch("/countries-data")
        .then(response => response.json())
        .then(function (data) {
            let mapData = data;

            // Load GeoJSON for country shapes
            d3.json("/static/js/countries.geojson").then(function (geojson) {
                let geoData = geojson.features;

                // Prepare variables to store the number of jobs per country
                let numJobs = {};

                Object.keys(mapData).forEach(function (country) {
                    let jobCount = mapData[country];
                    numJobs[country] = numJobs[country] || 0;
                    numJobs[country] += jobCount;
                });

                // Prepare data for AnyChart
                let countryData = [];
                Object.keys(numJobs).forEach(function (country) {
                    let feature = geoData.find(feature => feature.properties.ISO_A2 === country);

                    if (!feature) {
                        console.error(`Country ${country} not found in GeoJSON data. Skipping this country.`);
                        return; // Skip the country if not found
                    }

                    countryData.push({
                        id: feature.properties.ISO_A2,
                        value: numJobs[country],
                        name: feature.properties.NAME
                    });
                });

                // Create the map chart
                let chart = anychart.map();

                // Load world geo data
                chart.geoData(anychart.maps.world);

                // Create a choropleth series (colored based on data values)
                let series = chart.choropleth(countryData);

                // Define a color scale for the countries based on job numbers
                series.colorScale(anychart.scales.ordinalColor([
                    { less: 50, color: '#E5E4E2' },
                    { from: 50, to: 199, color: '#8CBF3F' },
                    { from: 200, to: 299, color: '#FFBF00' },
                    { greater: 300, color: '#D32F2F' }
                ]));

                // Add interactivity: Hover effects
                series.hovered()
                    .fill('#FF7043')
                    .stroke('#5D4037', 1);

                // Add legend for color scale
                chart.colorRange(true);
                chart.colorRange().ticks().enabled(true).length(10);
                chart.colorRange().labels().fontSize(12).fontWeight('bold');

                // Configure tooltips
                series.tooltip().format(function () {
                    return `Country: ${this.name}\nJobs: ${this.value}`;
                });

                // Set the map bounds to fill the container
                chart.bounds(0, 0, '100%', '100%');

                // Customize map appearance
                chart.title()
                    .enabled(true)
                    .useHtml(true)
                    .text("<strong>Job Opportunities by Country</strong>")
                    .fontSize(18)
                    .fontWeight("bold")
                    .hAlign("center")
                    .padding([10, 0, 10, 0]);

                chart.interactivity().selectionMode('none');  // Disable country selection
                chart.padding(20); // Padding to provide spacing between map and container

                // Draw chart in the map container
                chart.container('mapContainer').draw();
            }).catch(err => console.error("Error loading GeoJSON data:", err));
        })
        .catch(err => console.error("Error loading map data:", err));
});
