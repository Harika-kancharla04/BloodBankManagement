let donors = JSON.parse(localStorage.getItem('donors')) || [];

// Render existing data from localStorage on load
window.onload = function () {
    updateDonorTable();
};

function addDonor() {
    const name = document.getElementById('name').value.trim();
    const bloodGroup = document.getElementById('blood-group').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (name === '' || bloodGroup === '' || contact === '') {
        alert("Please fill in all fields.");
        return;
    }

    const donor = {
        name,
        bloodGroup,
        contact
    };

    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors)); // Save to localStorage
    updateDonorTable();

    // Clear input fields after adding
    document.getElementById('name').value = '';
    document.getElementById('blood-group').value = '';
    document.getElementById('contact').value = '';
}

function updateDonorTable() {
    const tableBody = document.querySelector('#donorTable tbody');
    tableBody.innerHTML = '';

    donors.forEach((donor) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${donor.name}</td><td>${donor.bloodGroup}</td><td>${donor.contact}</td>`;
        tableBody.appendChild(row);
    });
}

function exportToExcel() {
    const table = document.getElementById('donorTable');
    const rows = table.getElementsByTagName('tr');

    let csvContent = 'Name,Blood Group,Contact\n';

    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td');
        if (cols.length === 3) {
            csvContent += `${cols[0].innerText},${cols[1].innerText},${cols[2].innerText}\n`;
        }
    }

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'donor_list.csv';
    document.body.appendChild(link); // Needed for Firefox
    link.click();
    document.body.removeChild(link);
}
