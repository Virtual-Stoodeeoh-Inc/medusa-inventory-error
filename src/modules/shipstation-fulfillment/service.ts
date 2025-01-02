// import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils";
// import { Logger } from "@medusajs/framework/types";
// import { FulfillmentOption } from "@medusajs/framework/types";

// type InjectedDependencies = {
//   logger: Logger;
// };

// type Options = {
//   apiKey: string;
// };

// class ShipStationFulfillmentService extends AbstractFulfillmentProviderService {
//   protected logger_: Logger;
//   protected options_: Options;
//   static identifier = "shipstation-fulfillment";

//   constructor({ logger }: InjectedDependencies, options: Options) {
//     super();

//     this.logger_ = logger;
//     this.options_ = options;
//   }

//   async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
//     return [
//       {
//         id: "FedEx Express",
//       },
//       {
//         id: "Extra Fast Return",
//         is_return: true,
//       },
//     ];
//   }

//   async validateFulfillmentData(
//     optionData: any,
//     data: any,
//     context: any
//   ): Promise<any> {
//     // assuming your client retrieves an ID from the
//     // third-party service
//     const externalId = "134343434";

//     return {
//       ...data,
//       externalId,
//     };
//   }

//   async validateOption(data: any): Promise<boolean> {
//     return data.external_id !== undefined;
//   }

//   async canCalculate(data: any): Promise<boolean> {
//     return data.custom_type !== "fixed";
//   }

//   async calculatePrice(optionData: any, data: any, cart: any): Promise<number> {
//     const price = 10;

//     return price;
//   }

//   async createFulfillment(
//     data: any,
//     items: any,
//     order: any,
//     fulfillment: any
//   ): Promise<any> {
//     const externalData = {
//       fulfillment_id: "123456789",
//     };

//     return {
//       data: {
//         ...data,
//         ...externalData,
//       },
//     };
//   }

//   async cancelFulfillment(fulfillment: any): Promise<any> {
//     // assuming the client cancels a fulfillment
//     // in the third-party service
//     return console.log("called");
//   }

//   async getFulfillmentDocuments(data: any): Promise<any> {
//     // assuming the client retrieves documents
//     // from a third-party service
//     return console.log("called");
//   }
// }

// export default ShipStationFulfillmentService;
