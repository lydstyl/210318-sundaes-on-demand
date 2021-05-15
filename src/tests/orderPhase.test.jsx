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
  userEvent.type(vanillaInput, "3"); // *2

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  const mAndMsCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mAndMsCheckbox);

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeCheckbox);

  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent("10.50");

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /Order Sundae/i });
  userEvent.click(orderButton);

  // check summary information based on order
  //
  const pageTitle = screen.getByRole("heading", { name: /Order Summary/i });
  expect(pageTitle).toHaveTextContent(/Order Summary/i);

  const scoopsTitle = screen.getByRole("heading", { name: /Scoops/i });
  expect(scoopsTitle).toHaveTextContent(/\$6.00/i);

  const toppingTitle = screen.getByRole("heading", { name: /Toppings/i });
  expect(toppingTitle).toHaveTextContent(/\$4.50/i);

  // const scoopsList = screen.getByTitle("scoops-list");
  const scoopsList = screen.getByRole("list", { name: "scoops-list" });
  expect(scoopsList).toHaveTextContent(/3 vanilla/i);

  const toppingsList = screen.getByRole("list", { name: "toppings-list" });
  expect(toppingsList).toHaveTextContent(/Cherries/i);
  expect(toppingsList).toHaveTextContent(/M&Ms/i);
  expect(toppingsList).toHaveTextContent(/Hot fudge/i);

  const totalTitle = screen.getByRole("heading", { name: /Total:/i });
  expect(totalTitle).toHaveTextContent("10.50");

  // accept terms and conditions and click button to confirm order
  const termsCheckBox = screen.getByRole("checkbox", { name: /terms/i });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
  userEvent.click(termsCheckBox);
  expect(confirmButton).toBeEnabled();

  // confirm order number on confirmation page
  userEvent.click(confirmButton);

  // click "new order" button on confirmation page

  // check that scoops and topings subtotals have been reset

  // do we need to await anything to avaoid test errors ?
});