const express = require('express'); 
const app = express(); 
const port = 3000; 

// Définir la route pour la racine
app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

// Écouter sur le port défini
app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});
