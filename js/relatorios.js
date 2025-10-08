    const reportForm = document.getElementById("reportForm");
    const reportList = document.getElementById("reportList");
    const editForm = document.getElementById("editForm");
    let currentCard = null;

        // Adicionar novo relatório
        reportForm.addEventListener("submit", (e) => {
        e.preventDefault();
    const title = document.getElementById("reportTitle").value.trim();
    const desc = document.getElementById("reportDesc").value.trim();

    if (title && desc) {
                const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");
    col.innerHTML = `
    <div class="card p-3">
        <h5 class="fw-bold">${title}</h5>
        <p>${desc}</p>
        <button class="btn btn-sm btn-edit" onclick="editReport(this)">Editar</button>
    </div>
    `;
    reportList.appendChild(col);
    reportForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('addReportModal')).hide();
            }
        });

    // Editar relatório
    function editReport(button) {
        currentCard = button.closest(".card");
    const title = currentCard.querySelector("h5").textContent;
    const desc = currentCard.querySelector("p").textContent;

    document.getElementById("editTitle").value = title;
    document.getElementById("editDesc").value = desc;

    new bootstrap.Modal(document.getElementById('editReportModal')).show();
        }

        // Salvar alterações no relatório
        editForm.addEventListener("submit", (e) => {
        e.preventDefault();
    if (currentCard) {
                const newTitle = document.getElementById("editTitle").value.trim();
    const newDesc = document.getElementById("editDesc").value.trim();

    currentCard.querySelector("h5").textContent = newTitle;
    currentCard.querySelector("p").textContent = newDesc;
            }
    bootstrap.Modal.getInstance(document.getElementById('editReportModal')).hide();
        });
