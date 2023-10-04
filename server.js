import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

// Use the routes
app.use('/', routes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;
