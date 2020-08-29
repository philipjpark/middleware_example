const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

let users = [
  { name: 'Einstein', id: 1 },
  { name: 'Kepler', id: 2 },
];

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/users', (req, res, next) => {
  res.send(users);
});

app.post('/users', (req, res, next) => {
  const { name } = req.body;
  const id = users[users.length - 1].id + 1;
  const newUser = { name, id };
  users.push(newUser);
  res.send(newUser);
});

app.put('/users/:id', (req, res, next) => {
  const user = users.filter((user) => user.id === parseInt(req.params.id))[0];
  if (user === undefined) {
    res.send('user does not exist');
  }
  user.name = 'hello';
  res.send(user);
});

app.delete('/users/:id', (req, res, next) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.send(users);
});

app.use((req, res, next) => {
  console.log('hello');
  res.send('404 not found');
});

app.listen(4000, () => {
  console.log('Port 4000');
});
