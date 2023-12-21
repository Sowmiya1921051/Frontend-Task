
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        createTable(data);
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
