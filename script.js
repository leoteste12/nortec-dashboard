async function carregarDados() {
    try {
        const resposta = await fetch('dados.json');
        const dados = await resposta.json();

        const container = document.getElementById('dados-container');
        container.innerHTML = ''; // Limpa o conteúdo anterior

        dados.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <p><strong>Data:</strong> ${item.Data}</p>
                <p><strong>TAG:</strong> ${item.TAG}</p>
                <p><strong>Descrição:</strong> ${item.Descrição}</p>
            `;
            container.appendChild(div);
        });
    } catch (erro) {
        console.error('Erro ao carregar os dados:', erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarDados);
