import { IProduct } from '@modules/products/interfaces/product.interface';

export interface IProductRepository {
	findAll(): Promise<IProduct[]>;
	findById(id: string): Promise<IProduct | null>;
	create(product: IProduct): Promise<IProduct>;
	update(id: string, product: Partial<IProduct>): Promise<IProduct | null>;
	delete(id: string): Promise<boolean>;
	findBy(filters: Partial<IProduct>): Promise<IProduct[]>;
}
