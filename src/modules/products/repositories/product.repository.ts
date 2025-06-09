import { v4 as uuidv4 } from 'uuid';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { IProduct } from '../interfaces/product.interface';

export class ProductRepository implements IProductRepository {
  private products: IProduct[] = [];

  async findAll(): Promise<IProduct[]> {
    return this.products;
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.products.find(p => p.id === id) ?? null;
  }

  async create(product: IProduct): Promise<IProduct> {
    const newProduct = { ...product, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, update: Partial<IProduct>): Promise<IProduct | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.products[index],
      ...update,
      updatedAt: new Date(),
    };
    this.products[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  async findBy(filters: Partial<IProduct>): Promise<IProduct[]> {
    return this.products.filter(product =>
      Object.entries(filters).every(([key, value]) =>
        product[key as keyof IProduct]?.toString().includes(value?.toString() || '')
      )
    );
  }
}
