
import express from 'express';
import cors from 'cors';
import DBconfig from './config/DBconfig.js';

import productrouter from './routes/products.js';
import userRouter from './routes/users.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import orderRouter from './routes/orders.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productrouter);
app.use('/api/auth', userRouter);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/orders', orderRouter);

// Connect Database
DBconfig();

// Start Server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
