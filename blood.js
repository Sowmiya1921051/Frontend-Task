// script.js

// Fetch JSON data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Create table
        createTable(data);

        // Create blood group summary
        createBloodGroupSummary(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to create HTML table
function createTable(data) {
    // ... (same as before)
}

// Function to create blood group summary
function createBloodGroupSummary(data) {
    const bloodGroups = {};

    // Group data by blood group
    data.data.forEach(item => {
        const bloodGroup = item.bloodGroup;
        if (!bloodGroups[bloodGroup]) {
            bloodGroups[bloodGroup] = [];
        }
        bloodGroups[bloodGroup].push(item.name);
    });

    // Create summary and append to the body
    const summaryContainer = document.createElement('div');
    summaryContainer.className = 'blood-group-summary';

    Object.keys(bloodGroups).forEach(bloodGroup => {
        const bloodGroupHeading = document.createElement('h2');
        bloodGroupHeading.textContent = `${bloodGroup}`;
        summaryContainer.appendChild(bloodGroupHeading);

        const bloodGroupList = document.createElement('ul');
        bloodGroups[bloodGroup].forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            bloodGroupList.appendChild(listItem);
        });

        summaryContainer.appendChild(bloodGroupList);
    });

    document.body.appendChild(summaryContainer);
}
