import SummaryForm from "./SummaryForm";

export default function OrderSummary({ orderDetails }) {
  let scoops = [];
  for (const [key, value] of orderDetails.scoops) {
    scoops.push(
      <li key={key}>
        {value} {key}
      </li>
    );
  }

  let toppings = [];
  for (const [key] of orderDetails.toppings) {
    toppings.push(<li key={key}>{key}</li>);
  }

  return (
    <>
      <h1>Order Summary</h1>

      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul title="scoops-list">{scoops}</ul>

      {orderDetails.totals.toppings !== "$0.00" && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul title="toppings-list">{toppings}</ul>
        </>
      )}

      <h2>Total: {orderDetails.totals.grandTotal}</h2>

      <SummaryForm />
    </>
  );
}
