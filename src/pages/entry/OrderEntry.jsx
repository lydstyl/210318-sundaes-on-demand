import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
  const [orderDetails, , setOrderPhase] = useOrderDetails();

  return (
    <>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>

      <button
        disabled={orderDetails.totals.scoops === "$0.00" ? true : false}
        onClick={() => setOrderPhase("review")}
      >
        Order Sundae
      </button>
    </>
  );
}
