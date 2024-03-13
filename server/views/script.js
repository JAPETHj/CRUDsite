function displaySearchResults(data) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.NAME}</td><td>${item.CITY}</td>`;
        // Add more cells based on your data model

        resultsContainer.appendChild(row);
    });
}
