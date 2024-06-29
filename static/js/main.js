let chartInstance;

function sortTable(columnIndex) {
    var table = document.getElementById("resultsTable");
    var rows = Array.from(table.rows).slice(1);
    var switching = true;
    var direction = "asc";
    var switchcount = 0;

    while (switching) {
        switching = false;
        for (var i = 0; i < rows.length - 1; i++) {
            var shouldSwitch = false;
            var x = rows[i].getElementsByTagName("TD")[columnIndex];
            var y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            if (direction === "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            } else if (direction === "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else if (switchcount === 0 && direction === "asc") {
            direction = "desc";
            switching = true;
        }
    }
}

document.querySelectorAll("th").forEach((headerCell, index) => {
    headerCell.addEventListener("click", () => {
        document.querySelectorAll("th").forEach(cell => cell.classList.remove("sort-asc", "sort-desc"));
        if (headerCell.classList.contains("sort-asc")) {
            headerCell.classList.remove("sort-asc");
            headerCell.classList.add("sort-desc");
        } else {
            headerCell.classList.remove("sort-desc");
            headerCell.classList.add("sort-asc");
        }
    });
});

document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const textInput = document.getElementById('textInput').value;
    const response = await fetch('/score/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textInput })
    });
    const result = await response.json();
    if (response.ok) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', result.id);
        newRow.innerHTML = `<td>${result.text}</td><td>${result.vectara_score}</td><td>${result.toxicity_score}</td><td><button class="btn btn-danger delete-button">Delete</button></td>`;
        document.querySelector('#resultsTable tbody').appendChild(newRow);
        addDeleteEvent(newRow.querySelector('.delete-button'));
        updateChart();
    } else {
        alert('Error: ' + result.detail);
    }
});

function addDeleteEvent(button) {
    button.addEventListener('click', async function(event) {
        const row = event.target.closest('tr');
        const id = row.getAttribute('data-id');
        const response = await fetch(`/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
            row.remove();
            updateChart();
        } else {
            alert('Error: ' + await response.text());
        }
    });
}

document.querySelectorAll('.delete-button').forEach(button => addDeleteEvent(button));

async function fetchData() {
    const response = await fetch('/results/');
    const results = await response.json();
    return results;
}

async function updateChart() {
    const results = await fetchData();
    const labels = results.map(result => result.text);
    const vectaraScores = results.map(result => result.vectara_score);
    const toxicityScores = results.map(result => result.toxicity_score);

    const ctx = document.getElementById('scoreChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Vectara Score',
                    data: vectaraScores,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                {
                    label: 'Toxicity Score',
                    data: toxicityScores,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

updateChart();
