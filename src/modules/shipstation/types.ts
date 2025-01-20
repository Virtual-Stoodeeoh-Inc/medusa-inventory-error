// todo: cleanup not utilized types
export type GetShippingRatesRequest = {
  shipment_id?: string;
  shipment?: Omit<Shipment, "shipment_id" | "shipment_status">;
  rate_options: {
    carrier_ids: string[];
    service_codes: string[];
    preferred_currency: string;
    package_types?: string[];
  };
};

export type ShipStationAddress = {
  name: string;
  phone: string;
  email?: string | null;
  company_name?: string | null;
  address_line1: string;
  address_line2?: string | null;
  address_line3?: string | null;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator: "unknown" | "yes" | "no";
  instructions?: string | null;
  geolocation?: {
    type?: string;
    value?: string;
  }[];
};

export type Shipment = {
  shipment_id: string;
  carrier_id: string;
  service_code: string;
  ship_to: ShipStationAddress;
  return_to?: ShipStationAddress;
  is_return?: boolean;
  ship_from: ShipStationAddress;
  items?: [
    {
      name?: string;
      quantity?: number;
      sku?: string;
      [k: string]: unknown;
    }
  ];
  packages: {
    weight: {
      value: number;
      unit: "pound" | "ounce" | "gram" | "kilogram";
    };
    [k: string]: unknown;
  }[];
  warehouse_id?: string;
  shipment_status: "pending" | "processing" | "label_purchased" | "cancelled";
  validate_address: "no_validation" | "validate_only" | "validate_and_clean";
  customs?: {
    contents:
      | "merchandise"
      | "documents"
      | "gift"
      | "returned_goods"
      | "sample"
      | "other";
    non_delivery: "return_to_sender" | "treat_as_abandoned";
  };
  [k: string]: unknown;
};

export type GetShippingRatesResponse = {
  shipment_id: string;
  carrier_id?: string;
  service_code?: string;
  external_order_id?: string;
  rate_response: RateResponse;
};

export type RateResponse = {
  rates: Rate[];
  errors?: {
    message: string;
    [k: string]: string;
  }[];
};

export type Rate = {
  rate_id: string;
  shipping_amount: {
    currency: string;
    amount: number;
  };
  insurance_amount: {
    currency: string;
    amount: number;
  };
  confirmation_amount: {
    currency: string;
    amount: number;
  };
  other_amount: {
    currency: string;
    amount: number;
  };
  tax_amount: {
    currency: string;
    amount: number;
  };
};

export type ShipStationV1Address = {
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
  billTo: ShipStationV1Address;
  shipTo: ShipStationV1Address;
  items: OrderItem[];
  amountPaid?: number;
  shippingAmount?: number;
  taxAmount?: number;
  customerNotes?: string;
  internalNotes?: string;
};
