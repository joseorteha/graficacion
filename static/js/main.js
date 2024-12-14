// Gráfica de usuarios
fetch('/usuarios')
    .then(response => response.json())
    .then(data => {
        const tipos = {};
        const fechas = {};

        data.forEach(usuario => {
            tipos[usuario.tipo] = (tipos[usuario.tipo] || 0) + 1;
            const fecha = new Date(usuario.fechaRegistro).toLocaleDateString();
            fechas[fecha] = (fechas[fecha] || 0) + 1;
        });

        const barLabels = Object.keys(tipos);
        const barData = Object.values(tipos);
        const lineLabels = Object.keys(fechas).sort((a, b) => new Date(a) - new Date(b));
        const lineData = lineLabels.map(fecha => fechas[fecha]);
        const pieLabels = barLabels;
        const pieData = barData;

        var ctxBar = document.getElementById('barChart').getContext('2d');
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Número de usuarios por tipo',
                    data: barData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var ctxLine = document.getElementById('lineChart').getContext('2d');
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: lineLabels,
                datasets: [{
                    label: 'Registros de usuarios por fecha',
                    data: lineData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var ctxPie = document.getElementById('pieChart').getContext('2d');
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: pieLabels,
                datasets: [{
                    label: 'Distribución de usuarios por tipo',
                    data: pieData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    })
    .catch(error => console.error('Error:', error));

// Gráfica de conductores
fetch('/conductores')
    .then(response => response.json())
    .then(data => {
        const fechas = {};
        data.forEach(conductor => {
            const fecha = new Date(conductor.fechaContratacion).toLocaleDateString();
            fechas[fecha] = (fechas[fecha] || 0) + 1;
        });

        const lineLabels = Object.keys(fechas).sort((a, b) => new Date(a) - new Date(b));
        const lineData = lineLabels.map(fecha => fechas[fecha]);

        var ctxConductores = document.getElementById('conductoresChart').getContext('2d');
        new Chart(ctxConductores, {
            type: 'line',
            data: {
                labels: lineLabels,
                datasets: [{
                    label: 'Contrataciones de conductores por fecha',
                    data: lineData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));

// Gráfica de rutas
fetch('/rutas')
    .then(response => response.json())
    .then(data => {
        const destinos = {};
        data.forEach(ruta => {
            destinos[ruta.destino] = (destinos[ruta.destino] || 0) + 1;
        });

        const barLabels = Object.keys(destinos);
        const barData = Object.values(destinos);

        var ctxRutas = document.getElementById('rutasChart').getContext('2d');
        new Chart(ctxRutas, {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Número de rutas por destino',
                    data: barData,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
