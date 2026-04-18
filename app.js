// ClinicFlow Application JavaScript
// Data Storage using localStorage

// Initialize data structures
let patients = JSON.parse(localStorage.getItem('patients')) || [];
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

// Common medicines database for autocomplete
const commonMedicines = [
    'Paracetamol 500mg',
    'Paracetamol 1000mg',
    'Ibuprofen 400mg',
    'Amoxicillin 500mg',
    'Azithromycin 500mg',
    'Cefixime 200mg',
    'Ciprofloxacin 500mg',
    'Omeprazole 20mg',
    'Montelukast 10mg',
    'Cetirizine 10mg',
    'Loratadine 10mg',
    'Metformin 500mg',
    'Atorvastatin 20mg',
    'Amlodipine 5mg'
];

// Generate MR number
function generateMRNumber() {
    const count = patients.length + 1;
    return `MR${String(count).padStart(5, '0')}`;
}

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    updateCurrentDate();
    
    // Load initial data
    if (patients.length === 0) {
        initializeSampleData();
    }
    
    // Load dashboard
    loadDashboard();
    
    // Set today's date for appointment filter
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').value = today;
    document.getElementById('appointmentDateInput').value = today;
});

// Initialize sample data for demo
function initializeSampleData() {
    // Sample patients
    const samplePatients = [
        {
            id: Date.now() + 1,
            mrNumber: 'MR00001',
            name: 'Ahmed Ali',
            age: 45,
            gender: 'Male',
            phone: '03001234567',
            email: 'ahmed@email.com',
            cnic: '12345-1234567-1',
            bloodGroup: 'B+',
            address: 'Street 5, F-6, Islamabad',
            createdAt: new Date().toISOString(),
            lastVisit: new Date().toISOString()
        },
        {
            id: Date.now() + 2,
            mrNumber: 'MR00002',
            name: 'Fatima Hassan',
            age: 32,
            gender: 'Female',
            phone: '03009876543',
            email: 'fatima@email.com',
            cnic: '12345-7654321-2',
            bloodGroup: 'O+',
            address: 'House 12, G-9, Islamabad',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            lastVisit: new Date().toISOString()
        },
        {
            id: Date.now() + 3,
            mrNumber: 'MR00003',
            name: 'Muhammad Raza',
            age: 28,
            gender: 'Male',
            phone: '03112345678',
            email: 'raza@email.com',
            cnic: '12345-9876543-3',
            bloodGroup: 'A+',
            address: 'Flat 8, Bahria Town, Rawalpindi',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            lastVisit: new Date(Date.now() - 86400000).toISOString()
        }
    ];
    
    // Sample appointments for today
    const now = new Date();
    const today = new Date().toISOString().split('T')[0];
    
    const sampleAppointments = [
        {
            id: Date.now() + 1,
            patientId: samplePatients[0].id,
            patientName: samplePatients[0].name,
            doctor: 'Dr. Ahmed',
            date: today,
            time: '09:00',
            complaint: 'Follow-up checkup',
            status: 'completed',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 2,
            patientId: samplePatients[1].id,
            patientName: samplePatients[1].name,
            doctor: 'Dr. Ahmed',
            date: today,
            time: '09:30',
            complaint: 'Fever for 3 days',
            status: 'checked-in',
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 3,
            patientId: samplePatients[2].id,
            patientName: samplePatients[2].name,
            doctor: 'Dr. Ahmed',
            date: today,
            time: '10:00',
            complaint: 'New patient - general checkup',
            status: 'booked',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Sample invoices
    const sampleInvoices = [
        {
            id: Date.now() + 1,
            invoiceNumber: 'INV-001',
            patientId: samplePatients[0].id,
            patientName: samplePatients[0].name,
            items: [{name: 'Consultation Fee', quantity: 1, price: 1500}],
            subtotal: 1500,
            discount: 0,
            total: 1500,
            paymentMethod: 'cash',
            date: new Date().toISOString(),
            status: 'paid'
        },
        {
            id: Date.now() + 2,
            invoiceNumber: 'INV-002',
            patientId: samplePatients[1].id,
            patientName: samplePatients[1].name,
            items: [
                {name: 'Consultation Fee', quantity: 1, price: 1500},
                {name: 'Lab Tests', quantity: 1, price: 2000}
            ],
            subtotal: 3500,
            discount: 10,
            total: 3150,
            paymentMethod: 'easypaisa',
            date: new Date().toISOString(),
            status: 'paid'
        }
    ];
    
    patients = samplePatients;
    appointments = sampleAppointments;
    invoices = sampleInvoices;
    
    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

// Update current date display
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

// Section Management
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active from all links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const sectionMap = {
        'dashboard': 'dashboardSection',
        'patients': 'patientsSection',
        'appointments': 'appointmentsSection',
        'prescriptions': 'prescriptionsSection',
        'billing': 'billingSection',
        'reports': 'reportsSection'
    };
    
    document.getElementById(sectionMap[sectionName]).classList.remove('hidden');
    
    // Update active link
    event.target.closest('.sidebar-link').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'patients': 'Patient Management',
        'appointments': 'Appointments',
        'prescriptions': 'Prescriptions',
        'billing': 'Billing & Payments',
        'reports': 'Reports & Analytics'
    };
    
    const subtitles = {
        'dashboard': 'Overview of your clinic',
        'patients': 'Manage patient records',
        'appointments': 'Schedule and manage appointments',
        'prescriptions': 'Create and manage prescriptions',
        'billing': 'Generate invoices and track payments',
        'reports': 'View clinic analytics and reports'
    };
    
    document.getElementById('pageTitle').textContent = titles[sectionName];
    document.getElementById('pageSubtitle').textContent = subtitles[sectionName];
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'patients':
            loadPatients();
            break;
        case 'appointments':
            loadAppointments();
            break;
        case 'prescriptions':
            loadPrescriptionHistory();
            break;
        case 'billing':
            loadBillingPage();
            break;
        case 'reports':
            loadReports();
            break;
    }
}

