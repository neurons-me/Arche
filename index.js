// apps/arche/index.js - Aplicación Arche que maneja múltiples dominios
const express = require('express');
const app = express();
const PORT = 9000; // Adjust the port as necessary

// Middleware para manejar las rutas basadas en el dominio de origen
app.use((req, res, next) => {
    const domain = req.headers.host; // Obtiene el dominio desde el request
    const [subdomain, ...rest] = domain.split('.'); // Separa el subdominio del resto del dominio
    const mainDomain = rest.join('.'); // Reconstruye el dominio principal (arche.com.mx)

    // Lógica para redirigir a diferentes secciones según el dominio
    if (mainDomain === 'arche.com.mx') {
        if (subdomain === 'arche' || subdomain === 'www') {
            // Ruta para el dominio principal arche.com.mx
            res.redirect('/arche');
        } else {
            // Ruta para los subdominios (username.arche.com.mx)
            req.username = subdomain; // Guardar el subdominio como nombre de usuario
            res.redirect('/user'); // Redirigir a la sección de usuario
        }
    } else {
        // Redirigir a una página por defecto o mostrar un error si el dominio no es reconocido
        res.redirect('/not-found');
    }
});

// Definición de las rutas específicas para cada sección

app.get('/arche', (req, res) => {
    // Renderiza o maneja la lógica para arche.com.mx home.
    res.send('Welcome to Arche.');
});

app.get('/user', (req, res) => {
    // Renderiza o maneja la lógica para usernames.arche.com.mx
    const username = req.username || 'Guest';
    res.send(`Welcome ${username}.`);
});

app.get('/not-found', (req, res) => {
    // Muestra una página de error o un mensaje de dominio no reconocido
    res.status(404).send('Dominio no reconocido.');
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Arche está escuchando en el puerto ${PORT}`);
    // Aquí puedes agregar la lógica para reportarte con Netget si es necesario
});