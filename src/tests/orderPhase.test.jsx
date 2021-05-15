import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

it("Order phases for happy path", async () => {
  // render app
  render(<App />);

  // prevent the async act(...) error
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent("3.50");

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /Order Sundae/i });
  userEvent.click(orderButton);

  // check summary information based on order

  // accept terms and conditions and click button to confirm order
  // confirm order number on confirmation page
  // click "new order" button on confirmation page
  // check that scoops and topings subtotals have been reset
  // do we need to await anything to avaoid test errors ?
});
