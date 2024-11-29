import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Text, clx } from "@medusajs/ui";

const OrderIMEIWidget = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Container className="border-b border-gray-200 ">
        <div className="flex items-center justify-between pb-3 mb-3">
          <Heading level="h2">TelliHealth IMEI</Heading>
        </div>
      </Container>
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: "order.details.side.before",
});

export default OrderIMEIWidget;
