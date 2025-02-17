export interface LoginModel {
  UserName: string;
  Password: string;
}
export enum POSPermission {
  Admin = 1,
  User = 2
}
export interface AuthResponse {
  success: boolean;
  message: string;
  userId: number;
  businessId: number;
  businessName: string;
  currencySpecialChar: string;
  businessNumber: string;
  hasSeatingArrangement: boolean;
  taxNumber: string;
  POSPermission: POSPermission;
  token: string;
  refreshToken: string;
}

export interface RecordStatus {
  recordStatusId: number;
  recordStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductCategory extends RecordStatus {
  id: number;
  clientBusinessId: number;
  clientBusiness: string;
  clientProductCategoryId?: number;
  categoryName: string;
  secondLanguageCategoryName?: string;
  parentClientProductCategory?: string;
  displayOrder: number;
  totalProducts: number;
}

export interface IProduct extends RecordStatus {
  id: number;
  clientProductCategoryId: number;
  clientProductCategory: string;
  productName: string;
  secondLanguageProductName: string;
  description: string;
  code: string;
  productUnitId: number;
  productUnit: string;
  minimumUnitToSale: number;
  minimumUnitPrice: number;
  unitIncrement: number;
  unitDecrement: number;
  productTaxes?: ProductTax[],
  discountAmount: number;
  discountPercentage: number;
  displayOrder: number;
}

export class ProductModel{
  product: IProduct;
  constructor(product: IProduct){
    this.product = product;
  }
  getOrderDiscount():number{
    var orderDiscount:number = 0;
    if(this.product.discountPercentage!=0){
      orderDiscount= this.product.minimumUnitPrice*this.product.discountPercentage/100;
    }else{
      orderDiscount = this.product.discountAmount+this.product.discountPercentage;
    }
    return orderDiscount;  
  }
}

export interface ProductTax extends RecordStatus {
  id: number;
  clientProductId: number;
  clientProduct: string;
  taxLabel: string;
  taxPercentage?: number;
  fromDate?: Date;
  toDate?: Date;
}

export interface IOrderItem {
  
}

export class shoppingCart {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  discount: number;
  totalPrice: number;
  tax: number;
  constructor(
    id: number,
    productId: number,
    productName: string,
    unit: string,
    quantity: number,
    price: number,
    totalPrice: number,
    tax: number,
    discount: number
    ) {
    this.id = id;
    this.productId = productId;
    this.productName = productName;
    this.unit = unit;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
    this.tax = tax;
    this.discount = discount;
  }
}

export interface PaymentModel {
  id: number;
  type: string;
  createdDate?: Date;
  updatedDate?: Date;
  isSelected: boolean;
}
export interface OrderStatusModel extends RecordStatus {
  id: number;
  status: string;
  createdDate?: Date;
  updatedDate?: Date;
  isSelected: boolean;
}

export interface SaleModel {
  id?: number;
  clientBusinessId: number;

}

export interface OrderItemTaxModel {
  id?: number;
  saleItemId?: number;
  taxLabel: string;
  taxPercentage: number;
}