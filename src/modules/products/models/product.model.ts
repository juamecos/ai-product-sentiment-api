import { IProduct } from '@modules/products/interfaces/product.interface';
import { IProductResponse } from '@modules/products/interfaces/product-response.interface';

export interface IProductResponseFactory {
  fromEntity(product: IProduct): IProductResponse;
}


export interface IProductResponseFactory {
  fromEntity(product: IProduct): IProductResponse;
}


export class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public category: string = 'Uncategorized',
    public imageUrl: string = 'https://via.placeholder.com/150/default.jpg',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
