import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Option from "../Options";
import OrderEntry from "../OrderEntry";

it("Update scoops subtotal when scoops change", async () => {
  render(<Option optionType="scoops" />);

  // make sur total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

it("Update toppings subtotal when toppings change", async () => {
  render(<Option optionType="toppings" />);

  // ● Assert on default toppings subtotal
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // ● Find and tick one box, assert on updated subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // ● Tick another box on, assert on subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // ● Tick one of the boxes off (click it again) and assert on subtotal
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
  it("Grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  it("Grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    // + 3 scoops
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    expect(grandTotal).toHaveTextContent("6.00");

    // + 1 topping
    userEvent.click(hotFudgeInput);
    expect(grandTotal).toHaveTextContent("7.50");
  });

  it("Grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    // + 2 toppings
    expect(grandTotal).toHaveTextContent("0.00");
    userEvent.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("1.50");
    userEvent.click(hotFudgeInput);
    expect(grandTotal).toHaveTextContent("3.00");

    // // + 1 scoop
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    expect(grandTotal).toHaveTextContent("5.00");
  });

  it("Grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const hotFudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.clear(chocolateInput);

    userEvent.click(cherriesInput);
    userEvent.click(hotFudgeInput);
    userEvent.click(cherriesInput);
    userEvent.click(hotFudgeInput);

    userEvent.type(chocolateInput, "1");
    userEvent.type(chocolateInput, "0");
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
