
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dados-container');
    container.innerHTML = '';

    dados.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <p><strong>Data:</strong> ${item.Data}</p>
            <p><strong>TAG:</strong> ${item.TAG}</p>
            <p><strong>Descrição:</strong> ${item.Descricao}</p>
        `;
        container.appendChild(div);
    });
});
