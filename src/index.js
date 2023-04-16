const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(express.json());
app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(500).json({ message: 'Erro interno do servidor' });
});