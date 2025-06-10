import { IProduct } from '@modules/products/interfaces/product.interface';
import { IProductResponse } from '@modules/products/interfaces/product-response.interface';
import { IProductResponseFactory } from '@modules/products/interfaces/product-response-factory.interface';
import { ProductResponseDto } from '@modules/products/dtos/product.response.dto';

export class ProductResponseFactory implements IProductResponseFactory {
  constructor(private readonly defaultImageUrl = 'https://via.placeholder.com/150/default.jpg') {}

  fromEntity(product: IProduct): IProductResponse {
    return new ProductResponseDto({
      ...product,
      category: product.category || 'Uncategorized',
      imageUrl: product.imageUrl || this.defaultImageUrl,
    });
  }
}
