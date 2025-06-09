import { IsString, IsNumber, IsOptional, IsPositive, Min, MaxLength } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductRequestDto:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Premium Wireless Headphones"
 *           description: Product name (2-100 characters)
 *         description:
 *           type: string
 *           minLength: 10
 *           maxLength: 1000
 *           example: "Noise-cancelling headphones with 30-hour battery life"
 *           description: Detailed product description (10-1000 characters)
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *           maximum: 1000000
 *           example: 199.99
 *           description: Product price in USD (must be positive)
 *         stock:
 *           type: integer
 *           minimum: 0
 *           example: 50
 *           description: Available inventory count
 *         category:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           example: "Electronics"
 *           description: Product category (optional)
 *         imageUrl:
 *           type: string
 *           format: uri
 *           maxLength: 2048
 *           nullable: true
 *           example: "https://example.com/products/headphones.jpg"
 *           description: URL to product image (optional)
 *       example:
 *         name: "Premium Wireless Headphones"
 *         description: "Industry-leading noise cancellation with 30-hour battery"
 *         price: 199.99
 *         stock: 50
 *         category: "Electronics"
 *         imageUrl: "https://example.com/products/headphones.jpg"
 */
export class ProductRequestDto {
  @IsString()
  @Min(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  name!: string;

  @IsString()
  @Min(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Description cannot exceed 1000 characters' })
  description!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  @Min(0.01, { message: 'Price must be at least $0.01' })
  price!: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Category cannot exceed 50 characters' })
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048, { message: 'Image URL cannot exceed 2048 characters' })
  imageUrl?: string;
}