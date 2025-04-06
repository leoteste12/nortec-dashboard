const fs = require('fs');
const https = require('https');
const csv = require('csvtojson');

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWzrrf1Agp5fSqhJrLueJlL2Wf3B0npTDTNMjh9noqGv7HN9YD3aSG7dcNxmjkAGrQEBJEp8BY4iM1/pub?output=csv';

https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', async () => {
    const jsonArray = await csv().fromString(data);
    fs.writeFileSync('docs/data.json', JSON.stringify(jsonArray, null, 2));
    console.log('✅ data.json atualizado com sucesso!');
  });
}).on('error', err => {
  console.error('Erro ao buscar CSV:', err.message);
});
