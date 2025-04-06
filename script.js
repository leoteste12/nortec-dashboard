
let rawData = [];

async function fetchData() {
  const response = await fetch('data.json');
  rawData = await response.json();
  displayData(rawData);
}

function displayData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'data-card';
    div.innerHTML = `
      <strong>Data:</strong> ${item.Data}<br>
      <strong>TAG:</strong> ${item.TAG}<br>
      <strong>Descrição:</strong> ${item.Descrição}
    `;
    container.appendChild(div);
  });
}

function applyFilters() {
  const date = document.getElementById('dateFilter').value;
  const tag = document.getElementById('tagFilter').value.toLowerCase();

  const filtered = rawData.filter(item => {
    const matchDate = date ? item.Data === date : true;
    const matchTag = tag ? item.TAG.toLowerCase().includes(tag) : true;
    return matchDate && matchTag;
  });

  displayData(filtered);
}

window.onload = fetchData;
