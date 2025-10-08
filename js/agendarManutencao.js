document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formManutencao");
    const tipo = document.getElementById("tipo");
    const descricao = document.getElementById("descricao");
    const custo = document.getElementById("custo");
    const dataInicio = document.getElementById("dataInicio");

    form.addEventListener("submit", e => {
        e.preventDefault();

        // Validação: corretiva exige descrição + custo
        if (tipo.value === "corretiva" && (descricao.value.trim() === "" || custo.value === "")) {
            alert("Para manutenções corretivas, é obrigatório informar a descrição do serviço e o custo estimado.");
            return;
        }

        // Validação: data início não pode ser no passado
        const hoje = new Date().toISOString().split("T")[0];
        if (dataInicio.value < hoje) {
            alert("A data de início não pode ser no passado.");
            dataInicio.focus();
            return;
        }

        alert("Manutenção registrada com sucesso! (Simulação)");
        form.reset();
    });
});
