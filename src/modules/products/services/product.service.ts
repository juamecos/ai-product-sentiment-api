import { IProduct } from '../interfaces/product.interface';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { ProductRequestDto } from '../dtos/product.request.dto';

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  getAllProducts(): Promise<IProduct[]> {
    return this.productRepository.findAll();
  }

  getProductById(id: string): Promise<IProduct | null> {
    return this.productRepository.findById(id);
  }

  createProduct(dto: ProductRequestDto): Promise<IProduct> {
    const product: IProduct = {
      id: '',
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.productRepository.create(product);
  }

  updateProduct(id: string, dto: Partial<ProductRequestDto>): Promise<IProduct | null> {
    return this.productRepository.update(id, dto);
  }

  deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }

  findProductsBy(filters: Partial<IProduct>): Promise<IProduct[]> {
    return this.productRepository.findBy(filters);
  }
}
