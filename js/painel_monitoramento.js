// Protótipo com dados mock
const cameras = [
    { camera_id:1, tag:'Câmera H1-01', location:'Hangar 1', status:'online' },
    { camera_id:2, tag:'Câmera H1-02', location:'Hangar 1', status:'offline' },
    { camera_id:3, tag:'Câmera H2-01', location:'Hangar 2', status:'online' }
  ];
  
  function renderCameraList(){
    const ul = document.getElementById('camera-list');
    ul.innerHTML = '';
    cameras.forEach(cam=>{
      const li = document.createElement('li');
      li.textContent = `${cam.tag} - ${cam.status}`;
      li.style.cursor='pointer';
      li.onclick = ()=>selectCamera(cam);
      ul.appendChild(li);
    });
  }
  
  function renderGrid(){
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    cameras.forEach(cam=>{
      const tile = document.createElement('div');
      tile.className='tile';
      tile.innerHTML = `<div class="overlay">${cam.tag} • ${cam.status}</div><div>${cam.status==='online' ? 'STREAM (simulado)' : 'OFFLINE'}</div>`;
      tile.onclick = ()=>selectCamera(cam);
      grid.appendChild(tile);
    });
  }
  
  function selectCamera(cam){
    const details = document.getElementById('camera-details');
    details.innerHTML = `<strong>${cam.tag}</strong><p>${cam.location}</p><p>Status: ${cam.status}</p>
    <button onclick="snapshot(${cam.camera_id})">Snapshot</button>
    <button onclick="startRecording(${cam.camera_id})">Iniciar Gravação</button>`;
  }
  
  function snapshot(id){ alert('Snapshot simulado - camera ' + id); }
  function startRecording(id){ alert('Start recording simulado - camera ' + id); }
  
  renderCameraList();
  renderGrid();
  