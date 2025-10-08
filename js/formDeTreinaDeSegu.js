// Controle das abas com animação suave
const btnTreinamento = document.getElementById('btn-treinamento');
const btnManutencao = document.getElementById('btn-manutencao');
const sectionTreinamento = document.getElementById('section-treinamento');
const sectionManutencao = document.getElementById('section-manutencao');

function mostrarSecao(secaoMostrar, secaoOcultar, btnAtivo, btnInativo) {
    btnAtivo.classList.add('active');
    btnInativo.classList.remove('active');
    secaoOcultar.style.opacity = 0;
    setTimeout(() => {
        secaoOcultar.style.display = 'none';
        secaoMostrar.style.display = 'block';
        setTimeout(() => {
            secaoMostrar.style.opacity = 1;
        }, 50);
    }, 300);
}

sectionTreinamento.style.transition = 'opacity 0.3s';
sectionManutencao.style.transition = 'opacity 0.3s';

btnTreinamento.addEventListener('click', () => {
    mostrarSecao(sectionTreinamento, sectionManutencao, btnTreinamento, btnManutencao);
});

btnManutencao.addEventListener('click', () => {
    mostrarSecao(sectionManutencao, sectionTreinamento, btnManutencao, btnTreinamento);
});

// Registro Treinamento
const formTreinamento = document.getElementById('form-treinamento');
const tableTreinamentoBody = document.querySelector('#table-treinamento tbody');
const participacoes = [];

formTreinamento.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = formTreinamento.nomeFuncionario.value.trim();
    const data = formTreinamento.dataTreinamento.value;
    const tipo = formTreinamento.tipoTreinamento.value;

    if (nome && data && tipo) {
        participacoes.push({ nome, data, tipo });
        atualizarTabelaTreinamento();
        formTreinamento.reset();
    }
});

function atualizarTabelaTreinamento() {
    tableTreinamentoBody.innerHTML = '';
    if (participacoes.length === 0) {
        tableTreinamentoBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#aaa;">Nenhum registro ainda.</td></tr>`;
        return;
    }
    participacoes.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${p.nome}</td><td>${p.data}</td><td>${p.tipo}</td>`;
        tableTreinamentoBody.appendChild(tr);
    });
}

// Registro Manutenção
const formManutencao = document.getElementById('form-manutencao');
const tableManutencaoBody = document.querySelector('#table-manutencao tbody');
const manutencoes = [];

formManutencao.addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = formManutencao.descricaoOcorrencia.value.trim();
    const status = formManutencao.statusOcorrencia.value;

    if (descricao && status) {
        manutencoes.push({ descricao, status });
        atualizarTabelaManutencao();
        formManutencao.reset();
    }
});

function atualizarTabelaManutencao() {
    tableManutencaoBody.innerHTML = '';
    if (manutencoes.length === 0) {
        tableManutencaoBody.innerHTML = `<tr><td colspan="2" style="text-align:center;color:#aaa;">Nenhuma ocorrência registrada.</td></tr>`;
        return;
    }
    manutencoes.forEach(m => {
        const tr = document.createElement('tr');
        let statusClass = '';
        switch (m.status) {
            case 'Pendente':
                statusClass = 'status-pendente';
                break;
            case 'Em Andamento':
                statusClass = 'status-andamento';
                break;
            case 'Concluído':
                statusClass = 'status-concluido';
                break;
        }
        tr.innerHTML = `<td>${m.descricao}</td><td class="${statusClass}">${m.status}</td>`;
        tableManutencaoBody.appendChild(tr);
    });
}

// Inicialização visual
window.addEventListener('DOMContentLoaded', () => {
    sectionTreinamento.style.opacity = 1;
    sectionManutencao.style.opacity = 0;
    atualizarTabelaTreinamento();
    atualizarTabelaManutencao();
});