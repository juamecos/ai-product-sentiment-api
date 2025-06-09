import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductRequestDto } from '../dtos/product.request.dto';
import { ProductResponseDto } from '../dtos/product.response.dto';

export class ProductController {
  constructor(private productService: ProductService) {}

/**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Retrieve all products
   *     description: Returns a list of all products in the system.
   *     tags:
   *       - Products
   *     responses:
   *       200:
   *         description: A list of products
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProductResponseDto'
   *       500:
   *         description: Internal server error
   */       

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getAllProducts();
      const productResponseDtos = products.map(product => new ProductResponseDto({
        ...product,
        category: product.category || 'Uncategorized',
        imageUrl: product.imageUrl || 'https://via.placeholder.com/150/default.jpg',
      }));
      res.status(200).json(productResponseDtos);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ error: message });
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: Retrieve a single product by ID
   *     description: Returns the product with the specified ID.
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to retrieve
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The requested product
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProductResponseDto'
   *       404:
   *         description: Product not found
   *       500:
   *         description: Internal server error
   */
  async getProductById(req: Request, res: Response) {
    try {
      const product = await this.productService.getProductById(req.params.id);
      if (product) {
        const productResponseDto = new ProductResponseDto({
          ...product,
          category: product.category || 'Uncategorized',
          imageUrl: product.imageUrl || 'https://via.placeholder.com/150/default.jpg',
        });
        res.status(200).json(productResponseDto);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ error: message });
    }
  }

  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Create a new product
   *     description: Adds a new product to the system.
   *     tags:
   *       - Products
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ProductRequestDto'
   *     responses:
   *       201:
   *         description: The created product
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProductResponseDto'
   *       400:
   *         description: Invalid input data
   *       500:
   *         description: Internal server error
   */
  async createProduct(req: Request, res: Response) {
    try {
      const productRequestDto = new ProductRequestDto();
      Object.assign(productRequestDto, req.body);
      const product = await this.productService.createProduct(productRequestDto);
      const productResponseDto = new ProductResponseDto({
        ...product,
        category: product.category || 'Uncategorized',
        imageUrl: product.imageUrl || 'https://via.placeholder.com/150/default.jpg',
      });
      res.status(201).json(productResponseDto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     summary: Update an existing product
   *     description: Updates the product with the specified ID.
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ProductRequestDto'
   *     responses:
   *       200:
   *         description: The updated product
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProductResponseDto'
   *       400:
   *         description: Invalid input data
   *       404:
   *         description: Product not found
   *       500:
   *         description: Internal server error
   */
  async updateProduct(req: Request, res: Response) {
    try {
      const productRequestDto = new ProductRequestDto();
      Object.assign(productRequestDto, req.body);
      const product = await this.productService.updateProduct(req.params.id, productRequestDto);
      if (product) {
        const productResponseDto = new ProductResponseDto({
          ...product,
          category: product.category || 'Uncategorized',
          imageUrl: product.imageUrl || 'https://via.placeholder.com/150/default.jpg',
        });
        res.status(200).json(productResponseDto);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     summary: Delete a product
   *     description: Deletes the product with the specified ID.
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to delete
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Product deleted successfully
   *       404:
   *         description: Product not found
   *       500:
   *         description: Internal server error
   */
  async deleteProduct(req: Request, res: Response) {
    try {
      const success = await this.productService.deleteProduct(req.params.id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ error: message });
    }
  }
}