moment.locale('pt-br');

// --- Funções Auxiliares ---
/**
 * Exibe uma mensagem de feedback para o usuário.
 * @param {string} mensagem - A mensagem a ser exibida.
 * @param {string} tipo - O tipo de mensagem ('sucesso', 'erro', 'alerta').
 * @param {string} idElemento - O ID do elemento onde a mensagem será exibida.
 */
function exibirMensagem(mensagem, tipo, idElemento) {
    const elemento = document.getElementById(idElemento);
    elemento.innerHTML = ''; // Limpa mensagens anteriores
    const div = document.createElement('div');
    div.className = `alert alert-${tipo}`;
    div.textContent = mensagem;
    elemento.appendChild(div);
}

/**
 * Formata a data para o padrão brasileiro.
 * @param {string} data - A data no formato ISO (ex: 2023-10-26T10:00:00).
 * @returns {string} A data formatada no padrão brasileiro (ex: 26/10/2023 10:00:00).
 */
function formatarData(data) {
    return moment(data).format('DD/MM/YYYY HH:mm:ss');
}

/**
 * Obtém os dados de um formulário.
 * @param {string} formId - O ID do formulário.
 * @returns {object} Um objeto contendo os dados do formulário.
 */
function obterDadosFormulario(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const dados = {};

    for (let [nome, valor] of formData.entries()) {
        if (nome === 'imagemOcorrencia') {
            dados[nome] = formData.get(nome); // Obtém o arquivo
        } else {
            dados[nome] = valor;
        }
    }
    return dados;
}

// --- Funções de Cadastro ---

document.getElementById('cadastroFuncionarioForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dados = obterDadosFormulario('cadastroFuncionarioForm');

    // Simulação de cadastro (substitua por lógica real)
    console.log('Dados do Funcionário:', dados);
    exibirMensagem('Funcionário cadastrado com sucesso!', 'sucesso', 'mensagemCadastroFuncionario');
    this.reset(); // Limpa o formulário
});

document.getElementById('cadastroEquipamentoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dados = obterDadosFormulario('cadastroEquipamentoForm');

    // Simulação de cadastro
    console.log('Dados do Equipamento:', dados);
    exibirMensagem('Equipamento cadastrado com sucesso!', 'sucesso', 'mensagemCadastroEquipamento');
    this.reset();
});

document.getElementById('cadastroAreaRestritaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dados = obterDadosFormulario('cadastroAreaRestritaForm');

    // Simulação de cadastro
    console.log('Dados da Área Restrita:', dados);
    exibirMensagem('Área Restrita cadastrada com sucesso!', 'sucesso', 'mensagemCadastroAreaRestrita');
    this.reset();
    // Atualiza o select de áreas restritas nos relatórios e controle de acesso
    atualizarSelectAreasRestritas();
});

document.getElementById('cadastroOcorrenciaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dados = obterDadosFormulario('cadastroOcorrenciaForm');

    // Verifica se um arquivo de imagem foi selecionado
    const imagemOcorrencia = dados.imagemOcorrencia;
    if (imagemOcorrencia && imagemOcorrencia.size > 0) {
        // Se houver imagem, converte para base64 (para exibição no relatório)
        const reader = new FileReader();
        reader.onload = function (e) {
            dados.imagemBase64 = e.target.result; // Adiciona a imagem em base64 aos dados
            // Simulação de cadastro
            console.log('Dados da Ocorrência:', dados);
            exibirMensagem('Ocorrência cadastrada com sucesso!', 'sucesso', 'mensagemCadastroOcorrencia');
            document.getElementById('cadastroOcorrenciaForm').reset();
        };
        reader.readAsDataURL(imagemOcorrencia); // Lê o arquivo como base64
    } else {
        // Se não houver imagem, continua com o cadastro normalmente
        // Simulação de cadastro
        console.log('Dados da Ocorrência:', dados);
        exibirMensagem('Ocorrência cadastrada com sucesso!', 'sucesso', 'mensagemCadastroOcorrencia');
        this.reset();
    }
});

document.getElementById('cadastroVisitanteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dados = obterDadosFormulario('cadastroVisitanteForm');

    // Simulação de cadastro
    console.log('Dados do Visitante:', dados);
    exibirMensagem('Visitante cadastrado com sucesso!', 'sucesso', 'mensagemCadastroVisitante');
    this.reset();
});

