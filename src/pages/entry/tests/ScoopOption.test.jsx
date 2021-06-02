import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOption";

it("Box turns red or has is-invalid class", () => {
  render(
    <ScoopOptions name="vanilla" imagePath="" updateItemCount={jest.fn()} />
  );

  const scoopInput = screen.getByRole("spinbutton", {
    name: /vanilla/i,
  });

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "1");
  expect(scoopInput).not.toHaveClass("is-invalid");

  // < 0
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "-1");
  expect(scoopInput).toHaveClass("is-invalid");

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "1");
  expect(scoopInput).not.toHaveClass("is-invalid");

  // decimal 0.5
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "0.5");
  // screen.debug();
  expect(scoopInput).toHaveClass("is-invalid");

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "1");
  expect(scoopInput).not.toHaveClass("is-invalid");

  // + 10
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "11");
  expect(scoopInput).toHaveClass("is-invalid");

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "1");
  expect(scoopInput).not.toHaveClass("is-invalid");
});
