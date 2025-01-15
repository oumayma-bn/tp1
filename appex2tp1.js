const express = require('express');
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Données initiales
let users = [
  { id: 1, name: 'Aicha', email: 'aicha@gmail.com' },
  { id: 2, name: 'amine', email: 'amine@yahoo.com' }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// POST a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update a user
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).json({ error: 'At least one of name or email is required' });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email })
  };

  res.json(users[userIndex]);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  users.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
});

// Lancer le serveur
app.listen(3000, () => console.log('Server running on port 3000'));
