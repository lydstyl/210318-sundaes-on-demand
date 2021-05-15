import { useOrderDetails } from "./contexts/OrderDetails";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

export default function Router({ children }) {
  const [orderDetails] = useOrderDetails();
  const { orderPhase } = orderDetails;

  return (
    <>
      {/* Summary page and entry page need provider */}
      {orderPhase === "inProgress" && <OrderEntry />}
      {orderPhase === "review" && <OrderSummary orderDetails={orderDetails} />}
      {orderPhase === "complete" && <OrderConfirmation />}
    </>
  );
}
