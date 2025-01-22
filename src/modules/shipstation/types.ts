export type ShipStationAddress = {
  name: string;
  company: string;
  street1: string;
  street2?: string;
  street3?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  residential: boolean;
};

export type OrderItem = {
  productId?: number;
  sku: string;
  name: string;
  imageUrl?: string;
  weight?: {
    value: number;
    unit: "ounces";
  };
  quantity: number;
  unitPrice: number;
  shippingAmount?: number;
};

export type CreateShipStationOrderRequest = {
  orderNumber: string;
  orderDate: string;
  paymentDate: string;
  orderStatus: "awaiting_shipment";
  customerEmail: string;
  billTo: ShipStationAddress;
  shipTo: ShipStationAddress;
  items: OrderItem[];
  amountPaid?: number;
  shippingAmount?: number;
  taxAmount?: number;
  customerNotes?: string;
  internalNotes?: string;
};