// --- Funções de Relatório ---
document.getElementById('relatorioOcorrenciaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const filtros = obterDadosFormulario('relatorioOcorrenciaForm');

    // Simulação de geração de relatório (substitua por lógica real)
    console.log('Filtros do Relatório de Ocorrências:', filtros);

    // Dados de exemplo de ocorrências (substitua por dados reais)
    const ocorrencias = [
        { tipo: 'Furto', local: 'Almoxarifado', dataHora: '2023-10-25T10:00:00', descricao: 'Furto de ferramentas.', imagemBase64: '' },
        { tipo: 'Roubo', local: 'Portaria', dataHora: '2023-10-25T14:30:00', descricao: 'Roubo de veículo.', imagemBase64: '' },
        { tipo: 'Invasao', local: 'Entrada Principal', dataHora: '2023-10-26T09:00:00', descricao: 'Invasão de área restrita.', imagemBase64: '' },
        { tipo: 'Vandalismo', local: 'Refeitório', dataHora: '2023-10-26T11:00:00', descricao: 'Danos à propriedade.', imagemBase64: '' },
        { tipo: 'Acidente', local: 'Estacionamento', dataHora: '2023-10-27T16:00:00', descricao: 'Colisão de veículos.', imagemBase64: '' },
        { tipo: 'Outro', local: 'Corredor', dataHora: '2023-10-28T18:00:00', descricao: 'Ocorrência teste.', imagemBase64: '' },
    ];

    let ocorrenciasFiltradas = ocorrencias.filter(ocorrencia => {
        let filtroTipo = !filtros.tipoOcorrenciaRelatorio || ocorrencia.tipo === filtros.tipoOcorrenciaRelatorio;
        let filtroLocal = !filtros.localOcorrenciaRelatorio || ocorrencia.local.toLowerCase().includes(filtros.localOcorrenciaRelatorio.toLowerCase());
        let filtroDataInicio = !filtros.dataInicioOcorrenciaRelatorio || moment(ocorrencia.dataHora).isSameOrAfter(filtros.dataInicioOcorrenciaRelatorio, 'day');
        let filtroDataFim = !filtros.dataFimOcorrenciaRelatorio || moment(ocorrencia.dataHora).isSameOrBefore(filtros.dataFimOcorrenciaRelatorio, 'day');
        return filtroTipo && filtroLocal && filtroDataInicio && filtroDataFim;
    });

    const corpoRelatorio = document.getElementById('corpoRelatorioOcorrencia');
    corpoRelatorio.innerHTML = ''; // Limpa o corpo da tabela

    if (ocorrenciasFiltradas.length === 0) {
        exibirMensagem('Nenhuma ocorrência encontrada para os filtros informados.', 'alerta', 'mensagemRelatorioOcorrencia');
        document.getElementById('relatorioOcorrenciaContainer').style.display = 'none';
    } else {
        ocorrenciasFiltradas.forEach(ocorrencia => {
            const row = document.createElement('tr');
            const tipoCell = document.createElement('td');
            const localCell = document.createElement('td');
            const dataHoraCell = document.createElement('td');
            const descricaoCell = document.createElement('td');

            tipoCell.textContent = ocorrencia.tipo;
            localCell.textContent = ocorrencia.local;
            dataHoraCell.textContent = formatarData(ocorrencia.dataHora);
            descricaoCell.textContent = ocorrencia.descricao;

            row.appendChild(tipoCell);
            row.appendChild(localCell);
            row.appendChild(dataHoraCell);
            row.appendChild(descricaoCell);
            corpoRelatorio.appendChild(row);

            // Adiciona evento de clique para exibir detalhes no modal
            row.addEventListener('click', () => {
                exibirDetalhesOcorrencia(ocorrencia);
            });
        });

        document.getElementById('mensagemRelatorioOcorrencia').innerHTML = ''; // Limpa qualquer mensagem anterior
        document.getElementById('relatorioOcorrenciaContainer').style.display = 'block'; // Exibe o relatório
    }
});

