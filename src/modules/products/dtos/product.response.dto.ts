import { IProductResponse } from '@modules/products/interfaces/product-response.interface';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *           description: Auto-generated unique ID
 *         name:
 *           type: string
 *           example: "Premium Wireless Headphones"
 *           minLength: 2
 *           maxLength: 100
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Noise-cancelling with 30hr battery"
 *           maxLength: 1000
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 199.99
 *         stock:
 *           type: integer
 *           minimum: 0
 *           example: 50
 *         category:
 *           type: string
 *           example: "Electronics"
 *           default: "Uncategorized"
 *         imageUrl:
 *           type: string
 *           format: uri
 *           example: "https://example.com/product.jpg"
 *           default: "https://via.placeholder.com/150"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-02T00:00:00Z"
 *       required:
 *         - id
 *         - name
 *         - price
 *         - stock
 *         - createdAt
 */
export class ProductResponseDto implements IProductResponse {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  category!: string;
  imageUrl!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: IProductResponse) {
    Object.assign(this, {
      ...data,
      category: data.category || 'Uncategorized',
      imageUrl: data.imageUrl || 'https://via.placeholder.com/150'
    });
  }
}
