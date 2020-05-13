export interface ProductService<T> {
  readonly products: T[];
  createProduct(id: string, name: string, sizeStr?: string, price?: number): T;
  getPhotoUrl(product: T, sizeType?: 'q' | 'x' | 'y' ): string;
}
