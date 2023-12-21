fetch('data.json')
    .then(response => response.json())
    .then(data => {
        createTable(data);
        createBloodGroupSummary(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));

function createTable(data) {
    const columns = Object.keys(data.data[0]);
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    columns.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = item[column];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}

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

    // Create blood group summary table and append to the body
    const summaryTable = document.createElement('table');
    const summaryTbody = document.createElement('tbody');

    Object.keys(bloodGroups).forEach(bloodGroup => {
        const bloodGroupRow = document.createElement('tr');
        const bloodGroupCell = document.createElement('td');
        bloodGroupCell.textContent = bloodGroup;
        bloodGroupRow.appendChild(bloodGroupCell);

        const namesCell = document.createElement('td');
        const namesList = document.createElement('ul');
        bloodGroups[bloodGroup].forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            namesList.appendChild(listItem);
        });
        namesCell.appendChild(namesList);
        bloodGroupRow.appendChild(namesCell);

        summaryTbody.appendChild(bloodGroupRow);
    });

    summaryTable.appendChild(summaryTbody);
    document.body.appendChild(summaryTable);
}
