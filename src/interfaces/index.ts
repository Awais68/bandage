export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
  productImage: {
    asset: {
      _ref: string;
    };
  };
}
