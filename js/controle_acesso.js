const requests = [
    { request_id:1, time:'2025-10-02 08:15', person:'João Silva', door:'Portão A', status:'pending' },
    { request_id:2, time:'2025-10-02 09:00', person:'Maria Lima', door:'Portão B', status:'approved' }
  ];
  
  function renderRequests(){
    const tbody = document.querySelector('#requests-table tbody');
    tbody.innerHTML = '';
    requests.forEach(r=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.time}</td><td>${r.person}</td><td>${r.door}</td><td>${r.status}</td>
        <td>
          <button class="action" onclick="decide(${r.request_id}, 'approved')">Aprovar</button>
          <button class="action" onclick="decide(${r.request_id}, 'denied')">Negar</button>
        </td>`;
      tr.onclick = ()=>selectRequest(r);
      tbody.appendChild(tr);
    });
  }
  
  function selectRequest(r){
    const d = document.getElementById('detail');
    d.innerHTML = `<h4>Detalhe</h4><p><strong>${r.person}</strong></p><p>${r.door}</p><p>Status: ${r.status}</p>`;
  }
  
  function decide(id, action){
    const req = requests.find(r=>r.request_id===id);
    if(req){
      req.status = action;
      alert(`Requisição ${id} ${action}`);
      renderRequests();
      selectRequest(req);
    }
  }
  
  renderRequests();
  