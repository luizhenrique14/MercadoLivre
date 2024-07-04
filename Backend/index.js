const express = require('express');
const sequelize = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Conectar ao banco de dados
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync error:', err);
  process.exit(1);
});

// Middleware
app.use(express.json());

// Rotas
app.use('/api', cartRoutes);
app.use('/api', productRoutes); 

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