// Dashboard Functions
function loadDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    
    // Update KPIs
    document.getElementById('todayAppointments').textContent = todayAppointments.length;
    document.getElementById('completedAppointments').textContent = 
        todayAppointments.filter(apt => apt.status === 'completed').length;
    document.getElementById('upcomingAppointments').textContent = 
        todayAppointments.filter(apt => apt.status === 'booked').length;
    
    // Calculate today's revenue
    const todayInvoices = invoices.filter(inv => 
        inv.date.split('T')[0] === today && inv.status === 'paid'
    );
    const todayRevenue = todayInvoices.reduce((sum, inv) => sum + inv.total, 0);
    document.getElementById('todayRevenue').textContent = todayRevenue.toLocaleString();
    
    // Total patients
    document.getElementById('totalPatients').textContent = patients.length;
    
    // New patients today
    const newToday = patients.filter(p => 
        p.createdAt.split('T')[0] === today
    ).length;
    document.getElementById('newPatientsToday').textContent = newToday;
    
    // Waiting patients (checked-in status)
    const waiting = todayAppointments.filter(apt => apt.status === 'checked-in').length;
    document.getElementById('waitingPatients').textContent = waiting;
    
    // Load upcoming appointments table
    loadUpcomingAppointments();
    
    // Load charts
    loadRevenueChart();
}

