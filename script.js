const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWzrrf1Agp5fSqhJrLueJlL2Wf3B0npTDTNMjh9noqGv7HN9YD3aSG7dcNxmjkAGrQEBJEp8BY4iM1/pub?output=csv';

let allData = [];

async function fetchData() {
  const response = await fetch(sheetURL);
  const text = await response.text();
  const rows = text.trim().split('\n').map(row => row.split(','));
  const headers = rows[0];
  allData = rows.slice(1).map(row => {
    return Object.fromEntries(row.map((val, idx) => [headers[idx], val]));
  });
  renderTables(allData);
}

function renderTables(data) {
  const container = document.getElementById('tablesContainer');
  container.innerHTML = '';

  const grouped = data.reduce((acc, row) => {
    const date = row['Data'] || 'Sem Data';
    if (!acc[date]) acc[date] = [];
    acc[date].push(row);
    return acc;
  }, {});

  Object.keys(grouped).sort().forEach(date => {
    const section = document.createElement('div');
    section.className = 'card';
    const tableHTML = `
      <h2>${date}</h2>
      <table>
        <thead>
          <tr>${Object.keys(grouped[date][0]).map(k => `<th>${k}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${grouped[date].map(row => `
            <tr>${Object.entries(row).map(([k, v]) => `<td data-label="${k}">${v}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;
    section.innerHTML = tableHTML;
    container.appendChild(section);
  });
}

function applyFilters() {
  const date = document.getElementById('dateFilter').value;
  const tag = document.getElementById('tagFilter').value.toLowerCase();

  const filtered = allData.filter(row => {
    const dateMatch = !date || row['Data'] === date;
    const tagMatch = !tag || (row['TAG'] && row['TAG'].toLowerCase().includes(tag));
    return dateMatch && tagMatch;
  });

  renderTables(filtered);
}

setInterval(fetchData, 60000); // atualiza a cada minuto
fetchData();
