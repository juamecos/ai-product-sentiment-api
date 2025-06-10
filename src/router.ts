import { Router } from 'express';
import productRouter from '@modules/products/routes/product.routes';

const mainRouter = Router();

// Mount the product router
mainRouter.use('/products', productRouter);

// Add other module routers here in the future
// For example:
// import userRouter from './modules/users/user.routes';
// mainRouter.use('/users', userRouter);

export default mainRouter;