function loadUpcomingAppointments() {
    const today = new Date().toISOString().split('T')[0];
    const upcoming = appointments
        .filter(apt => apt.date === today && apt.status !== 'completed' && apt.status !== 'cancelled')
        .sort((a, b) => a.time.localeCompare(b.time))
        .slice(0, 5);
    
    const tbody = document.getElementById('upcomingAppointmentsList');
    
    if (upcoming.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No upcoming appointments</td></tr>';
        return;
    }
    
    tbody.innerHTML = upcoming.map(apt => {
        const patient = patients.find(p => p.id === apt.patientId);
        const statusColors = {
            'booked': 'bg-blue-100 text-blue-800',
            'checked-in': 'bg-green-100 text-green-800'
        };
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="py-3 px-4">${apt.time}</td>
                <td class="py-3 px-4 font-medium">${apt.patientName}</td>
                <td class="py-3 px-4">${patient ? patient.age : '-'}</td>
                <td class="py-3 px-4">${apt.complaint}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[apt.status] || 'bg-gray-100 text-gray-800'}">
                        ${apt.status.replace('-', ' ').toUpperCase()}
                    </span>
                </td>
                <td class="py-3 px-4">
                    ${apt.status === 'booked' ? 
                        `<button onclick="checkInPatient(${apt.id})" class="text-blue-600 hover:text-blue-700 text-sm">Check In</button>` :
                        `<button onclick="showSection('prescriptions')" class="text-green-600 hover:text-green-700 text-sm">Start Consultation</button>`
                    }
                </td>
            </tr>
        `;
    }).join('');
}

function checkInPatient(appointmentId) {
    const apt = appointments.find(a => a.id === appointmentId);
    if (apt) {
        apt.status = 'checked-in';
        saveData();
        loadDashboard();
        showNotification('Patient checked in successfully', 'success');
    }
}

function loadRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    // Get last 7 days revenue
    const last7Days = [];
    const revenueData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        
        const dayInvoices = invoices.filter(inv => 
            inv.date.split('T')[0] === dateStr && inv.status === 'paid'
        );
        const dayRevenue = dayInvoices.reduce((sum, inv) => sum + inv.total, 0);
        revenueData.push(dayRevenue);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Revenue (Rs)',
                data: revenueData,
                borderColor: '#0066CC',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rs ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Patient Management
function loadPatients() {
    const tbody = document.getElementById('patientsList');
    
    if (patients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No patients found</td></tr>';
        return;
    }
    
    renderPatients(patients);
}

function renderPatients(patientList) {
    const tbody = document.getElementById('patientsList');
    
    tbody.innerHTML = patientList.map(patient => {
        const lastVisit = new Date(patient.lastVisit).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="py-4 px-6 font-medium text-blue-600">${patient.mrNumber}</td>
                <td class="py-4 px-6 font-medium">${patient.name}</td>
                <td class="py-4 px-6">${patient.age} / ${patient.gender}</td>
                <td class="py-4 px-6">${patient.phone}</td>
                <td class="py-4 px-6">${lastVisit}</td>
                <td class="py-4 px-6">
                    <button onclick="viewPatient(${patient.id})" class="text-blue-600 hover:text-blue-700 mr-3">View</button>
                    <button onclick="deletePatient(${patient.id})" class="text-red-600 hover:text-red-700">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function searchPatients() {
    const query = document.getElementById('patientSearch').value.toLowerCase();
    
    if (!query) {
        renderPatients(patients);
        return;
    }
    
    const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.phone.includes(query) ||
        p.mrNumber.toLowerCase().includes(query) ||
        (p.cnic && p.cnic.includes(query))
    );
    
    renderPatients(filtered);
}

function savePatient(event) {
    event.preventDefault();
    
    const newPatient = {
        id: Date.now(),
        mrNumber: generateMRNumber(),
        name: document.getElementById('patientName').value,
        age: parseInt(document.getElementById('patientAge').value),
        gender: document.getElementById('patientGender').value,
        phone: document.getElementById('patientPhone').value,
        email: document.getElementById('patientEmail').value,
        cnic: document.getElementById('patientCNIC').value,
        bloodGroup: document.getElementById('patientBloodGroup').value,
        address: document.getElementById('patientAddress').value,
        createdAt: new Date().toISOString(),
        lastVisit: new Date().toISOString()
    };
    
    patients.push(newPatient);
    saveData();
    
    closeModal('addPatientModal');
    document.getElementById('addPatientForm').reset();
    
    if (document.getElementById('patientsSection').classList.contains('hidden')) {
        showSection('patients');
    } else {
        loadPatients();
    }
    
    showNotification('Patient added successfully!', 'success');
}

function viewPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        alert(`Patient Details:\n\nMR No: ${patient.mrNumber}\nName: ${patient.name}\nAge: ${patient.age}\nGender: ${patient.gender}\nPhone: ${patient.phone}\nBlood Group: ${patient.bloodGroup || 'N/A'}`);
    }
}

function deletePatient(patientId) {
    if (confirm('Are you sure you want to delete this patient?')) {
        patients = patients.filter(p => p.id !== patientId);
        saveData();
        loadPatients();
        showNotification('Patient deleted', 'success');
    }
}

// Appointments Management
function loadAppointments() {
    filterAppointments();
    populatePatientSelects();
}

function filterAppointments() {
    const dateFilter = document.getElementById('appointmentDate').value;
    const statusFilter = document.getElementById('appointmentStatus').value;
    
    let filtered = appointments;
    
    if (dateFilter) {
        filtered = filtered.filter(apt => apt.date === dateFilter);
    }
    
    if (statusFilter) {
        filtered = filtered.filter(apt => apt.status === statusFilter);
    }
    
    renderAppointments(filtered);
}

function renderAppointments(appointmentList) {
    const tbody = document.getElementById('appointmentsList');
    
    if (appointmentList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No appointments found</td></tr>';
        return;
    }
    
    const sorted = appointmentList.sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });
    
    tbody.innerHTML = sorted.map(apt => {
        const statusColors = {
            'booked': 'bg-blue-100 text-blue-800',
            'checked-in': 'bg-green-100 text-green-800',
            'completed': 'bg-gray-100 text-gray-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="py-4 px-6">${apt.date} ${apt.time}</td>
                <td class="py-4 px-6 font-medium">${apt.patientName}</td>
                <td class="py-4 px-6">${apt.doctor}</td>
                <td class="py-4 px-6">${apt.complaint || 'N/A'}</td>
                <td class="py-4 px-6">
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}">
                        ${apt.status.replace('-', ' ').toUpperCase()}
                    </span>
                </td>
                <td class="py-4 px-6">
                    ${apt.status !== 'completed' && apt.status !== 'cancelled' ?
                        `<button onclick="updateAppointmentStatus(${apt.id}, 'completed')" class="text-green-600 hover:text-green-700 mr-2">Complete</button>
                         <button onclick="updateAppointmentStatus(${apt.id}, 'cancelled')" class="text-red-600 hover:text-red-700">Cancel</button>` :
                        '-'
                    }
                </td>
            </tr>
        `;
    }).join('');
}

