import { Router, Request, Response } from 'express';
import productRouter from '@modules/products/routes/product.routes';

const mainRouter = Router();

// New route for the welcome page
mainRouter.get('/', (req: Request, res: Response) => {
  res.render('welcome');
});

mainRouter.use('/products', productRouter);

// Add other module routers here in the future
// For example:
// import userRouter from './modules/users/user.routes';
// mainRouter.use('/users', userRouter);

export default mainRouter;
