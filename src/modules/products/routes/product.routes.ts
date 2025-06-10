import { Router } from 'express';
import { ProductFactory } from '@modules/products/factories/product.factory';
import { ProductRequestDto } from '@modules/products/dtos/product.request.dto';
import { ValidatorMiddlewareFactory } from '@common/middlewares/validation.middleware.factory';

// Create a new router instance
const productRouter = Router();

const validatorMiddlewareFactory = new ValidatorMiddlewareFactory();

// Resolve dependencies
const productController = ProductFactory.createProductController();

productRouter.get(
	'/',
	productController.getAllProducts.bind(productController),
);

productRouter.get(
	'/:id',
	productController.getProductById.bind(productController),
);

productRouter.post(
	'/',
	validatorMiddlewareFactory.createValidatorMiddleware(ProductRequestDto),
	productController.createProduct.bind(productController),
);

productRouter.put(
	'/:id',
	validatorMiddlewareFactory.createValidatorMiddleware(ProductRequestDto),
	productController.updateProduct.bind(productController),
);

productRouter.delete(
	'/:id',
	productController.deleteProduct.bind(productController),
);

export default productRouter;