function populatePatientSelects() {
    const selects = [
        document.getElementById('appointmentPatient'),
        document.getElementById('prescriptionPatientSelect'),
        document.getElementById('billingPatient')
    ];
    
    selects.forEach(select => {
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">-- Select Patient --</option>' + 
                patients.map(p => `<option value="${p.id}">${p.name} (${p.mrNumber})</option>`).join('');
            if (currentValue) select.value = currentValue;
        }
    });
}

function saveAppointment(event) {
    event.preventDefault();
    
    const patientId = parseInt(document.getElementById('appointmentPatient').value);
    const patient = patients.find(p => p.id === patientId);
    
    const newAppointment = {
        id: Date.now(),
        patientId: patientId,
        patientName: patient.name,
        doctor: document.getElementById('appointmentDoctor').value,
        date: document.getElementById('appointmentDateInput').value,
        time: document.getElementById('appointmentTime').value,
        complaint: document.getElementById('appointmentComplaint').value,
        status: 'booked',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    saveData();
    
    closeModal('addAppointmentModal');
    document.getElementById('addAppointmentForm').reset();
    filterAppointments();
    
    showNotification('Appointment booked successfully!', 'success');
}

function updateAppointmentStatus(appointmentId, newStatus) {
    const apt = appointments.find(a => a.id === appointmentId);
    if (apt) {
        apt.status = newStatus;
        saveData();
        filterAppointments();
        showNotification(`Appointment ${newStatus}`, 'success');
    }
}

// Prescription Management
let currentPrescriptionPatient = null;
let currentMedications = [];

function startPrescription() {
    const patientId = parseInt(document.getElementById('prescriptionPatientSelect').value);
    if (!patientId) {
        alert('Please select a patient');
        return;
    }
    
    currentPrescriptionPatient = patients.find(p => p.id === patientId);
    document.getElementById('rxPatientName').value = currentPrescriptionPatient.name;
    document.getElementById('rxPatientAge').value = `${currentPrescriptionPatient.age} / ${currentPrescriptionPatient.gender}`;
    
    currentMedications = [];
    addMedication();
    
    closeModal('selectPatientModal');
    document.getElementById('prescriptionForm').classList.remove('hidden');
}

function addMedication() {
    const medicationId = Date.now();
    currentMedications.push({ id: medicationId, name: '', dosage: '', frequency: '', duration: '' });
    
    const container = document.getElementById('medicationsList');
    const div = document.createElement('div');
    div.className = 'grid grid-cols-12 gap-3';
    div.id = `med-${medicationId}`;
    div.innerHTML = `
        <div class="col-span-4">
            <input type="text" placeholder="Medicine name" 
                   class="w-full border border-gray-300 rounded-lg px-3 py-2"
                   onchange="updateMedication(${medicationId}, 'name', this.value)"
                   list="medicineList">
        </div>
        <div class="col-span-3">
            <input type="text" placeholder="Dosage (e.g., 1 tab)" 
                   class="w-full border border-gray-300 rounded-lg px-3 py-2"
                   onchange="updateMedication(${medicationId}, 'dosage', this.value)">
        </div>
        <div class="col-span-3">
            <input type="text" placeholder="Frequency (e.g., TDS)" 
                   class="w-full border border-gray-300 rounded-lg px-3 py-2"
                   onchange="updateMedication(${medicationId}, 'frequency', this.value)">
        </div>
        <div class="col-span-2">
            <input type="text" placeholder="Days" 
                   class="w-full border border-gray-300 rounded-lg px-3 py-2"
                   onchange="updateMedication(${medicationId}, 'duration', this.value)">
        </div>
    `;
    container.appendChild(div);
    
    // Add datalist for autocomplete
    if (!document.getElementById('medicineList')) {
        const datalist = document.createElement('datalist');
        datalist.id = 'medicineList';
        datalist.innerHTML = commonMedicines.map(med => `<option value="${med}">`).join('');
        document.body.appendChild(datalist);
    }
}

function updateMedication(id, field, value) {
    const med = currentMedications.find(m => m.id === id);
    if (med) {
        med[field] = value;
    }
}

function savePrescription() {
    if (!currentPrescriptionPatient) return;
    
    const prescription = {
        id: Date.now(),
        patientId: currentPrescriptionPatient.id,
        patientName: currentPrescriptionPatient.name,
        complaint: document.getElementById('rxComplaint').value,
        diagnosis: document.getElementById('rxDiagnosis').value,
        medications: currentMedications.filter(m => m.name),
        instructions: document.getElementById('rxInstructions').value,
        date: new Date().toISOString(),
        doctor: 'Dr. Ahmed'
    };
    
    prescriptions.push(prescription);
    saveData();
    
    showNotification('Prescription saved successfully!', 'success');
    
    // Print prescription
    printPrescription(prescription);
    
    // Reset form
    cancelPrescription();
    loadPrescriptionHistory();
}

function cancelPrescription() {
    document.getElementById('prescriptionForm').classList.add('hidden');
    document.getElementById('rxComplaint').value = '';
    document.getElementById('rxDiagnosis').value = '';
    document.getElementById('rxInstructions').value = '';
    document.getElementById('medicationsList').innerHTML = '';
    currentPrescriptionPatient = null;
    currentMedications = [];
}

function printPrescription(prescription) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Prescription - ${prescription.patientName}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .header { text-align: center; border-bottom: 2px solid #0066CC; padding-bottom: 20px; margin-bottom: 30px; }
                .clinic-name { font-size: 24px; font-weight: bold; color: #0066CC; }
                .patient-info { margin-bottom: 30px; }
                .section { margin-bottom: 20px; }
                .section-title { font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                .medication { margin-left: 20px; margin-bottom: 10px; }
                .footer { margin-top: 50px; text-align: right; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="clinic-name">City Medical Center</div>
                <div>Dr. Ahmed - MBBS, FCPS (Medicine)</div>
                <div>Phone: +92-333-1234567</div>
            </div>
            
            <div class="patient-info">
                <strong>Patient Name:</strong> ${prescription.patientName}<br>
                <strong>MR No:</strong> ${patients.find(p => p.id === prescription.patientId).mrNumber}<br>
                <strong>Date:</strong> ${new Date(prescription.date).toLocaleDateString('en-US')}
            </div>
            
            <div class="section">
                <div class="section-title">Chief Complaint</div>
                <div>${prescription.complaint || 'N/A'}</div>
            </div>
            
            <div class="section">
                <div class="section-title">Diagnosis</div>
                <div>${prescription.diagnosis}</div>
            </div>
            
            <div class="section">
                <div class="section-title">Rx (Medications)</div>
                ${prescription.medications.map((med, index) => `
                    <div class="medication">
                        ${index + 1}. ${med.name} - ${med.dosage} - ${med.frequency} - ${med.duration} days
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <div class="section-title">Instructions</div>
                <div>${prescription.instructions || 'N/A'}</div>
            </div>
            
            <div class="footer">
                <p>_____________________</p>
                <p>Dr. Ahmed</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

function loadPrescriptionHistory() {
    const container = document.getElementById('prescriptionHistoryList');
    const recent = prescriptions.slice(-10).reverse();
    
    if (recent.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No prescriptions yet</p>';
        return;
    }
    
    container.innerHTML = recent.map(rx => `
        <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
                <div>
                    <div class="font-semibold">${rx.patientName}</div>
                    <div class="text-sm text-gray-600">${new Date(rx.date).toLocaleDateString('en-US')}</div>
                </div>
                <button onclick="printPrescription(${JSON.stringify(rx).replace(/"/g, '&quot;')})" 
                        class="text-blue-600 hover:text-blue-700 text-sm">
                    Print
                </button>
            </div>
            <div class="text-sm text-gray-700">
                <strong>Diagnosis:</strong> ${rx.diagnosis}
            </div>
        </div>
    `).join('');
}

// Billing Management
function loadBillingPage() {
    populatePatientSelects();
    loadRecentInvoices();
    
    // Setup payment method buttons
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(b => {
                b.classList.remove('active', 'border-blue-600', 'bg-blue-50', 'text-blue-600');
                b.classList.add('border-gray-300');
            });
            this.classList.add('active', 'border-blue-600', 'bg-blue-50', 'text-blue-600');
        });
    });
}

function addBillingItem() {
    const container = document.getElementById('billingItemsList');
    const div = document.createElement('div');
    div.className = 'grid grid-cols-12 gap-3';
    div.innerHTML = `
        <div class="col-span-6">
            <input type="text" placeholder="Service/Item" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </div>
        <div class="col-span-2">
            <input type="number" value="1" min="1" class="w-full border border-gray-300 rounded-lg px-3 py-2" oninput="calculateTotal()">
        </div>
        <div class="col-span-3">
            <input type="number" placeholder="Price" class="w-full border border-gray-300 rounded-lg px-3 py-2" oninput="calculateTotal()">
        </div>
        <div class="col-span-1 flex items-center justify-center">
            <button onclick="this.closest('.grid').remove(); calculateTotal()" class="text-red-600 hover:text-red-700">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </button>
        </div>
    `;
    container.appendChild(div);
    calculateTotal();
}

function calculateTotal() {
    const items = document.querySelectorAll('#billingItemsList > .grid');
    let subtotal = 0;
    
    items.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const qty = parseFloat(inputs[1].value) || 0;
        const price = parseFloat(inputs[2].value) || 0;
        subtotal += qty * price;
    });
    
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const total = subtotal * (1 - discount / 100);
    
    document.getElementById('subtotal').textContent = subtotal.toLocaleString();
    document.getElementById('totalAmount').textContent = Math.round(total).toLocaleString();
}

function createInvoice() {
    const patientId = parseInt(document.getElementById('billingPatient').value);
    if (!patientId) {
        alert('Please select a patient');
        return;
    }
    
    const patient = patients.find(p => p.id === patientId);
    const items = [];
    
    document.querySelectorAll('#billingItemsList > .grid').forEach(item => {
        const inputs = item.querySelectorAll('input');
        items.push({
            name: inputs[0].value,
            quantity: parseFloat(inputs[1].value),
            price: parseFloat(inputs[2].value)
        });
    });
    
    const subtotal = parseFloat(document.getElementById('subtotal').textContent.replace(/,/g, ''));
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const total = parseFloat(document.getElementById('totalAmount').textContent.replace(/,/g, ''));
    
    const paymentMethod = document.querySelector('.payment-method.active').dataset.method;
    
    const invoice = {
        id: Date.now(),
        invoiceNumber: `INV-${String(invoices.length + 1).padStart(4, '0')}`,
        patientId: patientId,
        patientName: patient.name,
        items: items,
        subtotal: subtotal,
        discount: discount,
        total: total,
        paymentMethod: paymentMethod,
        date: new Date().toISOString(),
        status: 'paid'
    };
    
    invoices.push(invoice);
    saveData();
    
    showNotification('Invoice created successfully!', 'success');
    
    // Print invoice
    printInvoice(invoice);
    
    // Reset form
    document.getElementById('billingPatient').value = '';
    document.getElementById('discount').value = '0';
    document.getElementById('billingItemsList').innerHTML = `
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6">
                <input type="text" value="Consultation Fee" class="w-full border border-gray-300 rounded-lg px-3 py-2">
            </div>
            <div class="col-span-2">
                <input type="number" value="1" class="w-full border border-gray-300 rounded-lg px-3 py-2">
            </div>
            <div class="col-span-3">
                <input type="number" value="1500" class="w-full border border-gray-300 rounded-lg px-3 py-2" oninput="calculateTotal()">
            </div>
            <div class="col-span-1 flex items-center justify-center">
                <span class="text-gray-600">Rs 1,500</span>
            </div>
        </div>
    `;
    
    calculateTotal();
    loadRecentInvoices();
}

function printInvoice(invoice) {
    const patient = patients.find(p => p.id === invoice.patientId);
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Invoice - ${invoice.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .header { text-align: center; border-bottom: 2px solid #0066CC; padding-bottom: 20px; margin-bottom: 30px; }
                .clinic-name { font-size: 24px; font-weight: bold; color: #0066CC; }
                .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f3f4f6; font-weight: bold; }
                .totals { text-align: right; margin-top: 20px; }
                .totals div { margin-bottom: 10px; }
                .total-amount { font-size: 20px; font-weight: bold; color: #0066CC; }
                .footer { margin-top: 50px; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="clinic-name">City Medical Center</div>
                <div>Phone: +92-333-1234567 | Email: info@citymedical.pk</div>
            </div>
            
            <div class="invoice-info">
                <div>
                    <strong>Invoice No:</strong> ${invoice.invoiceNumber}<br>
                    <strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString('en-US')}<br>
                    <strong>Payment Method:</strong> ${invoice.paymentMethod.toUpperCase()}
                </div>
                <div>
                    <strong>Patient Details:</strong><br>
                    ${patient.name}<br>
                    MR No: ${patient.mrNumber}<br>
                    Phone: ${patient.phone}
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Item/Service</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>Rs ${item.price.toLocaleString()}</td>
                            <td>Rs ${(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="totals">
                <div>Subtotal: Rs ${invoice.subtotal.toLocaleString()}</div>
                <div>Discount (${invoice.discount}%): Rs ${(invoice.subtotal * invoice.discount / 100).toLocaleString()}</div>
                <div class="total-amount">Total: Rs ${invoice.total.toLocaleString()}</div>
            </div>
            
            <div class="footer">
                <p>Thank you for choosing City Medical Center</p>
                <p>This is a computer-generated invoice and does not require a signature</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

function loadRecentInvoices() {
    const container = document.getElementById('recentInvoicesList');
    const recent = invoices.slice(-5).reverse();
    
    if (recent.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No invoices yet</p>';
        return;
    }
    
    container.innerHTML = recent.map(inv => `
        <div class="bg-gray-50 rounded p-3">
            <div class="flex items-center justify-between mb-1">
                <div class="font-semibold text-sm">${inv.invoiceNumber}</div>
                <div class="text-blue-600 font-bold text-sm">Rs ${inv.total.toLocaleString()}</div>
            </div>
            <div class="text-xs text-gray-600 mb-2">${inv.patientName}</div>
            <button onclick='printInvoice(${JSON.stringify(inv)})' class="text-blue-600 text-xs hover:text-blue-700">
                Print
            </button>
        </div>
    `).join('');
}

// Reports
function loadReports() {
    loadMonthlyRevenueChart();
}

function loadMonthlyRevenueChart() {
    const ctx = document.getElementById('monthlyRevenueChart');
    if (!ctx) return;
    
    // Get revenue for each month (last 6 months)
    const months = [];
    const revenueData = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
        months.push(monthStr);
        
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthInvoices = invoices.filter(inv => {
            const invDate = new Date(inv.date);
            return invDate >= monthStart && invDate <= monthEnd && inv.status === 'paid';
        });
        
        const monthRevenue = monthInvoices.reduce((sum, inv) => sum + inv.total, 0);
        revenueData.push(monthRevenue);
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Revenue (Rs)',
                data: revenueData,
                backgroundColor: '#0066CC',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rs ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    
    // Populate patient selects when opening modals
    if (modalId === 'addAppointmentModal' || modalId === 'selectPatientModal') {
        populatePatientSelects();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Notifications
function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});