// Função para exibir detalhes da ocorrência em um modal
function exibirDetalhesOcorrencia(ocorrencia) {
    const modalBody = document.getElementById('corpoModalOcorrencia');
    modalBody.innerHTML = ''; // Limpa o conteúdo anterior do modal

    const titulo = document.createElement('h4');
    titulo.textContent = `Ocorrência: ${ocorrencia.tipo}`;
    modalBody.appendChild(titulo);

    const dataHora = document.createElement('p');
    dataHora.textContent = `Data/Hora: ${formatarData(ocorrencia.dataHora)}`;
    modalBody.appendChild(dataHora);

    const local = document.createElement('p');
    local.textContent = `Local: ${ocorrencia.local}`;
    modalBody.appendChild(local);

    const descricao = document.createElement('p');
    descricao.textContent = `Descrição: ${ocorrencia.descricao}`;
    modalBody.appendChild(descricao);

    // Se houver imagem, exibe no modal
    if (ocorrencia.imagemBase64) {
        const imagem = document.createElement('img');
        imagem.src = ocorrencia.imagemBase64;
        imagem.style.width = '100%'; // Ajusta o tamanho da imagem
        imagem.style.borderRadius = '8px';
        imagem.style.marginTop = '10px';
        modalBody.appendChild(imagem);
    }

    // Exibe o modal
    const modalOcorrencia = new bootstrap.Modal(document.getElementById('modalOcorrencia'));
    modalOcorrencia.show();
}

function atualizarSelectAreasRestritas() {
    const areasRestritas = ['Almoxarifado', 'Portaria', 'Entrada Principal', 'Refeitório', 'Estacionamento', 'Corredor']; // Substitua por seus dados reais

    const selectAreaRestritaRelatorio = document.getElementById('areaRestritaRelatorio');
    selectAreaRestritaRelatorio.innerHTML = '<option value="">Todas</option>'; // Mantém a opção "Todas"

    const selectAreaRestritaAcesso = document.getElementById('areaRestritaAcesso');
    selectAreaRestritaAcesso.innerHTML = '<option value="">Selecione a Área Restrita</option>';

    areasRestritas.forEach(area => {
        const optionRelatorio = document.createElement('option');
        optionRelatorio.value = area;
        optionRelatorio.textContent = area;
        selectAreaRestritaRelatorio.appendChild(optionRelatorio);

        const optionAcesso = document.createElement('option');
        optionAcesso.value = area;
        optionAcesso.textContent = area;
        selectAreaRestritaAcesso.appendChild(optionAcesso);
    });
}

function atualizarSelectFuncionarios() {
    const funcionarios = [{ matricula: '123', nome: 'João' }, { matricula: '456', nome: 'Maria' }, { matricula: '789', nome: 'José' }]; // Substitua por seus dados reais

    const selectFuncionarioRelatorio = document.getElementById('funcionarioRelatorio');
    selectFuncionarioRelatorio.innerHTML = '<option value="">Todos</option>';

    const selectFuncionarioRondaRelatorio = document.getElementById('funcionarioRondaRelatorio');
    selectFuncionarioRondaRelatorio.innerHTML = '<option value="">Todos</option>';

    const selectFuncionarioAcesso = document.getElementById('funcionarioAcesso');
    selectFuncionarioAcesso.innerHTML = '<option value="">Selecione o Funcionário</option>';

    funcionarios.forEach(funcionario => {
        const optionRelatorio = document.createElement('option');
        optionRelatorio.value = funcionario.matricula;
        optionRelatorio.textContent = funcionario.nome;
        selectFuncionarioRelatorio.appendChild(optionRelatorio);

        const optionRondaRelatorio = document.createElement('option');
        optionRondaRelatorio.value = funcionario.matricula;
        optionRondaRelatorio.textContent = funcionario.nome;
        selectFuncionarioRondaRelatorio.appendChild(optionRondaRelatorio);

        const optionAcesso = document.createElement('option');
        optionAcesso.value = funcionario.matricula;
        optionAcesso.textContent = funcionario.nome;
        selectFuncionarioAcesso.appendChild(optionAcesso);
    });
}

