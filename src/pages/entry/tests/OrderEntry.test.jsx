import userEvent from "@testing-library/user-event";

import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

it("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (res, req, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});

it.only("Disable order button for no scoops", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  expect(vanillaInput).toBeInTheDocument();

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
