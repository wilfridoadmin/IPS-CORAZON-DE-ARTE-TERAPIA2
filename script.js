const users = {
    'psicóloga': '2210',
    'admin': '221099'
};

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (users[username] === password) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'flex';
        loadPatients(); // Cargar pacientes desde localStorage
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function addPatient() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const date = document.getElementById('date').value;
    const evolution = document.getElementById('evolution').value.trim();
    const observations = document.getElementById('observations').value.trim();

    if (!name || !age || !date || !evolution || !observations) {
        alert('Por favor complete todos los campos.');
        return;
    }

    const patient = { name, age, date, evolution, observations };
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));

    document.getElementById('patient-form').reset();
    loadPatients();
}

function loadPatients() {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const tableBody = document.getElementById('patients-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    patients.forEach((patient, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = patient.name;
        row.insertCell(1).innerText = patient.age;
        row.insertCell(2).innerText = patient.date;
        row.insertCell(3).innerText = patient.evolution;
        row.insertCell(4).innerText = patient.observations;
        row.insertCell(5).innerHTML = `
            <span class="edit-btn" onclick="editPatient(${index})">Editar</span>
            <span class="delete-btn" onclick="deletePatient(${index})">Eliminar</span>
            <span class="print-btn" onclick="printPatient(${index})">Imprimir</span>
        `;
    });
}

function editPatient(index) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients[index];

    document.getElementById('name').value = patient.name;
    document.getElementById('age').value = patient.age;
    document.getElementById('date').value = patient.date;
    document.getElementById('evolution').value = patient.evolution;
    document.getElementById('observations').value = patient.observations;

    deletePatient(index);
}

function deletePatient(index) {
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.splice(index, 1);
    localStorage.setItem('patients', JSON.stringify(patients));
    loadPatients();
}

function printPatient(index) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients[index];

    const printContent = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h1>IPS UNIDAD CORAZÓN DE ARTE TERAPIA</h1>
            <h2>Datos del Paciente</h2>
            <p><strong>Nombre Completo:</strong> ${patient.name}</p>
            <p><strong>Edad:</strong> ${patient.age}</p>
            <p><strong>Fecha de Atención:</strong> ${patient.date}</p>
            <p><strong>Evolución Diaria:</strong> ${patient.evolution}</p>
            <p><strong>Observaciones:</strong> ${patient.observations}</p>
            <p style="margin-top: 50px;"><strong>Atendido por:</strong> MICHELL LEIVA CASTRO</p>
            <p style="margin-top: 50px; font-style: italic;">"La felicidad no es algo hecho. Viene de tus propias acciones." - Dalai Lama</p>
        </div>
    `;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
}

function showDashboard() {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('patient-list').style.display = 'none';
}

function showPatients() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('patient-list').style.display = 'block';
}