function atualizarSelectEquipamentos() {
    const equipamentos = [{ nomeEquipamento: 'Câmera 01' }, { nomeEquipamento: 'Alarme Central' }, { nomeEquipamento: 'Sensor de Presença' }]; // Substitua por seus dados reais

    const selectEquipamentoManutencaoRelatorio = document.getElementById('equipamentoManutencaoRelatorio');
    selectEquipamentoManutencaoRelatorio.innerHTML = '<option value="">Todos</option>';

    equipamentos.forEach(equipamento => {
        const option = document.createElement('option');
        option.value = equipamento.nomeEquipamento;
        option.textContent = equipamento.nomeEquipamento;
        selectEquipamentoManutencaoRelatorio.appendChild(option);
    });
}

document.getElementById('relatorioAcessoRestritoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const filtros = obterDadosFormulario('relatorioAcessoRestritoForm');

    // Simulação de geração de relatório
    console.log('Filtros do Relatório de Acesso:', filtros);

    // Dados de exemplo de acesso (substitua por dados reais)
    const acessos = [
        { funcionario: '123', nomeFuncionario: 'João', areaRestrita: 'Almoxarifado', dataHoraEntrada: '2023-10-25T09:00:00', dataHoraSaida: '2023-10-25T10:00:00' },
        { funcionario: '456', nomeFuncionario: 'Maria', areaRestrita: 'Portaria', dataHoraEntrada: '2023-10-25T13:00:00', dataHoraSaida: '2023-10-25T14:00:00' },
        { funcionario: '123', nomeFuncionario: 'João', areaRestrita: 'Almoxarifado', dataHoraEntrada: '2023-10-26T15:00:00', dataHoraSaida: '2023-10-26T16:00:00' },
    ];

    let acessosFiltrados = acessos.filter(acesso => {
        let filtroAreaRestrita = !filtros.areaRestritaRelatorio || acesso.areaRestrita === filtros.areaRestritaRelatorio;
        let filtroFuncionario = !filtros.funcionarioRelatorio || acesso.funcionario === filtros.funcionarioRelatorio;
        let filtroDataInicio = !filtros.dataInicioAcessoRelatorio || moment(acesso.dataHoraEntrada).isSameOrAfter(filtros.dataInicioAcessoRelatorio, 'day');
        let filtroDataFim = !filtros.dataFimAcessoRelatorio || moment(acesso.dataHoraEntrada).isSameOrBefore(filtros.dataFimAcessoRelatorio, 'day');
        return filtroAreaRestrita && filtroFuncionario && filtroDataInicio && filtroDataFim;
    });

    const corpoRelatorio = document.getElementById('corpoRelatorioAcessoRestrito');
    corpoRelatorio.innerHTML = '';

    if (acessosFiltrados.length === 0) {
        exibirMensagem('Nenhum acesso encontrado para os filtros informados.', 'alerta', 'mensagemRelatorioAcessoRestrito');
        document.getElementById('relatorioAcessoRestritoContainer').style.display = 'none';
    } else {
        acessosFiltrados.forEach(acesso => {
            const row = document.createElement('tr');
            const funcionarioCell = document.createElement('td');
            const areaRestritaCell = document.createElement('td');
            const dataHoraEntradaCell = document.createElement('td');
            const dataHoraSaidaCell = document.createElement('td');

            funcionarioCell.textContent = acesso.nomeFuncionario;
            areaRestritaCell.textContent = acesso.areaRestrita;
            dataHoraEntradaCell.textContent = formatarData(acesso.dataHoraEntrada);
            dataHoraSaidaCell.textContent = acesso.dataHoraSaida ? formatarData(acesso.dataHoraSaida) : 'N/A';

            row.appendChild(funcionarioCell);
            row.appendChild(areaRestritaCell);
            row.appendChild(dataHoraEntradaCell);
            row.appendChild(dataHoraSaidaCell);
            corpoRelatorio.appendChild(row);
        });

        document.getElementById('mensagemRelatorioAcessoRestrito').innerHTML = '';
        document.getElementById('relatorioAcessoRestritoContainer').style.display = 'block';
    }
});

