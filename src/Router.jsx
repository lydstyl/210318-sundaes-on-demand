import { useOrderDetails } from "./contexts/OrderDetails";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

export default function Router({ children }) {
  const [orderDetails] = useOrderDetails();
  console.log("🚀 ~ App ~ xxxxxx", orderDetails);

  const { orderPhase } = orderDetails;

  return (
    <>
      {/* Summary page and entry page need provider */}

      {orderPhase === "inProgress" && <OrderEntry />}
      {orderPhase === "review" && <OrderSummary />}
      {/* {orderPhase === "complete" && <OrderConfirmation />} */}
    </>
  );
}
