document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formIncidente");
    const tipoIncidente = document.getElementById("tipoIncidente");
    const aeronaveId = document.getElementById("aeronaveId");
    const imagens = document.getElementById("imagens");
    const preview = document.getElementById("preview");

    // Preview de imagens
    imagens.addEventListener("change", () => {
        preview.innerHTML = "";
        Array.from(imagens.files).forEach(file => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = e => {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Validação
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (tipoIncidente.value === "dano" && aeronaveId.value.trim() === "") {
            alert("Para incidentes de dano a aeronave, o campo 'ID da Aeronave' é obrigatório.");
            aeronaveId.focus();
            return;
        }
        alert("Incidente registrado com sucesso! (Simulação)");
        form.reset();
        preview.innerHTML = "";
    });
});