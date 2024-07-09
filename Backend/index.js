const express = require('express');
const sequelize = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const freight = require('./routes/freight');
const cors = require('cors');


const app = express();

// Conectar ao banco de dados
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced');
// }).catch(err => {
//   console.error('Database sync error:', err);
//   process.exit(1);
// });

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync error:', err);
  process.exit(1);
});

// Middleware
app.use(express.json());

app.use(cors());

// Rotas
app.use('/api', cartRoutes);
app.use('/api', productRoutes); 
app.use('/api', freight); 

// Porta do servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
