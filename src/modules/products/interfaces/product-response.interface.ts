export interface IProductResponse {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	imageUrl: string;
	createdAt: Date;
	updatedAt: Date;
}
