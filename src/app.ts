import 'reflect-metadata'; // Essential for class-transformer and class-validator with decorators

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import chalk from 'chalk'; // For colorful console output

// --- Global Error Handlers (keep these at the very top of your main file) ---
process.on('uncaughtException', (error) => {
  console.error(chalk.red('--- Uncaught Exception Detected! ---'));
  console.error(chalk.red('Error Name:'), error.name);
  console.error(chalk.red('Error Message:'), error.message);
  console.error(chalk.red('Stack Trace:'), error.stack);
  process.exit(1); // It's good practice to exit the process after an uncaughtException
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.yellow('--- Unhandled Promise Rejection Detected! ---'));
  console.error(chalk.yellow('Reason:'), reason);
  console.error(chalk.yellow('Promise:'), promise);
  // You might choose to exit here, depending on your business logic
});
// --- End of Global Error Handlers ---

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev')); // 'dev' for development logging
app.use(express.json()); // To parse JSON in request bodies
app.use(compression()); // Compresses HTTP responses

// Example Route (ensure your routes are defined here or imported)
app.get('/', (req, res) => {
  res.send('AI Product Sentiment API is running!');
});

// You can add more routes and business logic here...
// For example, import your router modules:
// import productRoutes from './routes/productRoutes';
// app.use('/api/products', productRoutes);

// 404 Error Handling (if no route matches)
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Express Error Handling Middleware (for errors occurring in the Express pipeline)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(chalk.red('Error in Express pipeline:'), err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}, // Send full error details only in development
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
  console.log(chalk.blue(`Access the API at http://localhost:${PORT}`));
  // --- Updated Documentation Message ---
  console.log(chalk.magenta.bold('\nTo view the API documentation (Swagger/OpenAPI):'));
  console.log(chalk.magenta('  1. Generate the Swagger JSON: ') + chalk.yellow('npm run generate-docs'));
  console.log(chalk.magenta('  2. Open the documentation in your browser: ') + chalk.yellow('npm run open-api'));
  console.log(chalk.magenta('  (Alternatively, build static HTML docs: ') + chalk.yellow('npm run build-docs)'));
  // --- End Updated Documentation Message ---
});