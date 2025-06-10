import { ProductController } from '@modules/products/controllers/product.controller';
import { ProductService } from '@modules/products/services/product.service';
import { ProductRepository } from '@modules/products/repositories/product.repository';
// ProductModel is not used by ProductRepository in this case

export class ProductFactory {
  /**
   * Creates and returns an instance of ProductController.
   * This method handles the instantiation and dependency injection for the controller.
   */
  public static createProductController(): ProductController {
    // Typically, a real application would use a proper DI container or a more sophisticated factory.
    // For now, we'll manually instantiate dependencies.

    // 1. Create Repository
    //    Assuming ProductModel is a Mongoose model or similar.
    //    If ProductRepository doesn't require ProductModel directly in constructor, adjust accordingly.
    const productRepository = new ProductRepository(); // Corrected: No constructor arguments

    // 2. Create Service
    const productService = new ProductService(productRepository);

    // 3. Create Controller
    const productController = new ProductController(productService);

    return productController;
  }
}