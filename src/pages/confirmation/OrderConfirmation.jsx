import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

import { useEffect, useState } from "react";

export default function OrderConfirmation() {
  const [, , setOrderPhase] = useOrderDetails();

  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    // order number
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Thank you</h1>

      <p>
        Your order number is <span title="order-number">{orderNumber}</span>
      </p>

      <p>as per our terms and conditions, nothing will happen now</p>

      <Button
        onClick={() => setOrderPhase("inProgress")}
        variant="primary"
        type="submit"
      >
        Create new order{" "}
      </Button>
    </>
  );
}