document.getElementById('relatorioRondasForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const filtros = obterDadosFormulario('relatorioRondasForm');

    // Simulação de geração de relatório
    console.log('Filtros do Relatório de Rondas:', filtros);

    // Dados de exemplo de rondas (substitua por dados reais)
    const rondas = [
        { funcionario: '123', nomeFuncionario: 'João', dataHoraInicio: '2023-10-25T20:00:00', dataHoraFim: '2023-10-25T21:00:00', local: 'Pátio', observacoes: 'Ronda normal.' },
        { funcionario: '456', nomeFuncionario: 'Maria', dataHoraInicio: '2023-10-25T22:00:00', dataHoraFim: '2023-10-25T23:00:00', local: 'Almoxarifado', observacoes: 'Porta trancada.' },
        { funcionario: '123', nomeFuncionario: 'João', dataHoraInicio: '2023-10-26T00:00:00', dataHoraFim: '2023-10-26T01:00:00', local: 'Escritórios', observacoes: 'Tudo ok.' },
    ];

    let rondasFiltradas = rondas.filter(ronda => {
        let filtroFuncionario = !filtros.funcionarioRondaRelatorio || ronda.funcionario === filtros.funcionarioRondaRelatorio;
        let filtroDataInicio = !filtros.dataInicioRondaRelatorio || moment(ronda.dataHoraInicio).isSameOrAfter(filtros.dataInicioRondaRelatorio, 'day');
        let filtroDataFim = !filtros.dataFimRondaRelatorio || moment(ronda.dataHoraInicio).isSameOrBefore(filtros.dataFimRondaRelatorio, 'day');
        return filtroFuncionario && filtroDataInicio && filtroDataFim;
    });

    const corpoRelatorio = document.getElementById('corpoRelatorioRondas');
    corpoRelatorio.innerHTML = '';

    if (rondasFiltradas.length === 0) {
        exibirMensagem('Nenhuma ronda encontrada para os filtros informados.', 'alerta', 'mensagemRelatorioRondas');
        document.getElementById('relatorioRondasContainer').style.display = 'none';
    } else {
        rondasFiltradas.forEach(ronda => {
            const row = document.createElement('tr');
            const funcionarioCell = document.createElement('td');
            const dataHoraInicioCell = document.createElement('td');
            const dataHoraFimCell = document.createElement('td');
            const localCell = document.createElement('td');
            const observacoesCell = document.createElement('td');

            funcionarioCell.textContent = ronda.nomeFuncionario;
            dataHoraInicioCell.textContent = formatarData(ronda.dataHoraInicio);
            dataHoraFimCell.textContent = formatarData(ronda.dataHoraFim);
            localCell.textContent = ronda.local;
            observacoesCell.textContent = ronda.observacoes;

            row.appendChild(funcionarioCell);
            row.appendChild(dataHoraInicioCell);
            row.appendChild(dataHoraFimCell);
            row.appendChild(localCell);
            row.appendChild(observacoesCell);
            corpoRelatorio.appendChild(row);
        });

        document.getElementById('mensagemRelatorioRondas').innerHTML = '';
        document.getElementById('relatorioRondasContainer').style.display = 'block';
    }
});

document.getElementById('relatorioManutencaoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const filtros = obterDadosFormulario('relatorioManutencaoForm');

    // Simulação de geração de relatório
    console.log('Filtros do Relatório de Manutenção:', filtros);

    // Dados de exemplo de manutenções (substitua por dados reais)
    const manutencoes = [
        { equipamento: 'Câmera 01', dataManutencao: '2023-10-20', descricao: 'Limpeza e ajuste.', status: 'Concluído' },
        { equipamento: 'Alarme Central', dataManutencao: '2023-10-22', descricao: 'Troca de bateria.', status: 'Pendente' },
        { equipamento: 'Câmera 01', dataManutencao: '2023-10-28', descricao: 'Teste de funcionamento', status: 'Concluído' },
    ];

    let manutencoesFiltradas = manutencoes.filter(manutencao => {
        let filtroEquipamento = !filtros.equipamentoManutencaoRelatorio || manutencao.equipamento === filtros.equipamentoManutencaoRelatorio;
        let filtroDataInicio = !filtros.dataInicioManutencaoRelatorio || moment(manutencao.dataManutencao).isSameOrAfter(filtros.dataInicioManutencaoRelatorio, 'day');
        let filtroDataFim = !filtros.dataFimManutencaoRelatorio || moment(manutencao.dataManutencao).isSameOrBefore(filtros.dataFimManutencaoRelatorio, 'day');
        return filtroEquipamento && filtroDataInicio && filtroDataFim;
    });

    const corpoRelatorio = document.getElementById('corpoRelatorioManutencao');
    corpoRelatorio.innerHTML = ''; });