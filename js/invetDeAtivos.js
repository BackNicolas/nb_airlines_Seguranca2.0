  const ativos = [
    {
        id: "A001",
    nome: "Aeronave Falcão X1",
    tipo: "Aeronave",
    status: "Operacional",
    historico: [
    "10/08/2025 - Manutenção preventiva",
    "01/07/2025 - Substituição de peças",
    "15/06/2025 - Inspeção anual"
    ]
            },
    {
        id: "V023",
    nome: "Caminhão Volvo FH",
    tipo: "Veículo",
    status: "Em manutenção",
    historico: [
    "20/09/2025 - Troca de óleo",
    "01/08/2025 - Revisão completa"
    ]
            },
    {
        id: "E110",
    nome: "Gerador Industrial",
    tipo: "Equipamento",
    status: "Operacional",
    historico: [
    "12/09/2025 - Reparo elétrico"
    ]
            }
    ];

    const tbody = document.getElementById('ativos-tbody');
    const modal = document.getElementById('modal');
    const historicoLista = document.getElementById('historico-lista');
    const modalClose = document.getElementById('modal-close');

    // Função para renderizar a tabela
    function renderizarTabela() {
        tbody.innerHTML = '';
            ativos.forEach((ativo, index) => {
                const tr = document.createElement('tr');

    tr.innerHTML = `
    <td>${ativo.id}</td>
    <td>${ativo.nome}</td>
    <td>${ativo.tipo}</td>
    <td>${ativo.status}</td>
    <td><button data-index="${index}" aria-label="Ver histórico do ativo ${ativo.nome}">Ver Histórico</button></td>
    `;

    tbody.appendChild(tr);
            });
        }

    // Função para abrir modal com histórico
    function abrirModal(index) {
            const ativo = ativos[index];
    historicoLista.innerHTML = '';

    if (ativo.historico.length === 0) {
                const li = document.createElement('li');
    li.textContent = 'Nenhum histórico disponível.';
    historicoLista.appendChild(li);
            } else {
        ativo.historico.forEach(evento => {
            const li = document.createElement('li');
            li.textContent = evento;
            historicoLista.appendChild(li);
        });
            }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
        }

    // Função para fechar modal
    function fecharModal() {
        modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
        }

        // Event listeners
        tbody.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                const index = e.target.getAttribute('data-index');
    abrirModal(index);
            }
        });

    modalClose.addEventListener('click', fecharModal);

        window.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
        fecharModal();
            }
        });

        modal.addEventListener('click', e => {
            if (e.target === modal) {
        fecharModal();
            }
        });

    // Inicializa tabela ao carregar página
    renderizarTabela();