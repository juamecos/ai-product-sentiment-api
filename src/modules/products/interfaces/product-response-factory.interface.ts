import { IProduct } from '@modules/products/interfaces/product.interface';
import { IProductResponse } from '@modules/products/interfaces/product-response.interface';

export interface IProductResponseFactory {
  fromEntity(product: IProduct): IProductResponse;
}
