import { ShipStationOptions } from "./service";
import { MedusaError } from "@medusajs/framework/utils";
import { CreateShipStationOrderRequest } from "./types";

export class ShipStationClient {
  options: ShipStationOptions;

  constructor(options) {
    this.options = options;
  }

  private async sendRequest(url: string, data?: RequestInit): Promise<any> {
    console.log(data);

    return fetch(`https://ssapi.shipstation.com/${url}`, {
      ...data,
      headers: {
        ...data?.headers,
        // "api-key": this.options.api_key,
        Authorization:
          "Basic YzA4ZGNiOTkyZjg3NDk0OWFhMGE3MTIzOTYxYTI0OTQ6ZGZkM2RjOTZkMzJhNDk2Mjk5MzZkNjBkM2NhNDk2Yzk=",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        const contentType = resp.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          return resp.text();
        }

        return resp.json();
      })
      .then((resp) => {
        if (typeof resp !== "string" && resp.errors?.length) {
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            `An error occured while sending a request to ShipStation: ${resp.errors.map(
              (error) => error.message
            )}`
          );
        }

        return resp;
      })
      .catch((err) => {
        throw new MedusaError(MedusaError.Types.INVALID_DATA, err);
      });
  }

  async createOrder(data: CreateShipStationOrderRequest): Promise<any> {
    return await this.sendRequest("/orders/createorder", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
